import dotenv from "dotenv";
import { JSONFilePreset } from "lowdb/node";
dotenv.config("../.env");

const __dirname = new URL(".", import.meta.url).pathname;
const db = await JSONFilePreset(`${__dirname}/db.json`, { userToTokens: [] });
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
    user.updated_at = new Date(Date.now()).toISOString();
  } else {
    userToTokens.push({
      userSpotifyId: userSpotifyId,
      refreshToken: refreshToken,
      accessToken: accessToken,
      updated_at: new Date(Date.now()).toISOString(),
    });
  }

  await db.write();
};

export const getToken = async (userSpotifyId) => {
  return userToTokens.find((u) => u.userSpotifyId === userSpotifyId);
};

export const getAllUsers = async () => {
  return userToTokens;
};
