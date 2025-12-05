const mongoose = require("mongoose");

const tableScehma = new mongoose.Schema({

    tableNo : { type : Number , required : true , unique : true },
    status : {
        type : String ,
        default : "Available"
    },
    seats : {
        type : Number,
        required : true
    },
    currentOrder : { type : mongoose.Schema.Types.ObjectId , ref : "Order" }
})

const Table = mongoose.model("Table" , tableScehma);

module.exports = Table