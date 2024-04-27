import React, { useState, useEffect } from "react";
import spotifyApi from "../api/spotifyApi";
import { api, getMinutesListenedForUser } from "../api/api";

function WelcomePage({ user }) {

  return (
    <h2>
        {user ? (
            <div >
              {user && <h2>{user.display_name || user.id}, welcome to your spotify monthly wrapped!</h2>}
              <img
                    src={user.images[1].url}
                    className="user-image"
                />
            </div>
          ) : (
            <h2></h2>
          )}
    </h2>
  );
}

export default WelcomePage;