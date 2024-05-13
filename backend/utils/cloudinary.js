// const cloudinary=require('cloudinary');


// // import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.API_KEY, 
//   api_secret: process.env.API_SECRET
// });

// const uploadFileCloudinary=async(localFilePath)=>{
//     console.log("connected")
//     return new Promise ((resolve)=>{
//         cloudinary.uploader.upload(fileToUploads,(result)=>{
//             resolve({
//                 url:result.secure_url,
//                 asset_id:result.asset_id,
//                 public_id:result.public_id
//             },{
//                 resource_type:"auto",
//             }
//             );
//         })
//     })
// // }
// module.exports={uploadFileCloudinary};