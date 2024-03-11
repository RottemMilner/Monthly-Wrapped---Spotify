import axios from "axios";

export const getRecentlyPlayedTracks = (token) => {
  const url = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
  // const url = "https://api.spotify.com/v1/me/player/recently-played?limit=50";
  return axios
    .get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result.data.items.map((item) => {
        const track = item.track;
        return {
          spotifyId: track.id,
          name: track.name,
          played_at: item.played_at,
          duration_ms: track.duration_ms,
          href: track.href,
        };
      });
    })
    .catch((err) => {
      console.error("Error fetching recently played:", err);
    });
};
