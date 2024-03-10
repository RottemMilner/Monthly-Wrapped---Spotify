import React, { useEffect } from "react";
import { generateToken } from "../api/spotifyApi";
import { useNavigate } from "react-router-dom";
const Redirect = ({ setAccessToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    const token = localStorage.getItem("access_token");
    if (!token) {
      generateToken(code)
        .then((res) => {
          setAccessToken(res);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
      navigate("/");
    } else {
    }
  }, []);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default Redirect;
