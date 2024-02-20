const axios = require("axios");

const getRecentlyPlayedTracks = (token) => {
  const url = "https://api.spotify.com/v1/me/player/recently-played?limit=50";
  return axios
    .get(url, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      return result.data.items.map((item) => {
        track = item.track
        return {
          duration_ms: track.duration_ms,
          href: track.href,
          id: track.id,
          name: track.name,
        };
      });
    })
    .catch((err) => {
      console.error("Error fetching recently played:", err);
    });
};

module.exports = getRecentlyPlayedTracks;
