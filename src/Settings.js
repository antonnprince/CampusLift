import React, { useState } from "react";
import "./Settings.css";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    // Logic for logging out the user
    console.log("User logged out");
    // Redirect to login page or home page after logout
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Additional logic for toggling dark mode can be added here
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
      </div>
      <h2 className="settings-title">Settings</h2>
      <div className="settings-options">
        <div
          className="option"
          onClick={() => navigate("/notification-settings")}
        >
          <span role="img" aria-label="notification">
            🔔
          </span>
          <span className="option-text">Notification Setting</span>
          <span className="arrow">➔</span>
        </div>
        <div className="option" onClick={() => navigate("/payment-settings")}>
          <span role="img" aria-label="payment">
            💳
          </span>
          <span className="option-text">Payment Settings</span>
          <span className="arrow">➔</span>
        </div>
        <div className="option">
          <span role="img" aria-label="dark-mode">
            🌙
          </span>
          <span className="option-text">Dark Mode</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="option" onClick={() => navigate("/location-settings")}>
          <span role="img" aria-label="location">
            📍
          </span>
          <span className="option-text">Location</span>
          <span className="arrow">➔</span>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <span role="img" aria-label="logout">
          🔴
        </span>
        Log out
      </button>
    </div>
  );
};

export default Settings;
