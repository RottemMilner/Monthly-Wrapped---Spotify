import React, { useEffect } from "react";
import { generateToken } from "../api/auth";
import { useNavigate } from "react-router-dom";
const Redirect = ({ setAccessToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Access code after successful login.
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    // Checking for the presence of a token.
    const token = localStorage.getItem("access_token");
    if (!token) {
      // Utilizing the previously created generateToken request function.
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
