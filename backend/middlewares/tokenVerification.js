const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

const isVerifiedUser = async (req , res , next) => {

    try {
        
        const { accessToken } = await req.cookies;

        if(!accessToken){
            const error = createHttpError(401 , "Please provide token!");
            return next(error);
        }

        const decodeToken = await jwt.verify(accessToken , process.env.JWT_SECRET);
        
        const user = await User.findById(decodeToken._id);
        if(!user){
            const error = createHttpError(401 , "User not exist!");
            return next(error);
        }

        req.user = user;
        next();

    } 
    catch (error) {
        const err = createHttpError(401 , "Invalid Token!");
        next(err);
    }
}

module.exports = isVerifiedUser