const express = require("express");
const { createAirport, updateAirport, deleteAirport, getAllAirports, seedAirports } = require("../controller/AirportController");
const { adminAuth } = require("../middleware/authMiddleWare");
const router = express.Router();

router.get("/", getAllAirports);
router.get("/seed", seedAirports);
router.post("/", adminAuth, createAirport);
router.put("/:id", adminAuth, updateAirport);
router.delete("/:id", adminAuth, deleteAirport);

module.exports = router;
