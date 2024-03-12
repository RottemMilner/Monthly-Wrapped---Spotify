import {
  addOrUpdateToken,
  getAllUsers,
  getToken,
  postRefreshTokenRequest,
} from "../tokenRefresher/refreshTokenUtils.js";
import { updateRecentlyPlayedTracks } from "../db/updateRecentlyPlayedTracks.js";
import logger from "../utils/logger.js";
import { hoursDiffFromNow } from "../utils/dateDiff.js";

const findUsersToRefresh = async () => {
  const users = await getAllUsers();

  // access tokens are valid for one hour
  const usersWithValidToken = users.filter((user) => {
    const diff = hoursDiffFromNow(user.updated_at);
    return diff < 1;
  });
  return usersWithValidToken;
};

export function refreshTokenAndUpdateUserData(userSpotifyId) {
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
  findUsersToRefresh().then((users) => {
    users.forEach((user) => {
      refreshTokenAndUpdateUserData(user.userSpotifyId);
    });
  });
}

job();
setInterval(job, 1000 * 60 * 45);
