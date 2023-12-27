// components/TopTracks.js

import React, { useState, useEffect } from 'react';
import spotifyApi from '../spotifyAuth';
import PropTypes from 'prop-types';

function TopTracks({ user }) {
  const [topTracks, setTopTracks] = useState([]);
  const [showHeadline, setShowHeadline] = useState(false);
  const [playlistId, setPlaylistId] = useState(null);

  useEffect(() => {
    // Fetch the user's top tracks
    spotifyApi.getMyTopTracks({ limit: 50, time_range: 'short_term' }).then((response) => {
      setTopTracks(response.items);
      setShowHeadline(true); // Set to true after fetching data

      // Check if playlist is already created
      const storedPlaylistId = localStorage.getItem('playlistId');
      if (storedPlaylistId) {
        setPlaylistId(storedPlaylistId);
      }
    });
  }, [user]);

  const getCurrentMonthAndYear = () => {
    const currentDate = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    return `${currentMonth} ${currentYear}`;
  };

  const handleCreatePlaylist = async () => {
    // Implement logic to create a playlist with top tracks
    // Use the user.id, topTracks, and Spotify API
    // Example:
    const playlistName = `Top Tracks of ${getCurrentMonthAndYear()}`;
    const playlistDescription = `A playlist of your top 50 tracks in ${getCurrentMonthAndYear()}.`;
    spotifyApi.createPlaylist(user.id, {
      name: playlistName,
      public: false, // Set to true if you want the playlist to be public
      description: playlistDescription,
    }).then((playlist) => {
      setPlaylistId(playlist.id); // Store the playlist ID
      localStorage.setItem('playlistId', playlist.id); // Store in local storage
      const trackUris = topTracks.map((track) => track.uri);
      spotifyApi.addTracksToPlaylist(playlist.id, trackUris).then(() => {
        // Playlist created successfully
        console.log('Playlist created successfully!');
      });
    });
  };

  const handleDeletePlaylist = () => {
    // Delete the playlist using the stored playlistId
    if (playlistId) {
      spotifyApi.unfollowPlaylist(playlistId).then(() => {
        // Playlist deleted successfully
        console.log('Playlist deleted successfully!');
        setPlaylistId(null); // Reset the playlist ID in the state
        localStorage.removeItem('playlistId'); // Remove from local storage
      });
    }
  };

  return (
    <div>
      {showHeadline && <h2>Top Tracks This Month</h2>}
      {playlistId ? (
        <button onClick={handleDeletePlaylist} className="clear-favorites-button">Delete Playlist</button>
      ) : (
        <button onClick={handleCreatePlaylist} className="search-button">Create Playlist</button>
      )}
      <ul className="top-tracks-list">
        {topTracks.map((track) => (
          <div key={track.id} className="top-tracks-item">
            <div className="track-info">
            <p className="track-name">{track.name}<br/>{track.artists.map((artist) => artist.name).join(', ')}</p>
            {track.album.images.length > 0 && (
              <img
                src={track.album.images[0].url} // Assuming you want to display the album art
                alt={track.name}
                className="track-image"
              />
            )}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

TopTracks.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TopTracks;
