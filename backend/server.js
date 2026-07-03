require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();


app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.json({ message: "Flight Booking System API", version: "1.0.0" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/flights", require("./routes/Flight"));
app.use("/api/bookings", require("./routes/Booking"));
app.use("/api/airports", require("./routes/Airport"));
app.use("/api/billing", require("./routes/Billing"));

app.get("/health", (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {});
