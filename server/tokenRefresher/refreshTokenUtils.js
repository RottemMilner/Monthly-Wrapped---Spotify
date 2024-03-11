import { spotify } from "./spotifyApi.js";
import dotenv from "dotenv";
dotenv.config();

import { JSONFilePreset } from "lowdb/node";

const db = await JSONFilePreset("db.json", { userToTokens: [] });
await db.read();
const { userToTokens } = db.data;
export const addOrUpdateToken = async (
  userSpotifyId,
  refreshToken,
  accessToken
) => {
  const user = userToTokens.find(
    (user) => user.userSpotifyId === userSpotifyId
  );
  if (user) {
    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    user.updated_at = new Date(Date.now()).toLocaleString();
  } else {
    userToTokens.push({
      userSpotifyId: userSpotifyId,
      refreshToken: refreshToken,
      accessToken: accessToken,
      updated_at: new Date(Date.now()).toLocaleString(),
    });
  }

  await db.write();
};

// Get token
export const getToken = async (userSpotifyId) => {
  return userToTokens.find((u) => u.userSpotifyId === userSpotifyId);
};

//*------------------------------------------------------------------- */

export const refreshToken = (refresh_token) => {
  return new Promise((resolve, reject) => {
    spotify
      .post("/token", {
        grant_type: "refresh_token",
        client_id: process.env.SPOTIFY_CLENT_ID,
        refresh_token: refresh_token,
      })
      .then((res) => {
        const { access_token, refresh_token } = res.data;
        // console.log("Refreshed token", { access_token, refresh_token });
        resolve({ access_token, refresh_token });
      })
      .catch((error) => {
        console.error("Error refreshing token", error);
        reject(error);
      });
  });
};
