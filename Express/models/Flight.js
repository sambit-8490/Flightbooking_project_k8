const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    airline: {
      type: String, // IndiGo, Air India
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
      unique: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", flightSchema);
