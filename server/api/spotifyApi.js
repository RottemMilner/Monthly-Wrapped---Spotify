import axios from "axios";
import logger from "../utils/logger.js";

export const spotify = {
  token: axios.create({
    baseURL: `https://accounts.spotify.com/api`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }),
  me: axios.create({
    baseURL: `https://api.spotify.com/v1/me`,
    headers: {
      Accept: "application/json",
    },
  }),
};

export const postRefreshTokenRequest = (oldRefreshToken) => {
  return new Promise((resolve, reject) => {
    spotify.token
      .post("/token", {
        grant_type: "refresh_token",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        refresh_token: oldRefreshToken,
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data;
        logger.debug({ access_token, refresh_token }, "Refreshed token");
        resolve({ access_token, refresh_token });
      })
      .catch((error) => {
        logger.error("Error refreshing token", error);
        reject(error);
      });
  });
};

export const getRecentlyPlayedTracks = (token) => {
  const endpoint = "/player/recently-played";
  return spotify.me
    .get(endpoint, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50,
      },
    })
    .then((result) => {
      return result.data.items.map((item) => {
        const track = item.track;
        return {
          spotifyId: track.id,
          name: track.name,
          played_at: item.played_at,
          duration_ms: track.duration_ms,
          href: track.href,
        };
      });
    })
    .catch((err) => {
      logger.error(err, "Error fetching recently played:");
    });
};
