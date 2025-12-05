const Razorpay = require("razorpay");
const crypto = require("crypto");

const createOrder = async ( req , res , next ) => {

    try {

        const razorpay = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_KEY_SECRET,
        })

        const { amount } = req.body;

        const options = {
            // amount : amount * 100,
            amount : amount,
            currency : "INR",
            receipt : `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });
        
    } 
    catch (error) {
        next(error);
    }

}

const verifyPayment = async ( req ,res , next) => {

    try {

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

       const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex")

        if (expectedSignature === razorpay_signature) {
            res.json({ success: true, message: "Payment verified successfully!" });
        } 
        else {
            const error = createHttpError(400, "Payment verification failed!");
            return next(error);
        }
        
    }
    catch (error) {
        next(error); 
    }
} 

module.exports = { createOrder , verifyPayment };