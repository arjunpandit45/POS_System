const express = require("express");
const isVerifiedUser = require("../middlewares/tokenVerification");
const { addOrder, getOrders, updateOrder, getOrderById } = require("../controllers/orderController");

const router = express.Router();

router.post("/" , isVerifiedUser , addOrder);
router.get("/" , isVerifiedUser , getOrders);
router.get("/:id" , isVerifiedUser , getOrderById);
router.put("/:id" , isVerifiedUser , updateOrder);

module.exports = router