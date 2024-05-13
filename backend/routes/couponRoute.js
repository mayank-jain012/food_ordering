const express=require('express');
const { createCoupon, getCoupon, getAllCoupon, updateCoupon, deleteCoupon } = require('../controllers/couponController');
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware');
const route=express.Router();
route.post("/",authMiddleware,isAdmin,createCoupon);
route.get("/:id",authMiddleware,isAdmin,getCoupon);
route.get("/",isAdmin,getAllCoupon);
route.put("/:id",authMiddleware,isAdmin,updateCoupon);
route.delete("/:id",authMiddleware,isAdmin,deleteCoupon);

module.exports=route;