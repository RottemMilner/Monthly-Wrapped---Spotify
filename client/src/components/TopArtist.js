import React, { useState, useEffect } from "react";
import spotifyApi from "../api/spotifyApi";

function TopArtist() {
  const [topArtist, setTopArtist] = useState(null);
  const [showHeadline, setShowHeadline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's top artist
    spotifyApi
      .getMyTopArtists({ limit: 1, time_range: "short_term" })
      .then((response) => {
        setTopArtist(response.items[0]);
        setShowHeadline(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching top artist:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {!loading && showHeadline && (
        <>
          <h2>Your Top Artist This Month Was...</h2>
          <div>
            {topArtist && topArtist.images.length > 0 && (
              <img
                src={topArtist.images[0].url} // Assuming you want to display the artist's image
                alt="Artist Image"
                className="user-image"
              />
            )}
          </div>
          <div>
            <h1>{topArtist && topArtist.name}</h1>
          </div>
        </>
      )}
    </div>
  );
}

export default TopArtist;
