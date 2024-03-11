import {
  addOrUpdateToken,
  getToken,
  refreshToken,
} from "../tokenRefresher/refreshTokenUtils.js";

import { updateRecentlyPlayedTracks } from "../db/updateRecentlyPlayedTracks.js";
import { set } from "mongoose";

// static user for now, will loop through all users in the future
const tzvigr = "21ftkwf2rcbv6o4kbmdveukui";
// run all of this every 15 minutes:
setInterval(() => {
  getToken(tzvigr)
    .then((tokenResult) => {
      console.log("got token", tokenResult.updated_at);
      return tokenResult.refreshToken;
    })
    .then((token) => {
      return refreshToken(token);
    })
    .then((res) => {
      console.log("🚀 ~ refreshToken res", res);
      const { access_token, refresh_token } = res;
      addOrUpdateToken(tzvigr, refresh_token, access_token).then(() => {
        console.log("Updated token in json");
      });
      return access_token;
    })
    .then((access_token) => {
      updateRecentlyPlayedTracks(access_token, tzvigr).then((user) => {
        console.log(
          "Updated recently played tracks for user",
          user.display_name
        );
      });
    })
    .catch((e) => {
      console.error("ERROR:", e);
    });
}, 1000 * 60 * 15);
