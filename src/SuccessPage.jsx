import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./SuccessPage.css";
import io from "socket.io-client";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickup, dropoff, fare, pickupCoords, dropoffCoords } = location.state || {};
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"]
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket");
      setSocketId(newSocket.id); // Store the socket id in state
    });

    newSocket.on("rideFound", (data) => {
      console.log(data);
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    newSocket.on("riderMessage", (data) => {
      console.log(data);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const requestRide = () => {
    socket.emit("rideRequest", { 
      message: "Requesting ride", 
      id: socketId, 
      pickup: pickup, 
      dropoff: dropoff, 
      pickupCoords: pickupCoords, 
      dropoffCoords: dropoffCoords 
    });
    console.log("pickup", pickup, "dropoff", dropoff, "pickupCoords", pickupCoords, "dropoffCoords", dropoffCoords);
  };

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { fare } });
  };

  return (
    <div className="success-page">
      <div className="success-header">
        <button className="close-button" onClick={() => navigate(-1)}>✕</button>
      </div>
      <div className="success-content">
        <div className="success-icon">✔</div>
        <h2 className="thank-you">Thank You!</h2>
        <p className="ride-Success">Ride Summary Here! </p>
        <div className="summary">
          <div className="summary-header">
            <span>Summary</span>
          </div>
          <div className="summary-details">
            <div className="summary-item">
              <span className="summary-label">From</span>
              <span className="summary-value">{pickup}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">To</span>
              <span className="summary-value">{dropoff}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Price</span>
              <span className="summary-value">₹ {fare}</span>
            </div>
          </div>
        </div>
        <button className="ok-button" 
          onClick={() => {
            requestRide();
            handleProceedToPayment();
          }}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
