import mongoose from "mongoose";

export async function connectToDB() {
  if (mongoose.connection.readyState === 1) return;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
}
