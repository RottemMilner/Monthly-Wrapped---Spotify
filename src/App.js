// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getTokenFromUrl, setAccessToken, loginUrl } from './spotifyAuth';
import spotifyApi from './spotifyAuth';
import Login from './components/Login';
import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';
import './App.css';
import spotifyLogo from './Spotify Logo.png';
import TopGenresButton from './components/TopGenresButton';
import Slideshow from './components/Slideshow';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const token = hash.access_token;

    if (token) {
      setAccessToken(token);

      // Fetch user data
      spotifyApi.getMe().then((userData) => {
        setUser(userData);
      });
    }    
  }, []);

  const handleLogout = () => {
    // Implement logout logic
    // For example, you can clear the access token and user data
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
          <a href="https://www.spotify.com/" target="_blank" rel="noopener noreferrer">
            <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
          </a>
          <nav>
            <ul>
              <li>
                {user ? (
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                ) : (
                  <a href={loginUrl} className="login-button">
                    Login with Spotify
                  </a>
                )}
              </li>
              {user &&
                  <Link to="/" className="home-link">
                    <h1>Click to see your Monthly Wrapped</h1>
                  </Link>
              }
              {/* Add more navigation links for other features */}
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes for other features */}
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

