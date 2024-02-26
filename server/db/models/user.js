const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spotifyUserSchema = new mongoose.Schema({
  display_name: { type: String, required: true },
  spotifyId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
});

spotifyUserSchema.index({ spotifyId: 1 });

const User = mongoose.model("User", spotifyUserSchema);

module.exports = User;
