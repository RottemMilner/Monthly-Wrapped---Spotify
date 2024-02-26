const mongoose = require("mongoose");
const getRecentlyPlayedTracks = require("../../utils/recentlyPlayed")

const Schema = mongoose.Schema;

const spotifyUserSchema = new mongoose.Schema({
  display_name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
});

// spotifyUserSchema.pre("save", async function(next) {
//   const user = this;

//   user.tracks = await getRecentlyPlayedTracks()

//   next();
// });

const User = mongoose.model("User", spotifyUserSchema);

module.exports = User;
