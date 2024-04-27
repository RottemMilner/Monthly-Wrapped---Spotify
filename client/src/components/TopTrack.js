import React, { useState, useEffect } from "react";
import spotifyApi from "../api/spotifyApi";

function TopTrack() {
  const [topTrack, setTopTrack] = useState(null);
  const [showHeadline, setShowHeadline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's top tracks
    spotifyApi
      .getMyTopTracks({ limit: 1, time_range: "short_term" })
      .then((response) => {
        setTopTrack(response.items[0]);
        setShowHeadline(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching top track:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {!loading && showHeadline && (
        <>
          <h2>Your Top Track This Month Was...</h2>
          <div>
            {topTrack && topTrack.album.images.length > 0 && (
              <img
                src={topTrack.album.images[1].url} // Assuming you want to display the album art
                alt="Album Art"
                className="user-image"
              />
            )}
          </div>
          <div>
            <h1>{topTrack && topTrack.name}</h1>
            <div>
              <h2>
                {topTrack &&
                  topTrack.artists.map((artist) => artist.name).join(", ")}
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TopTrack;
