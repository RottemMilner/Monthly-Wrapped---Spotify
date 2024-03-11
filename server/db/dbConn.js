import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const state = mongoose.connection.readyState;
  if (state > 0) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(uri, {});
  } catch (err) {
    console.error("Couldn't connect to MongoDB:", err);
  }
};
