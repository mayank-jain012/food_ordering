const BCategory = require("../models/blogCategorySchema");
const asyncHandler = require("express-async-handler");
const isValidateId = require("../utils/mongodbValidate");
// create blogCategory
const createblogCategory = asyncHandler(async (req, res) => {
    try {
        const blogCategory = await BCategory.create(req.body);
       
        res.json(blogCategory);
    } catch (error) {
        throw new Error(error);
    }
})
// get blogCategory
const getblogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    isValidateId(id);
    try {
        const blogCategory = await BCategory.findById(id);
        res.json(blogCategory);
    } catch (error) {
        throw new Error(error);
    }
})
// get all blogCategory
const getAllblogCategory = asyncHandler(async (req, res) => {
    try {
        const blogCategory = await BCategory.find();
        res.json(blogCategory);
    } catch (error) {
        throw new Error(error);
    }
})
// update blogCategory details
const updateblogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    isValidateId(id);
    try {
        const blogCategory = await BCategory.findByIdAndUpdate(id, req.body, { new: true })
        res.json(blogCategory);
    } catch (error) {

    }
})
// delete blogCategory
const deleteblogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    isValidateId(id);
    try {
        const blogCategory = await BCategory.findByIdAndDelete(id);
        res.json(blogCategory);
    } catch (error) {
        throw new Error(error);
    }
})
module.exports = { createblogCategory, getblogCategory, getAllblogCategory, updateblogCategory, deleteblogCategory };