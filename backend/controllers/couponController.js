const Coupon=require("../models/couponSchema");
const asyncHandler=require("express-async-handler");
const isValidateId = require("../utils/mongodbValidate");
// create coupon
const createCoupon=asyncHandler(async(req,res)=>{
    try{
        const {name}=req.body;
        const geta=await Coupon.findOne({name});
        if(geta){
            res.json({
                message:"coupon already exist"
            })
        }
        const coupon=await Coupon.create(req.body);
        res.json(coupon);
    }catch(error){
        throw new Error(error);
    }
})
// get coupon
const getCoupon=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    isValidateId(id);
    try{
        const coupon=await Coupon.findById(id);
        res.json(coupon);
    }catch(error){
        throw new Error(error);
    }
})
// get all coupon
const getAllCoupon=asyncHandler(async(req,res)=>{
    try{
        const coupon=await Coupon.find();
        res.json(coupon);
    }catch(error){
        throw new Error(error);
    }
})
// update coupon details
const updateCoupon=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    isValidateId(id);
    try{
        const coupon=await Coupon.findByIdAndUpdate(id,req.body,{new:true})
        res.json(coupon);
    }catch(error){

    }
})
// delete coupon
const deleteCoupon=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    isValidateId(id);
    try{
        const coupon=await Coupon.findByIdAndDelete(id);
        res.json(coupon);
    }catch(error){
        throw new Error(error);
    }
})
module.exports={createCoupon,getCoupon,getAllCoupon,updateCoupon,deleteCoupon};