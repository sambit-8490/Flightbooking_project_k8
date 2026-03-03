const express = require("express");
const { createBooking, getUserBookings, getAllBookings, cancelBooking } = require("../controller/BookingController");
const { auth, adminAuth } = require("../middleware/authMiddleWare");

const router = express.Router();

router.post("/", auth, createBooking);
router.get("/me", auth, getUserBookings);
router.get("/admin/all", adminAuth, getAllBookings);
router.patch("/:id/cancel", auth, cancelBooking);

module.exports = router;

