import React, { useState } from "react";
import "./MyTrips.css";

const TripCard = ({ status, from, to, date }) => (
  <div className={`trip-card ${status.toLowerCase()}`}>
    <div className="status">
      {status} {date && `(${date})`}
    </div>
    <div className="locations">
      <div>From: {from}</div>
      <div>To: {to}</div>
    </div>
    <div className="map-placeholder"></div>
  </div>
);

const MyTrips = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <h1>My Trips</h1>
        <div className="toggle-switch">
          <button
            className={`toggle-button ${!showHistory ? "active" : ""}`}
            onClick={() => setShowHistory(false)}
          >
            My Trips
          </button>
          <button
            className={`toggle-button ${showHistory ? "active" : ""}`}
            onClick={() => setShowHistory(true)}
          >
            Ride History
          </button>
        </div>
      </header>
      <main>
        {!showHistory ? (
          <div className="current-trip">
            <div className="profile">
              <img src="/Images/profile.jpeg" alt="User" />
              <div className="profile-info">
                <h2>Alan</h2>
                <p>20 Completed Rides</p>
              </div>
            </div>
            <TripCard status="Active" from="Cusat Metro" to="Sahara Hostel" />
            <button className="cancel-btn">Cancel Ride</button>
            <button className="add-stops-btn">+ Add Stops</button>
          </div>
        ) : (
          <div className="ride-history">
            <TripCard
              status="Done"
              from="School of engineering"
              to="Seminar Complex"
              date="2-2-21"
            />
            <TripCard
              status="Canceled"
              from="University Ground"
              to="TinkerSpace"
              date="2-2-21"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default MyTrips;
