const mongoose=require('mongoose');
const otpSchema= new mongoose.Schema({
    mobileno:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300
    }
})
module.exports= mongoose.model('Otp',otpSchema)