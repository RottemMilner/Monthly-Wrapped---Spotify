const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true },
  name: String,
  played_at: { type: Date, required: true },
  duration_ms: Number,
  href: String,
});
trackSchema.index({ spotifyId: 1, played_at: 1 }, { unique: true });
trackSchema.index({ spotifyId: 1 });

const Track = mongoose.model("Track", trackSchema);

const insertTracks = async (tracks) => {
  try {
    const bulkOps = tracks.map((track) => ({
      updateOne: {
        filter: { spotifyId: track.spotifyId, played_at: track.played_at },
        update: { $set: track },
        upsert: true,
      },
    }));

    const result = await Track.bulkWrite(bulkOps, { ordered: false });
    // console.log("Bulk operation success:", result);

    // Extract upsertedIds and matched document ids if needed
    const upsertedIds = result.upsertedIds
      ? Object.values(result.upsertedIds)
      : [];

    return upsertedIds;
  } catch (err) {
    console.error("Error in bulk insertion:", err);
    throw err; // Or handle it as needed
  }
};

module.exports = { Track, insertTracks };
