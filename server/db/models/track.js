import mongoose from "mongoose";
import logger from "../../utils/logger.js";

const trackSchema = new mongoose.Schema({
  spotifyId: { type: String, required: true },
  name: String,
  played_at: { type: Date, required: true },
  duration_ms: Number,
  href: String,
});
trackSchema.index({ spotifyId: 1, played_at: 1 }, { unique: true });
trackSchema.index({ spotifyId: 1 });

export const Track = mongoose.model("Track", trackSchema);

export const insertTracks = async (tracks) => {
  try {
    if (!Array.isArray(tracks) || tracks.length === 0) {
      return [];
    }
    const bulkOps = tracks.map((track) => ({
      updateOne: {
        filter: { spotifyId: track.spotifyId, played_at: track.played_at },
        update: { $set: track },
        upsert: true,
      },
    }));

    const result = await Track.bulkWrite(bulkOps, { ordered: false });
    logger.debug("Bulk operation success:", result.isOk());

    // Extract upsertedIds and matched document ids if needed
    const upsertedIds = result.upsertedIds
      ? Object.values(result.upsertedIds)
      : [];

    logger.info(
      `Inserted ${result.insertedCount} new tracks into the database.`
    );
    return upsertedIds;
  } catch (err) {
    logger.error("Error in bulk insertion:", err);
    throw err;
  }
};
