//Based on artists

// components/TopGenresButton.js

import React, { useState, useEffect } from "react";
import spotifyApi from "../api/spotifyApi";

function TopGenresButton() {
  const [topGenres, setTopGenres] = useState([]);

  const getTopGenres = async () => {
    try {
      const response = await spotifyApi.getMyTopArtists({
        limit: 50,
        time_range: "short_term",
      });

      // Ensure that the response and its items property are defined
      if (response && response.items) {
        const genres = [];
        for (let i = 0; i < response.items.length; i++) {
          const artist = response.items[i];
          if (artist.genres && artist.genres.length > 0) {
            for (let k = 0; k < artist.genres.length; k++) {
              const genre = artist.genres[k];
              genres.push(genre);
            }
          }
        }

        // Count occurrences of each genre
        const genreCounts = genres.reduce((acc, genre) => {
          acc[genre] = (acc[genre] || 0) + 1;
          return acc;
        }, {});

        // Sort genres by occurrence in descending order
        const sortedGenres = Object.keys(genreCounts).sort(
          (a, b) => genreCounts[b] - genreCounts[a]
        );

        // Select the top 5 genres
        const top5Genres = sortedGenres.slice(0, 5);

        setTopGenres(top5Genres);
      }
    } catch (error) {
      console.error("Error fetching top genres:", error);
    }
  };

  useEffect(() => {
    getTopGenres();
  }, []); // Run once on component mount
  return (
    <div>
      <h2>Your Top Genres This Month</h2>
      <ul className="top-tracks-list">
        {topGenres.map((genre, index) => (
          <li key={genre} className="top-genre-item">
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopGenresButton;

/*
//Based on tracks

// components/TopGenresButton.js

import React, { useState, useEffect } from 'react';
import spotifyApi from '../spotifyAuth';

function TopGenresButton() {
  const [topGenres, setTopGenres] = useState([]);

  const getTopGenres = async () => {
    try {
        const response = await spotifyApi.getMyTopTracks({ limit: 50, time_range: 'short_term' });

        // Ensure that the response and its items property are defined
        if (response && response.items) {
          // Extract genres from the tracks
          const genres = [];
          
          for (let i = 0; i < response.items.length; i++) {
            const track = response.items[i];
            console.log(track);
            
            // Ensure that track, artists, and genres properties are defined
            if (track.artists && track.artists.length > 0) {
              for (let j = 0; j < track.artists.length; j++) {
                const artist = track.artists[j];
                console.log(artist.name);
                const a = await spotifyApi.getArtist(artist.id);
                console.log(a);
                
                if (a.genres && a.genres.length > 0) {
                  for (let k = 0; k < a.genres.length; k++) {                    
                    const genre = a.genres[k];
                    genres.push(genre);
                  }
                }
              }
            }
          }
    
      

      // Count occurrences of each genre
      const genreCounts = genres.reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
      }, {});

      // Sort genres by occurrence in descending order
      const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);

      // Select the top 5 genres
      const top5Genres = sortedGenres.slice(0, 10);

      setTopGenres(top5Genres);
    }
    } catch (error) {
      console.error('Error fetching top genres:', error);
    }
  };

  useEffect(() => {
    getTopGenres();
  }, []); // Run once on component mount

  return (
    <div>
      <h2>Top Genres This Month</h2>
      <ul>
        {topGenres.map((genre, index) => (
          <li key={index} className="top-artists-item">{genre} </li>
        ))}
      </ul>
    </div>
  );  
}

export default TopGenresButton;

*/
