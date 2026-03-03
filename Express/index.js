const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/flights", require("./routes/Flight"));
app.use("/api/bookings", require("./routes/Booking"));
app.use("/api/airports", require("./routes/Airport"));
app.use("/api/billing", require("./routes/Billing"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {});
