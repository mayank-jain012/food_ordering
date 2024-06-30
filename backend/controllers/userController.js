const User = require('../models/userSchema')
const asyncHandler = require('express-async-handler');
const isValidateId = require('../utils/mongodbValidate');
const getToken = require('../configure/jwttoken');
const generaterefreshToken = require('../configure/refreshToken')
const crypto = require('crypto');
const Order = require('../models/orderSchema');
const uniqid = require('uniqid');
const Product = require('../models/productSchema');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const otpGenerator = require('../utils/otpGenerator');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;
const client = require('twilio')(accountSid, authToken);
// const twilio=require('twilio');
const Otp = require('../models/otpSchema')
const Cart = require('../models/cartSchema')
const Coupon = require('../models/couponSchema')
const secretKey = process.env.JWT_SECRET;
// create user
const sendSMS = async (body, mobileNo) => {
  const mesaageOptions = {
    from: process.env.PHONE_NO,
    to: mobileNo,
    body
  }
  try {
    const msg = await client.messages.create(
      mesaageOptions
    )
    console.log(msg.sid);
  } catch (error) {
    throw new Error(error);
  }
}
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email })
  if (!findUser) {
    const newUser = await User.create(req.body);

    res.json({
      message: 'User created Successfully',

    });
  } else {
    throw new Error("user already Exists");
  }
})
// get all user
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
})
// get a user
const getAUser = asyncHandler(async (req, res) => {

  const userid = req.params.userid.trim();
  isValidateId(userid)
  try {
    const getUser = await User.findById(userid);
    if (!getUser) {
      res.status(404).json({
        message: "User Not Found"
      })
    }
    res.json({
      getUser
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }


})
const forgotPassword = asyncHandler(async (req, res) => {
  const { mobileno } = req.body;
  const user = await User.findOne({ mobileno });
  const otpValue = otpGenerator();
  console.log(otpValue);
  if (!user) {
    res.status(404).json({
      message: "User not find"
    })
  }
  const otp = new Otp({
    mobileno,
    otp: otpValue
  })
  await otp.save();
  client.messages.create({
    to: mobileno,
    from: process.env.PHONE_NO,
    body: `Your OTP password reset is ${otpValue}`
  });
  res.json({
    message: "Otp sent successfully",
    user
  })



})
const resetPassword = asyncHandler(async (req, res) => {
  const { newotp, newpassword, mobileno } = req.body;
  const user = await User.findOne({ mobileno });
  if (!user) {
    res.status(404).json({
      message: "User not found"
    })
  }
  const storedOtp = await Otp.find({ mobileno, newotp })
  console.log(storedOtp)
  if (!storedOtp) {
    res.status(400).json({
      message: "Invalid Otp"
    })

  }
  user.password = newpassword;
  user.passwordResetToken = undefined;
  await user.save();
  await Otp.deleteOne({ mobileno, newotp })
  res.json(user)
  console.log(storedOtp)




})
// delete a user
const deleteAUser = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  isValidateId(userid);
  try {
    const deleteUser = await User.findByIdAndDelete(userid);
    res.json({ deleteUser });
  } catch (error) {
    throw new Error(error);
  }
})
// update a user
const updateAuser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  isValidateId(_id);
  console.log(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(_id, req?.body,
      {
        new: true,
      });
    res.json(updateUser)

  } catch (error) {
    throw new Error(error);
  }
})
// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    throw new Error("No refresh token in cookies");
  }
  const refreshToken = cookie.refreshToken;

  const user = await User.findOne({ refreshToken });
  if (!user) { throw new Error(" No Refresh token present in db or not matched"); }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generaterefreshToken(user?._id);
    res.json({ accessToken });
  });

});
// loginAdmin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generaterefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      refreshToken: getToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
// logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No refresh tooken in cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate({ refreshToken }, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204).json({
    message: "logout successfully"
  });

})
// blocked user
const blockedUser = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  isValidateId(userid);
  try {
    const block = await User.findByIdAndUpdate(
      userid, {
      isBlocked: true,
    }, {
      new: true,
    });
    res.json({
      message: "User Blocked Succesfully",
      block
    });
  }
  catch (error) {
    throw new Error(error);
  }
});
// unblocked user
const unblockedUser = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  isValidateId(userid);
  try {
    const block = await User.findByIdAndUpdate(
      userid, {
      isBlocked: false,
    }, {
      new: true,
    });
    res.json({
      message: "user unblockedblocked successfully",
      block
    });
  }
  catch (error) {
    throw new Error(error);
  }
})
// updated password
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  isValidateId(_id);
  console.log(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedpassword = await user.save();
    res.json({
      message: "Password Updated Successfully",
      updatedpassword
    });
  }
  else {
    res.json(user);
  }
})
const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  isValidateId(_id);
  try {
    if (!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user?._id });
    console.log(userCart);
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});
const getOrders = asyncHandler(async (req, res) => {
  const { id } = req.params;
  isValidateId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});
const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  isValidateId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  isValidateId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});
const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const  {_id } = req.user;
  isValidateId(_id);
  const validateCoupn = await Coupon.findOne({ name: coupon });
  if (validateCoupn === null) {
    throw new Error("Invalid coupon");
  }
  const user = await User.findOne({_id});
  let { cartTotal } = await Cart.findOne({ orderby: user._id }).populate('products.product');
  let totalAfterDiscount = (
    cartTotal - (cartTotal * validateCoupn.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate({
    orderby: user._id,
  },
    {
      totalAfterDiscount
    }, {
    new: true
  })
  console.log(cartTotal);
  res.json(totalAfterDiscount);
});
// get wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await User.findById(id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});
// add to cart
const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  isValidateId(_id);
  try {
    let products = [];
    const user = await User.findById(_id);
    // check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove;
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});
// get a user cart
const getUserCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  isValidateId(id);
  try {
    const cart = await Cart.findOne({ orderby: id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
// empty cart
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  isValidateId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndDelete({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  isValidateId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});
// send sms

// login user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { mobileno, password } = req.body;
  const findUser = await User.findOne({ mobileno });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generaterefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(findUser.id, {
      refreshToken: refreshToken,
    }, {
      new: true
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login Successfully",
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobileno: findUser?.mobileno,
       token: getToken(findUser?._id),
    });
    // // sendSMS("Welcome to Food Mania, I hope ur day is good", mobileno)
  }
  else {
    throw new error("invalid data");
  }
});
module.exports = {
  createUser,
  loginAdmin,
  handleRefreshToken,
  getAllUser,
  getAUser,
  deleteAUser,
  updateAuser,
  logout,
  blockedUser,
  unblockedUser,
  updatePassword,
  createOrder,
  saveAddress,
  emptyCart,
  getUserCart,
  userCart,
  getWishlist,
  applyCoupon,
  updateOrderStatus,
  getOrders,
  getAllOrders,
  getOrderByUserId,
  loginUserCtrl,
  forgotPassword,
  resetPassword
}
