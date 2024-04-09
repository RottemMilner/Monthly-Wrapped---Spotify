import { addOrUpdateToken, getAllUsers, getToken } from "../db/json/utils.js";
import { updateRecentlyPlayedTracks } from "../db/mongo/DButils.js";
import { hoursDiffFromNow } from "../utils/dateDiff.js";
import { postRefreshTokenRequest } from "../api/spotifyApi.js";
import logger from "../utils/logger.js";

const findUsersToRefresh = async () => {
  const users = await getAllUsers();
  logger.debug(`Users: ${users.length}`);

  // access tokens are valid for one hour
  const usersWithValidToken = users.filter((user) => {
    const diff = hoursDiffFromNow(user.updated_at);
    return diff < 1;
  });

  logger.debug(`Users with valid token:  ${usersWithValidToken.length}`);
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

const fourtyFiveMinutes = 1000 * 60 * 45;
job();
setInterval(job, fourtyFiveMinutes);
