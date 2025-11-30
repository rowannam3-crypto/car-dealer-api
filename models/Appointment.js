import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  vehicle: String,
  date: String,
  time: String
});

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
