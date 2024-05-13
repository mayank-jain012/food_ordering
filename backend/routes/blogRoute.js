const express=require('express');
const {
    createBlog,
    likeblog,
    dislikeblog,
    getBlog,
    getAllBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');
const {upload}=require('../middlewares/multer.middleware')
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware');

const router=express.Router();
router.post("/",upload.array('images'),isAdmin,createBlog);

router.put("/",authMiddleware,likeblog);
router.put("/dislike",authMiddleware,dislikeblog);
router.get("/:id",getBlog);
router.get("/",getAllBlog);
router.put("/:id",authMiddleware,isAdmin,updateBlog);
router.delete("/:id",authMiddleware,isAdmin,deleteBlog);

module.exports=router;