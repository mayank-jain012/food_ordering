const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const schema=new mongoose.Schema({
    firstname:{
        required:true,
        type:String
    },
    lastname:{
        type:String,
        required:true
    },
    mobileno:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    cart:{
        type:Array,
        default:[]
    },
    address:{
        type:String
    },
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    isBlocked:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    }
    ,
    passwordChangeAt:Date,
    passwordResetToken:String,
    passwordExpiresIn:String
},{
    timestamps:true
}

)
schema.pre("save", async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
});
schema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
schema.methods.createPasswordResetToken=async function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest("hex");
    this.passwordResetExpires=Date.now()+30*60*1000;
    return resetToken;
}
module.exports=mongoose.model("User",schema);