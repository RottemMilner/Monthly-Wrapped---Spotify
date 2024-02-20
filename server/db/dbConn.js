const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:admin@cluster0.jternz4.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
  } catch (err) {
    console.error("Couldn't connect to MongoDB:", err);
  }
};

module.exports = connectDB;
