// const { config } = require("dotenv");
const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.databaseURI);
        console.log("Connection Successful...")
    } 
    catch (error) {
        console.log("Connection failed")
    }
}

module.exports = connectDB;
