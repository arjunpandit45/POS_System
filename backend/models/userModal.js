const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create the Schema -->
const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        validate :{
            validator : function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message : "Email must be in valid formate!"
        }
    },
    phone : {
        type : Number,
        required : true,
        validate : {
            validator : function (v) {
                return /\d{10}/.test(v);
            },
            message : "Phone Number must be a 10-digit number!"
        }
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
    },

} , {timestamps : true});

// Hash the password by using Bcrypt js -->
userSchema.pre("save" , async function(next) {

    if (!this.isModified('password')){
        next();
    }

    const hashPassword = await bcrypt.hash(this.password , 10);
    this.password = hashPassword; 
})


// Create the Model -->
const User = mongoose.model("User" , userSchema);

module.exports = User