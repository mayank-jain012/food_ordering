const express=require('express');
const route=express.Router();
const {upload}=require('../middlewares/multer.middleware')
const {createProdCategory,getProdCategory,getAllProdCategory, updateProdCategory, deleteProdCategory}=require("../controllers/productCategoryController");
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware');
route.post("/",upload.array('images'),authMiddleware,isAdmin,createProdCategory);
route.get("/:id",getProdCategory);
route.get("/",getAllProdCategory);
route.put("/:id",upload.array('images'),authMiddleware,isAdmin,updateProdCategory);
route.delete("/:id",authMiddleware,isAdmin,deleteProdCategory);
module.exports=route;