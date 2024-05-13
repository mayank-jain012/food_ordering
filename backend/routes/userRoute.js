const express=require('express');
const { createUser, 
    loginAdmin, 
    handleRefreshToken, 
    getAllUser,
    updatePassword,
    unblockedUser,
    updateAuser,
    userCart,
    updateOrderStatus,
    blockedUser,
    loginUserCtrl,
    applyCoupon,
    createOrder,
    getOrders,
    getAllOrders,
    logout,
    getWishlist,
    getUserCart,
    getAUser,
    emptyCart,
    deleteAUser,
    saveAddress,
    forgotPassword,
    resetPassword
} = require('../controllers/userController');
const {authMiddleware,isAdmin}=require('../middlewares/auth.middleware')
const router=express.Router();
router.post('/register',createUser);
router.get('/refresh-token',handleRefreshToken);
router.get('/getAllUser',getAllUser);
router.put('/updatePassword', authMiddleware, updatePassword);
router.post('/login',loginUserCtrl);
router.post("/admin-login",loginAdmin);
router.post("/cart",authMiddleware, userCart);
router.post("/applyCoupon",authMiddleware, applyCoupon);
router.post("/cart/cash-order",authMiddleware, createOrder);
router.get('/getAllUser', getAllUser);
router.get("/get-orders",authMiddleware, getOrders);
router.get("/getallorders",authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:userid", authMiddleware, isAdmin, getAllOrders);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
router.get("/wish-list/:id", getWishlist);
router.get("/getcart/:id", getUserCart);
router.get('/:userid',authMiddleware,isAdmin,getAUser);
router.delete("/empty-cart",authMiddleware, emptyCart);
router.delete('/deleteuser/:userid', deleteAUser);
router.post('/forgot-password',forgotPassword,authMiddleware);
router.post('/resetpassword',resetPassword,authMiddleware);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.put('/edit-user', authMiddleware, updateAuser);
router.put("/save-address", authMiddleware, saveAddress);
router.put('/blockeduser/:userid', authMiddleware, isAdmin, blockedUser);
router.put('/unblockeduser/:userid', authMiddleware, isAdmin, unblockedUser);
module.exports=router;
