const express = require("express");
const { processPayment, getUserBillings } = require("../controller/BillingController");
const { auth } = require("../middleware/authMiddleWare");
const router = express.Router();

router.post("/process", auth, processPayment);
router.get("/my-billings", auth, getUserBillings);

module.exports = router;
