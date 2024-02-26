const User = require("./models/user");
const { insertTracks } = require("./models/track");
const getRecentlyPlayedTracks = require("../utils/recentlyPlayed");

/**
 * Update the recently played tracks for a user,
 * we can time this functnio to run every X minutes to keep the user's data up to date
 * @param {string} token - The user's Spotify access token
 * @param {string} userSpotifyId - The user's Spotify ID
 * @returns {Promise<User>} - The updated user document
 */
updateRecentlyPlayedTracks = async (token, userSpotifyId) => {
  const tracksData = await getRecentlyPlayedTracks(token);
  const upsertedIds = await insertTracks(tracksData);

  return User.findOneAndUpdate(
    { spotifyId: userSpotifyId },
    { $set: user, $addToSet: { tracks: upsertedIds } },
    {
      upsert: true, // Create a new document if no match is found
      new: true,
    }
  );
};

module.exports = { updateRecentlyPlayedTracks };
