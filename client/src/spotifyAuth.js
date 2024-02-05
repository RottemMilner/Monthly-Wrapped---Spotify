// spotifyAuth.js

import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
const redirectUri = 'http://localhost:3000/callback'; // Your redirect URI

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '93eccb80fce44629b1d618ed9cf26ba3'; // Replace with your client ID

const scopes = ['user-read-private', 'user-read-email','user-read-recently-played', 'user-top-read', 'user-read-currently-playing', 'playlist-modify-public' , 'playlist-modify-private', 'app-remote-control', 'streaming']; // Add more scopes as needed

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const setAccessToken = (token) => {
  if (token) {
    spotifyApi.setAccessToken(token);
  }
};

export default spotifyApi;
