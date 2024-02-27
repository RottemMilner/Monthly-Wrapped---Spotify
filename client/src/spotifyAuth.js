import SpotifyWebApi from "spotify-web-api-js";

const genreateLoginUrl = () => {
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const clientId = process.env.REACT_APP_SPOTIFY_CLENT_ID;
  const redirectUri = "http://localhost:3000/callback";

  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-recently-played",
    "user-top-read",
    "user-read-currently-playing",
    "playlist-modify-public",
    "playlist-modify-private",
    "app-remote-control",
    "streaming",
  ];

  const url = new URL(authEndpoint);
  const params = {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    response_type: "token",
    show_dialog: "true",
  };

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.href;
};

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const setAccessToken = (token) => {
  if (token) {
    spotifyApi.setAccessToken(token);
    localStorage.setItem("spotifyAccessToken", token);
  }
};
export const getAccessTokenFromStorage = () => {
  return localStorage.getItem("spotifyAccessToken");
};

export const initializeAccessToken = () => {
  const storedToken = getAccessTokenFromStorage();
  if (storedToken) {
    spotifyApi.setAccessToken(storedToken);
  }
};

export const loginUrl = genreateLoginUrl();
const spotifyApi = new SpotifyWebApi();

export default spotifyApi;
