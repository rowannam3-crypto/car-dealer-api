import mongoose from "mongoose";
import Appointment from "./models/Appointment.js";
import TradeIn from "./models/TradeIn.js";
import MissedCall from "./models/MissedCall.js";

const MONGO_URI = process.env.MONGODB_URI;

// Ensure MongoDB connection (Vercel cold start safe)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
}

/**
 * Main API handler
 */
export default async function handler(req, res) {
  await connectDB();

  // Health check
  if (req.method === "GET") {
    return res.status(200).json({ message: "Car Dealer API is running." });
  }

  // Create Appointment
  if (req.method === "POST" && req.url === "/appointment") {
    try {
      const saved = await Appointment.create(req.body);
      return res.status(201).json(saved);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Create Trade-in
  if (req.method === "POST" && req.url === "/trade-in") {
    try {
      const saved = await TradeIn.create(req.body);
      return res.status(201).json(saved);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Missed Call Recovery
  if (req.method === "POST" && req.url === "/missed-call") {
    try {
      const saved = await MissedCall.create(req.body);
      return res.status(201).json(saved);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Fallback for unknown route
  return res.status(404).json({ error: "Endpoint not found" });
}
