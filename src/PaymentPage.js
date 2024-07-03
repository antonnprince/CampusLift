import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./PaymentPage.css";

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('googlePay');
  const location = useLocation();
  const navigate = useNavigate();
  const { fare } = location.state || {};

  const handlePaymentSelection = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handlePayment = () => {
    // Add payment processing logic here
    alert('Payment successful!');
    navigate('/');
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
      </div>
      <h2>Preferred Mode</h2>
      <div className="payment-options">
        <div className="payment-option">
          <input
            type="radio"
            id="googlePay"
            name="paymentMethod"
            value="googlePay"
            checked={selectedPayment === 'googlePay'}
            onChange={handlePaymentSelection}
          />
          <label htmlFor="googlePay">
            <div className="payment-label">
              <span>Google Pay</span>
              {selectedPayment === 'googlePay' && (
                <button className="pay-now-button" onClick={handlePayment}>
                  Pay Now ₹{fare}
                </button>
              )}
            </div>
          </label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="paytm"
            name="paymentMethod"
            value="paytm"
            checked={selectedPayment === 'paytm'}
            onChange={handlePaymentSelection}
          />
          <label htmlFor="paytm">Paytm</label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="card"
            name="paymentMethod"
            value="card"
            checked={selectedPayment === 'card'}
            onChange={handlePaymentSelection}
          />
          <label htmlFor="card">MasterCard •••• 9999</label>
        </div>
      </div>
      <h3>UPI</h3>
      <div className="upi-options">
        <div className="payment-option">
          <input
            type="radio"
            id="phonePe"
            name="paymentMethod"
            value="phonePe"
            checked={selectedPayment === 'phonePe'}
            onChange={handlePaymentSelection}
          />
          <label htmlFor="phonePe">PhonePe UPI <span className="low-success">Low success rate currently</span></label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="mobikwik"
            name="paymentMethod"
            value="mobikwik"
            checked={selectedPayment === 'mobikwik'}
            onChange={handlePaymentSelection}
          />
          <label htmlFor="mobikwik">Mobikwik</label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="credPay"
            name="paymentMethod"
            value="credPay"
            checked={selectedPayment === 'credPay'}
            onChange={handlePaymentSelection}
          />
          <label htmlFor="credPay">CRED pay</label>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
