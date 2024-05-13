const ProdCategory=require("../models/productCategorySchema");
const asyncHandler=require("express-async-handler");
const isValidateId = require("../utils/mongodbValidate");
// create ProdCategory
const createProdCategory=asyncHandler(async(req,res)=>{
    try{
        const {title}=req.body;
        const prodCat=await ProdCategory.findOne({title});
        if(prodCat){
            res.status(404).json({
                message:"Product Category already Exist"
            })
        }
        const images=req.files.map(file=>({data:file.buffer,contentType:file.mimetype}))
        const productCategory=new ProdCategory({title,images})
        await productCategory.save();
        res.status(201).json({message:'Product Category Created Successfully'})
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to create product category' });
    }
})
// get ProdCategory
const getProdCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    isValidateId(id);
    try{
        const prodCategory=await ProdCategory.findById(id);
        res.json(prodCategory);
    }catch(error){
        throw new Error(error);
    }
})
// get all ProdCategory
const getAllProdCategory=asyncHandler(async(req,res)=>{
    try{
        const prodCategory=await ProdCategory.find();
        res.json(prodCategory);
    }catch(error){
        throw new Error(error);
    }
})
// update ProdCategory details
const updateProdCategory=asyncHandler(async(req,res)=>{
   
  
    try{
        const {id}=req.params;
        const {ProdCategoryName}=req?.body;
        const images=req.files.map(file=>({data:file.buffer,contentType:file.mimetype}))
        const prodCategory=await ProdCategory.findByIdAndUpdate(id,{images,ProdCategoryName},{new:true})
        res.json(prodCategory);
    }catch(error){
        res.status(500).json({
            message:"Do not create category"
        })
    }
})
// delete ProdCategory
const deleteProdCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
   
    isValidateId(id);
    try{
        const prodCategory=await ProdCategory.findByIdAndDelete(id);
        res.json(prodCategory);
    }catch(error){
        throw new Error(error);
    }
})
module.exports={createProdCategory,getProdCategory,getAllProdCategory,updateProdCategory,deleteProdCategory};