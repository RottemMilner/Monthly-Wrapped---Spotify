import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

export const createOrUpdateUser = async (user) => {
  const token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  return api.post(
    "/users",
    {
      user: {
        display_name: user.display_name,
        spotifyId: user.id,
        email: user.email,
      },
      refreshToken: refresh_token,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMinutesListenedForUser = async (spotifyId) => {
  return api
    .get(`/users/${spotifyId}/minutes`)
    .then((res) => res.data.minutes)
    .catch((err) => console.error("error getting minutes for user: ", err));
};
