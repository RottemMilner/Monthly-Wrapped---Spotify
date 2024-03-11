import { User } from "./models/user.js";
import { insertTracks } from "./models/track.js";
import { getRecentlyPlayedTracks } from "../utils/recentlyPlayed.js";
import { connectDB } from "./dbConn.js";

/**
 * Update the recently played tracks for a user,
 * we can time this functnio to run every X minutes to keep the user's data up to date
 * @param {string} token - The user's Spotify access token
 * @param {string} userSpotifyId - The user's Spotify ID
 * @returns {Promise<User>} - The updated user document
 */
export const updateRecentlyPlayedTracks = async (token, userSpotifyId) => {
  const user = { spotifyId: userSpotifyId };
  const tracksData = await getRecentlyPlayedTracks(token);

  // console.log("🚀 ~ updateRecentlyPlayedTracks ~ tracksData:", tracksData);

  if (!tracksData || tracksData.length === 0) {
    return user;
  }

  // make sure we have a connection to the database
  connectDB();

  const upsertedIds = await insertTracks(tracksData);
  // console.log("upsertedIds", upsertedIds);
  return User.findOneAndUpdate(
    { spotifyId: userSpotifyId },
    { $set: user, $addToSet: { tracks: upsertedIds } },
    {
      upsert: true,
      new: true,
    }
  );
};
