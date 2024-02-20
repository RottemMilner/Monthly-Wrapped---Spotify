const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./db/dbConn");
// const User = require("./db/models/user");
// const Track = require("./db/models/track");
const userRouter = require("./routers/user");
// const trackRouter = require("./routers/track");

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
