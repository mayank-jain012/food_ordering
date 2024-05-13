// const multer=require('multer');
// const path=require('path');
// const sharp=require('sharp');
// const fs=require('fs');
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(__dirname, "./public/images/"));
//     },
//     filename:function(req,file,cb){
//         const uniqueSuffix=Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null,file.fieldname+'-'+uniqueSuffix+".jpeg");
//     }
// })
// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true)
//     } else {
//         cb({
//             message: "Unsupported file format",
//         },
//             false
//         );
//     }
// }
//  const upload=multer({
//     storage:storage,
//     fileFilter: multerFilter,
//     limits: { fieldSize: 1000000 }
// })
// const productImg = async (req, res, next) => {
//     if (!req.files) {
//         return next();
//     }
//     await Promise.all(req.files.map(async (file) => {
//         await sharp(file.path)
//         .resize(500, 500)
//         .toFormat("jpeg")
//         .jpeg({ quality: 100 })
//         .toFile(`public/images/products/${file.filename}`);
//         fs.unlinkSync(`public/images/products/${file.filename}`)
//     })
//     )
//     next();
// }
// module.exports={upload,productImg}
// const cloudinary=require('cloudinary');
// cloudinary.config({
//     cloud_name: 'your_cloud_name',
//     api_key: 'your_api_key',
//     api_secret: 'your_api_secret'
// });

// // Multer setup for file uploads
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
module.exports={upload}
