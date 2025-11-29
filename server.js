const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Models
const Appointment = require("./models/Appointment");
const TradeIn = require("./models/TradeIn");
const MissedCall = require("./models/MissedCall");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health Route
app.get("/", (req, res) => {
  res.json({ message: "Car Dealership API is running." });
});

// Create Appointment
app.post("/api/appointment", async (req, res) => {
  try {
    const saved = await Appointment.create(req.body);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create Trade-In
app.post("/api/trade-in", async (req, res) => {
  try {
    const saved = await TradeIn.create(req.body);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Log missed call
app.post("/api/missed-call", async (req, res) => {
  try {
    const saved = await MissedCall.create(req.body);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Export for Vercel
module.exports = app;
