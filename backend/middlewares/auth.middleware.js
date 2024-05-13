const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const asyncHandler = require('express-async-handler');
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                let decoded = jwt.verify(token, process.env.JWT_SECRET);
                let user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        }
        catch (error) {
            throw new Error("Invalid Token Please Enter right token", error)
        }
    }
    else {
        throw new Error("You are not attached any token ");
    }
})

// Assuming UserSchema is in ../models




const isAdmin = asyncHandler(async (req, res, next) => {
     const email=req.user;
    const adminUser=await User.findOne(email);
    if(adminUser.role!=="admin"){
        throw new Error("You are not a admin");
    }
    else{
        next();
    }
})
module.exports = { isAdmin, authMiddleware }