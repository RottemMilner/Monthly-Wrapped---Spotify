import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import logger from "../utils/logger.js";

const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const state = mongoose.connection.readyState;
  if (state > 0) {
    logger.info("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(uri, {}).then(() => {
      logger.info("Connected to MongoDB");
    });
  } catch (err) {
    logger.error("Couldn't connect to MongoDB:", err);
  }
};
