const jwt=require('jsonwebtoken');
const secrete=process.env.JWT_SECRET;

const generaterefreshToken=(id)=>{
    return jwt.sign({id},secrete,{expiresIn:'1d'});
}
module.exports=generaterefreshToken;