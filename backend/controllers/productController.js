const asyncHandler = require("express-async-handler");
const Product = require('../models/productSchema');

const User = require("../models/userSchema");

const isValidateId = require("../utils/mongodbValidate");
// create product
const createProduct = asyncHandler(async (req, res) => {
   
    try {
        const { title, description, price, category, quantity,slug } = req.body;
        const find = await Product.findOne({ title });
        if (find) {
            res.status(404).json({
                message: "Product already exist"
            })
        }
        const images = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));
        const product = new Product({ title, description, price, images, category, quantity,slug });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
})
// get all product
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        // filtering
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
        let query = Product.find(JSON.parse(queryStr))
        // sorting
        if (req.query.sort) {
            const sortingQuerry = req.query.sort.split(",").join(" ");
            query = query.sort(sortingQuerry);
        } else {
            query = query.sort("-createdAt");
        }
        // limit the fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        }
        else {
            query = query.select("-__v");
        }
        // pagination the fields
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const numberpage = await Product.countDocuments();
            if (skip >= numberpage)
                throw new Error("this page not exist");
        }

        const product = await query;
        res.json(product)
    } catch (error) {
        throw new Error(error);
    }
})
// get a product
const getAproduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    isValidateId(id);
    try {
        const singleProduct = await Product.findById(id);
        res.json({ singleProduct });
    } catch (error) {
        throw new Error(error)
    }
})
// update product
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        isValidateId(id);
        console.log(id);
        console.log(req.files);
        const { title, description, price,category } = req?.body
        const images = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));
        const updatedProduct = await Product.findByIdAndUpdate(id, {images,title,description,price,category}, { new: true });
        if(updatedProduct){

        }
        res.json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
})
// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    isValidateId(id);
    console.log(id);
    try {
        const deleteproduct = await Product.findByIdAndDelete(id);
        res.json({
            deleteproduct
        })
    }
    catch (error) {
        throw new Error(error);
    }
})
// wishlist
const wishList = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { prodid } = req.body;
    
    try {
        const user = await User.findById(id);
        const alreadyExist = user.wishlist.find((id) => id.toString() === prodid.toString())
        if (alreadyExist) {
            let user = await User.findByIdAndUpdate(
                id,
                {
                    $pull: { wishlist: prodid },
                }, {
                new: true
            }
            )
            res.json(user)
        } else {
            let user = await User.findByIdAndUpdate(
                id,
                {
                    $push: { wishlist: prodid },
                }, {
                new: true
            }
            )
            res.json(user)

        }

    } catch (error) {
        throw new Error(error);
    }
})
// ratings
const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);
        const alreadyRating = product.rating.find((prodId) => prodId.postedby.toString() === _id.toString());
        if (alreadyRating) {
            const rated = await Product.updateOne({
                rating: { $eleMatch: alreadyRating }
            }, {
                $set: { "rating.$.star": star, "rating.$.comment": comment }
            } < {
                new: true
            })
        } else {
            const rateProduct = await Product.findByIdAndUpdate(prodId, {
                $push: {
                    rating: {
                        star: star,
                        postedby: _id,
                        comment: comment
                    }
                }
            }, {
                new: true
            })
            res.json(rateProduct);
        }
        const gettAllRating = await Product.findById(prodId);
        const totalrating = gettAllRating.rating.length;
        let ratingSum = gettAllRating.rating.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
        let actualrating = Math.round(ratingSum / totalrating);
        let finalRating = await Product.findByIdAndUpdate(prodId, {
            totalrating: actualrating
        }, {
            new: true
        })
        res.json(finalRating);
    } catch (error) {
        throw new Error(error)
    }

})
module.exports = {
    createProduct,
    getAllProduct,
    getAproduct,
    deleteProduct,
    updateProduct,
    wishList,
    ratings,
};