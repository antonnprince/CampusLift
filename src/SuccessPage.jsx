import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./SuccessPage.css";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickup, dropoff, fare } = location.state || {};

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
        <p className="ride-Success">Ride successfully booked</p>
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
        <button className="ok-button" onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default SuccessPage;
