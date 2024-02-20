const axios = require("axios");

const getRecentlyPlayedTracks = (token) => {
  const url = "https://api.spotify.com/v1/me/player/recently-played?limit=50";
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};