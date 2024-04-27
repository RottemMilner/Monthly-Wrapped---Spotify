import React, { useState, useEffect } from "react";
import spotifyApi from "../api/spotifyApi";
import { api, getMinutesListenedForUser } from "../api/api";

function Minutes({ user }) {

  const [minutes, setMInutes] = useState(0);

  getMinutesListenedForUser(user['id'])
      .then((res) => setMInutes(res))
      .catch((err) => console.error("Error fetching minutes", err))

  return (
    <h2>
      You listened for
      <h2>{Math.round(minutes)} minutes</h2>
      this month!
    </h2>
  );
}

export default Minutes;