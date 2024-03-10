// components/TopArtists.js

import React, { useState, useEffect } from "react";
import spotifyApi from "../api/auth";

function TopArtists() {
  const [topArtists, setTopArtists] = useState([]);
  const [showHeadline, setShowHeadline] = useState(false);

  useEffect(() => {
    // Fetch the user's top artists
    spotifyApi
      .getMyTopArtists({ limit: 5, time_range: "short_term" })
      .then((response) => {
        setTopArtists(response.items);
        setShowHeadline(true); // Set to true after fetching data
      });
  }, []);
  return (
    <div>
      {showHeadline && <h2>Top Artists This Month</h2>}
      <div className="atop-artists-container">
        {topArtists.map((artist, index) => (
          <div key={artist.uri + artist.name} className="atop-artists-item">
            <div className="aartist-info">
              <p className="aartist-name">
                {index + 1}. {artist.name}
              </p>
              <div className="aartist-image">
                {artist.images.length > 0 && (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="aartist-image"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArtists;
