const express = require('express');
const { createProduct, getAllProduct, getAproduct, updateProduct, deleteProduct, wishList, ratings } = require('../controllers/productController');
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware');
const { upload} = require('../middlewares/multer.middleware');
const router = express.Router();
router.post('/',upload.array('images'),authMiddleware,isAdmin,createProduct)
// route.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImg,uploadImages);
router.get('/', getAllProduct);
router.get('/:id', getAproduct);
router.put('/update/:id',upload.array('images'), authMiddleware, isAdmin, updateProduct);
router.put('/wishlist/:id', wishList);
router.put('/rating', authMiddleware, ratings);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
module.exports = router;