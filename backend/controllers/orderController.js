const createHttpError = require("http-errors");
const Order = require("../models/orderModel");
const { default: mongoose } = require("mongoose");


const addOrder = async (req , res, next) => {

    try {
        
        // const { customerDetails , orderStatus , bills , items } = req.body;
        // const order = await Order.create({
        //     customerDetails , 
        //     orderStatus , 
        //     bills , 
        //     items
        // })

        const order = await Order.create(req.body);

        res.status(201).json({ success : true , message : "Order Created!",
            data : order })

    } 
    catch (error) {
        next(error);
    }
}

const getOrderById = async (req , res, next) => {

    try {

        // Last Added No connection is this (getOrderById) and ignore it -->
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404 , "Invalid Id!");
            return next(error);
        }
        
        // const order = await Order.findById(req.params.id);
        const order = await Order.findById(id);

        if(!order){
            const error = createHttpError(404 , "Order not found!");
            return next(error);
        }

        res.status(201).json({ success : true , data : order })
    } 
    catch (error) {
        console.log(error);
    }
}

const getOrders = async (req , res, next) => {

    try {
        
        // const orders = await Order.find();
        const orders = await Order.find().populate("table");
        res.status(200).json({data : orders});
    }
    catch (error) {
        next(error);
    }
}

const updateOrder = async (req , res, next) => {
     
    try {

        // Last Added No connection is this (UpdateOrder) and ignore it -->
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404 , "Invalid Id!");
            return next(error);
        }

        const {orderStatus} = req.body;
        const order = await Order.findByIdAndUpdate(
            // req.params.id,
            id,
            {orderStatus},
            {new : true}
        );

        if( !order){
            const error = createHttpError(404 , "Order not found!");
            return next(error);
        }

        res.status(200).json({ success : true , message : "Order Updated!",
            data : order })

    } 
    catch (error) {
        next(error); 
    }
}

module.exports = { addOrder , getOrderById , getOrders , updateOrder}
