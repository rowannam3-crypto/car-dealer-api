import express from "express";
import cors from "cors";
import { connectToDB } from "./db.js";
import Appointment from "./models/Appointment.js";
import TradeIn from "./models/TradeIn.js";
import MissedCall from "./models/MissedCall.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Car Dealership API is running." });
});

// -------------------------------
// Schedule Test Drive
// -------------------------------
app.post("/schedule-test-drive", async (req, res) => {
  try {
    await connectToDB();
    const appointment = await Appointment.create(req.body);
    res.json({ success: true, appointment });
  } catch (err) {
    console.error("Test drive error:", err);
    res.status(500).json({ error: "Server error (test drive)" });
  }
});

// -------------------------------
// Trade-In
// -------------------------------
app.post("/trade-in", async (req, res) => {
  try {
    await connectToDB();
    const trade = await TradeIn.create(req.body);
    res.json({ success: true, trade });
  } catch (err) {
    console.error("Trade-in error:", err);
    res.status(500).json({ error: "Server error (trade-in)" });
  }
});

// -------------------------------
// Missed Call Logging
// -------------------------------
app.post("/missed-call", async (req, res) => {
  try {
    await connectToDB();
    const missed = await MissedCall.create(req.body);
    res.json({ success: true, missed });
  } catch (err) {
    console.error("Missed call error:", err);
    res.status(500).json({ error: "Server error (missed call)" });
  }
});

// Local test server (ignored by Vercel)
app.listen(3000, () => {
  console.log("Local server running on port 3000");
});

export default app;
