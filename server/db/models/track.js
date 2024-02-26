const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  // album: albumSchema,
  // artists: [artistSchema],
  // available_markets: [String],
  // disc_number: Number,
  duration_ms: Number,
  // explicit: Boolean,
  // external_ids: {
  //   isrc: String
  // },
  // external_urls: {
  //   spotify: String
  // },
  href: String,
  id: { type: String, required: true },
  // is_local: Boolean,
  name: String,
  // popularity: Number,
  // preview_url: String,
  // track_number: Number,
  // type: String,
  // uri: String
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
