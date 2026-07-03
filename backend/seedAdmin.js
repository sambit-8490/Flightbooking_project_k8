require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URL); // match your db.js connection string var
  const email = "admin@example.com";
  const plainPassword = "ChangeMe123!";

  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = "admin";
    await existing.save();
    console.log("Existing user promoted to admin");
  } else {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await User.create({ name: "Admin", email, password: hashedPassword, role: "admin" });
    console.log("Admin user created");
  }

  await mongoose.disconnect();
};

run().catch(console.error);
