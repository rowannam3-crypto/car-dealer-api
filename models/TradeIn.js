import mongoose from "mongoose";

const TradeInSchema = new mongoose.Schema({
  name: String,
  phone: String,
  vehicle: String,
  mileage: String,
  condition: String,
  vin: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.TradeIn ||
  mongoose.model("TradeIn", TradeInSchema);
