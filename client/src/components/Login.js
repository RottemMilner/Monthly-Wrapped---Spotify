// Login.js

import React from 'react';
import { loginUrl } from '../spotifyAuth';
import '../App.css'; // Import the CSS file

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <a href={loginUrl} className="login-button">
        Login with Spotify
      </a>
    </div>
  );
}

export default Login;



