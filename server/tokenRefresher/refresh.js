import {
  addOrUpdateToken,
  getToken,
  postRefreshTokenRequest,
} from "../tokenRefresher/refreshTokenUtils.js";
import { updateRecentlyPlayedTracks } from "../db/updateRecentlyPlayedTracks.js";
import logger from "../utils/logger.js";

// static user for now, will loop through all users in the future
const tzvigr = "21ftkwf2rcbv6o4kbmdveukui";
export function main(userSpotifyId = tzvigr) {
  // const userLogger = logger.child({}, { msgPrefix: `[${userSpotifyId}]\t` });
  const userLogger = logger.child({ user: userSpotifyId }, {});
  getToken(userSpotifyId)
    .then((tokenResult) => {
      userLogger.info("got token");
      return tokenResult.refreshToken;
    })
    .then((token) => {
      return postRefreshTokenRequest(token);
    })
    .then((res) => {
      userLogger.info("refreshed token");
      const { access_token, refresh_token } = res;
      addOrUpdateToken(userSpotifyId, refresh_token, access_token).then(() => {
        userLogger.info("Updated token in json");
      });
      return access_token;
    })
    .then((access_token) => {
      updateRecentlyPlayedTracks(access_token, userSpotifyId).then((user) => {
        userLogger.info(
          `Updated recently played tracks for user: ${user.display_name}`
        );
      });
    })
    .catch((e) => {
      userLogger.error(e);
    });
}

function job() {
  logger.info("\n updating tokens and recently played tracks job started");
  main();
}

job();
setInterval(job, 1000 * 60 * 15);
