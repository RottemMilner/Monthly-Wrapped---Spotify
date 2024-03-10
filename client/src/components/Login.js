// page/Login.js
// url : /login
import React, { useEffect } from "react";
import { sha256, base64encode, generateRandomString } from "../api/spotifyApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const codeVerifier = generateRandomString(64);
  window.localStorage.setItem("code_verifier", codeVerifier);

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
  const scope = scopes.join(" ");
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const requestAuth = async () => {
    try {
      // Encode after hashing
      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);
      const params = {
        response_type: "code",
        client_id: clientId,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Redirect if token doesn't exist.
    const token = localStorage.getItem("access_token");
    if (!token) {
      requestAuth();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <p>Authorizing...</p>
    </div>
  );
};

export default Login;
