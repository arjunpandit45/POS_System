const express = require("express");
const isVerifiedUser = require("../middlewares/tokenVerification");
const { createOrder, verifyPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-order" , isVerifiedUser , createOrder);

router.post("/verify-payment" , isVerifiedUser , verifyPayment);
  

module.exports = router