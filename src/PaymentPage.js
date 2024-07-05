import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./PaymentPage.css";

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('googlePay');
  const [googlePayId, setGooglePayId] = useState('');
  const [isGooglePayReady, setIsGooglePayReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { fare } = location.state || {};

  useEffect(() => {
    const loadGooglePay = async () => {
      if (window.google) {
        const paymentsClient = new window.google.payments.api.PaymentsClient({
          environment: 'TEST', // Use 'PRODUCTION' in a real environment
        });
        const isReadyToPayRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example', // Replace with your gateway
                  gatewayMerchantId: 'exampleGatewayMerchantId', // Replace with your gateway merchant ID
                },
              },
            },
          ],
        };

        const isReadyToPay = await paymentsClient.isReadyToPay(isReadyToPayRequest);
        setIsGooglePayReady(isReadyToPay.result);
      }
    };

    loadGooglePay();
  }, []);

  const handlePaymentSelection = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleGooglePayIdChange = (event) => {
    setGooglePayId(event.target.value);
  };

  const handlePayment = () => {
    if (selectedPayment === 'googlePay') {
      processGooglePayPayment();
    } else if (selectedPayment === 'card') {
      navigate('/card-billing');
    } else if (selectedPayment === 'cash') {
      alert('Please pay the cash amount to the driver.');
      navigate('/');
    } else {
      // Add other payment processing logic here
      alert('Payment successful!');
      navigate('/');
    }
  };

  const processGooglePayPayment = async () => {
    if (!googlePayId) {
      alert('Please enter your Google Pay ID or scan the QR code.');
      return;
    }

    // Process the payment using the Google Pay ID
    // For demo purposes, we assume the payment is successful
    alert(`Payment successful using Google Pay ID: ${googlePayId}`);
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
            value="cash"
            checked={selectedPayment === 'cash'}
            onChange={handlePaymentSelection}
          />
          <label htmlFor="cash">Cash</label>
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
      {selectedPayment === 'googlePay' && isGooglePayReady && (
        <div className="google-pay-form">
          <input
            type="text"
            placeholder="Enter Google Pay ID"
            value={googlePayId}
            onChange={handleGooglePayIdChange}
            className="google-pay-id-input"
          />
          {/* You can add a QR code scanner here if needed */}
          <button className="pay-now-button" onClick={handlePayment}>
            Pay Now ₹{fare}
          </button>
        </div>
      )}
      {(selectedPayment === 'cash') && (
        <div className="pay-now-container">
          <button className="pay-now-button" onClick={handlePayment}>
            Confirm Ride
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;



