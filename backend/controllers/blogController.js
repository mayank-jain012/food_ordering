const asyncHandler = require("express-async-handler");
const User = require('../models/userSchema');
const Blog = require('../models/blogSchema');
const validateId = require('../utils/mongodbValidate');
const clouidnaryUploadImg = require("../utils/cloudinary");
const fs=require('fs');
// create blog
const createBlog = asyncHandler(async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const find = await Blog.findOne({ title });
        if (find) {
            res.status(404).json({
                message: "Blog already exist"
            })
        }
        const images = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));
        const blog = new Blog({ title, description,  images, category });
        await blog.save();
        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create blog' });
    }

});
// get blog
const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
        const getBlog=await Blog.findById(id).populate("like").populate("disLike");
        const resjson = await Blog.findByIdAndUpdate(id, {
            $inc: {
                isNumViews: 1
            },
        }, {
            new: true
        });
        res.json({getBlog,resjson });
    } catch (error) {
        throw new Error(error);
    }
});
// get all blog
const getAllBlog = asyncHandler(async (req, res) => {
    try {
        const getAll = await Blog.find();
        res.json(getAll);
    } catch (error) {
        throw new Error(error);
    }
});
// update blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
        const update = await Blog.findByIdAndUpdate(id, req?.body, { new: true });
        res.json(update);
    } catch (error) {
        throw new Error(error);
    }
})
// delete blog
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateId(id);
    try {
        const del = await Blog.findByIdAndDelete(id);
        res.json(del);
    } catch (error) {
        throw new Error(error);
    }
})
// like blog
const likeblog = asyncHandler(async (req, res) => {
    const {blogId}=req.body;
    console.log(blogId);
    const blog=await Blog.findById(blogId); 
    const loginUserId=req?.user?._id;
    const isLiked=blog?.isLiked;
    const alreadyDisliked=blog?.disLike?.find((userId => userId?.toString()===loginUserId?.toString()));
    if(alreadyDisliked){
        const blog1=await Blog.findByIdAndUpdate(blogId,{
            $pull:{disLike:loginUserId},
            isdisLiked:false
        },{
            new:true
        })
        res.json(blog1)
    }
    if(isLiked){
        const blog1=await Blog.findByIdAndUpdate(blogId,{
            $pull:{like:loginUserId},
            isLiked:false
        },{
            new:true
        });
        res.json(blog1);
    }
    else{
        const blog1=await Blog.findByIdAndUpdate(blogId,{
            $push:{like:loginUserId},
            isLiked:true
        },{
            new:true
        });
        res.json({blog1});
    }
})
const dislikeblog=asyncHandler(async(req,res)=>{
    const {blogId}=req.body;
    const blog=await Blog.findById(blogId);
    const loginUserId= req?.user?._id;
    const alreadyLiked = blog?.like?.find((userId=>userId?.toString()===loginUserId?.toString()));
    const disliked=blog?.isdisLiked;
    if(alreadyLiked){
        const blog1=await Blog.findByIdAndUpdate(blogId,{
            $pull:{like:loginUserId},
            isLiked:false
        },{
            new:true
        })
        res.json(blog1)
    }
    if(disliked){
        const blog1=await Blog.findByIdAndUpdate(blogId,{
            $pull:{disLike:loginUserId},
            isdisLiked:false
        },{
            new :true
        })
        res.json(blog1);
    }else{
        const blog1=await Blog.findByIdAndUpdate(blogId,{
            $push:{disLike:loginUserId},
            isdisLiked:true
        },{
            new:true
        })
        res.json(blog1);
    }

})
module.exports={
    createBlog,
    getAllBlog,
    getBlog,
    dislikeblog,
    likeblog,
    updateBlog,
    deleteBlog
}
