import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import logger from "./utils/logger.js";
import { connectDB } from "./db/mongo/dbConn.js";
import userRouter from "./routers/user.js";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);

mongoose.connection.once("open", () => {
  logger.info("Connected to MongoDB");
  app.listen(4000, () => {
    logger.info("listening for requests on port 4000");
  });
});
