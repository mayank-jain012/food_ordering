const secrete=process.env.JWT_SECRET;
const jwttoken=require('jsonwebtoken');


const getToken=(id)=>{
  return jwttoken.sign({id},secrete,{expiresIn:'1d'});
}
module.exports=getToken;
