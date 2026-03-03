const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (err) {
    // MongoDB connection error
  }
}

module.exports = connectDB;