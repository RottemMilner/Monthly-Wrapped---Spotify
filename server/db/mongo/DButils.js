import { User } from "./models/user.js";
import { insertTracks } from "./models/track.js";
import { getRecentlyPlayedTracks } from "../../api/spotifyApi.js";
import { connectDB } from "./dbConn.js";
import logger from "../../utils/logger.js";
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
  logger.debug({ user: user, tracks: tracksData }, "tracksData");
  if (!tracksData || tracksData.length === 0) {
    return user;
  }

  // make sure we have a connection to the database
  connectDB();

  const upsertedIds = await insertTracks(tracksData);

  return User.findOneAndUpdate(
    { spotifyId: userSpotifyId },
    { $set: user, $addToSet: { tracks: upsertedIds } },
    {
      upsert: true,
      new: true,
    }
  );
};

export const getUserWithTracks = async (spotifyId) => {
  // 'populate' fetchs the tracks for the user
  const user = await User.findOne({ spotifyId: spotifyId }).populate("tracks");
  return user;
};

/**
 *
 * @param {String} spotifyId
 * @returns {Promise<Number>} - The total number of minutes of tracks reated to the user
 */
export const getMinutesListenedForUser = async (spotifyId) => {
  const userWithTracks = await getUserWithTracks(spotifyId);
  const totalMs = userWithTracks.tracks.reduce((total, track) => {
    return total + track.duration_ms;
  }, 0);
  return totalMs / 1000 / 60; // convert ms to minutes
};
