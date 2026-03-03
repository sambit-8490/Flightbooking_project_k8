const express = require("express");
const { createFlight, updateFlight, deleteFlight, getAllFlights, seedFlights } = require("../controller/FlightController");
const { auth, adminAuth } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/seed", seedFlights);

router.get("/", getAllFlights);

router.post("/", adminAuth, createFlight);

router.put("/:id", adminAuth, updateFlight);

router.delete("/:id", adminAuth, deleteFlight);

module.exports = router;
