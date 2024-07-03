import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img src="/Images/profile.jpeg" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>John</h2>
          <p>johan@gmail.com</p>
        </div>
      </div>
      <div className="profile-options">
        <div className="option" onClick={() => handleNavigation("/account")}>
          <span role="img" aria-label="account">
            👤
          </span>
          <span className="option-text">Account</span>
          <span className="arrow">➔</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/trips")}>
          <span role="img" aria-label="trips">
            🚗
          </span>
          <span className="option-text">My trips</span>
          <span className="arrow">➔</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/card")}>
          <span role="img" aria-label="card">
            💳
          </span>
          <span className="option-text">My card</span>
          <span className="arrow">➔</span>
        </div>
        <div className="option" onClick={() => handleNavigation("/settings")}>
          <span role="img" aria-label="settings">
            ⚙️
          </span>
          <span className="option-text">Setting</span>
          <span className="arrow">➔</span>
        </div>
      </div>
      <div className="profile-footer">
        <div className="footer-icon" onClick={() => handleNavigation("/")}>
          <span role="img" aria-label="home">
            🏠
          </span>
        </div>
        <div className="footer-icon" onClick={() => handleNavigation("/trips")}>
          <span role="img" aria-label="trips">
            🚗
          </span>
        </div>
        <div
          className="footer-icon"
          onClick={() => handleNavigation("/messages")}
        >
          <span role="img" aria-label="messages">
            💬
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
