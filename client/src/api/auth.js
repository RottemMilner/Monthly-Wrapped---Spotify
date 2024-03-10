import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";

// utils
export const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

export const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const spotify = axios.create({
  baseURL: `https://accounts.spotify.com/api`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const generateToken = (code) => {
  return new Promise((resolve, reject) => {
    spotify
      .post("/token", {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_SPOTIFY_CLENT_ID,
        code_verifier: localStorage.getItem("code_verifier"),
        redirect_uri: "http://localhost:3000/callback",
        code,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          resolve(res.data.access_token);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const isTokenValid = async () => {
  const token = localStorage.getItem("access_token");
  await spotify
    .get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
    })
    .catch((error) => {
      return false;
    });
};

const spotifyApi = new SpotifyWebApi();
export default spotifyApi;
