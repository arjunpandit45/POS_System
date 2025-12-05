const express = require("express");
const { addTable, getTables, updateTable } = require("../controllers/tableController");
const isVerifiedUser = require("../middlewares/tokenVerification");

const router = express.Router();

router.post("/" , isVerifiedUser , addTable);
router.get("/" , isVerifiedUser , getTables);
router.put("/:id" , isVerifiedUser , updateTable);

module.exports = router