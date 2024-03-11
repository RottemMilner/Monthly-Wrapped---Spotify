import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./db/dbConn.js";
import userRouter from "./routers/user.js";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.get("/", (req, res) => {
  res.json([
    {
      data: "Hello New World!",
    },
  ]);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(4000, () => {
    console.log("listening for requests on port 4000");
  });
});
