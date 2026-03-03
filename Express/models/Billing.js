

const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["CARD", "UPI", "NETBANKING"],
      required: true,
    },
    status: {
      type: String,
      enum: ["PAID", "FAILED", "PENDING"],
      default: "PENDING",
    },
    transactionId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Billing", billingSchema);
