import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import spotifyLogo from "./Spotify Logo.png";
import Slideshow from "./components/Slideshow";
import spotifyApi from "./api/spotifyApi";
import Redirect from "./components/Callback";

import { createOrUpdateUser } from "./api/api";

function App() {
  const [user, _setUser] = useState(null);
  const [accessToken, _setAccessToken] = useState(null);

  const setAccessToken = (token) => {
    _setAccessToken(token);
    localStorage.setItem("access_token", token);
  };

  const setUser = (user) => {
    _setUser(user);
    if (!user) return;

    createOrUpdateUser(user)
      .then((res) => console.log("Sent user to MongoDB", res))
      .catch((err) => console.error("Error registering user to MongoDB", err));
  };

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .getMe()
        .then((userData) => {
          setUser(userData);
        })
        .catch((err) => {
          localStorage.removeItem("access_token");
          console.error("Error fetching user data", err);
        });
    } else {
      const token = localStorage.getItem("access_token");
      if (token) {
        setAccessToken(token);
      }
    }
  }, [accessToken]);

  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {user ? (
            <div className="user-greeting">
              {user && <h2>Welcome, {user.display_name || user.id}!</h2>}
            </div>
          ) : (
            <h1>Spotify Monthly Wrapped</h1>
          )}
          {/* <a
            href="https://www.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={spotifyLogo}
              alt="Spotify Logo"
              className="spotify-logo"
            />
          </a> */}
          <nav>
            <ul>
              <li>
                {user ? (
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="login-link">
                    login
                  </Link>
                )}
              </li>
              {user && (
                <Link to="/wrapped" className="home-link">
                  <h1>Click to see your Monthly Wrapped</h1>
                </Link>
              )}
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/wrapped" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/callback"
            element={<Redirect setAccessToken={setAccessToken} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

// New component for the home page
function Home({ user }) {
  return (
    <div>
      {user && (
        <>
          <Slideshow user={user} />
        </>
      )}
    </div>
  );
}

export default App;
