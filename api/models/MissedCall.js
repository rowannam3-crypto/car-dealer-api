import mongoose from "mongoose";

const MissedCallSchema = new mongoose.Schema({
  phone: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.MissedCall ||
  mongoose.model("MissedCall", MissedCallSchema);
