const createHttpError = require("http-errors");
const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTRATION FUNCTIONILITY -->
const register = async ( req , res , next ) => {

    try {

        const { name , email , phone , password , role} = req.body;

        if ( !name || !phone || !email || !password || !role) {
            const error = createHttpError(400 , "All fields are required!");
            return next(error);
        }

        const isUserPresent = await User.findOne({email});

        if(isUserPresent){
            const error = createHttpError(400 , "User already exist!");
            // res.json("User already exist!");
            return next(error);
        }

        const user = await User.create({
            name , 
            email , 
            phone , 
            password, 
            role ,
        })
        
        res.status(201).json({ success : true ,  
          message :"resgistration successful" , data : user });

    } 
    catch (error) {
        // console.log(error);
        next(error);
        // res.json("Something went wrong!");
    }
}

// LOGIN FUNCTIONILITY -->
const login = async (req , res , next ) => {

    try {
        
        const {email , password } = req.body;

        // email and password from req.body are exist or not -->
        if ( !email || !password ) {
            const error = createHttpError(400 , "All fields are required!");
            return next(error);
        }

        // Email exist or not -->
        const isEmailExist = await User.findOne({email});
        if(!isEmailExist){
            const error = createHttpError(401, "Inavalid Credentials.");
            return next(error);
        }

        // Compare the Password -->
        const isMatch = await bcrypt.compare(password , isEmailExist.password);
        if(!isMatch){
            const error = createHttpError(401, "Inavalid Credentials..");
            return next(error);
        }

        const accessToken = jwt.sign({_id : isEmailExist._id} , 
            process.env.JWT_SECRET , {
                expiresIn : "1d"
            }
        )

        // Set the Cookie while user will login -->
        res.cookie("accessToken", accessToken, {
            
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // sameSite: "none",
            // secure: true
            secure: false,     // LOCALHOST par false rakho
            sameSite: "lax"    // LOCALHOST par none NOT allowed
        })

        res.status(200).json({ success : true , message : "User login Successfully!" , 
            data : isEmailExist
        })

    } 
    catch (error) {
        // console.log(error);
        next(error);
        // res.json("Invalid Credentials...");
    }
}

// GET THE USER DATA -->
const getUserData = async ( req , res , next) => {

    try {
        
        // const user = await req.user;
        const user = await User.findById(req.user._id);
        res.status(200).json({success : true , userData : user});

    } 
    catch (error) {
        next(error);
    }
}

// User LogOut
const logout = async (req , res , next ) => {

    try {
        // res.clearCookie('accessToken');
        res.clearCookie('accessToken', {
            httpOnly: true,
            // secure: true,
            // sameSite: 'none',        
             secure: false,     // LOCALHOST par false rakho
            sameSite: "lax"    // LOCALHOST par none NOT allowed   
        })
        res.status(200).json({success : true , message : "User logout successfully!"})
    } 
    catch (error) {
        next(error);
    }
}

module.exports = { register , login , getUserData , logout}