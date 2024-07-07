import React, { useState, useEffect } from 'react';
import './RiderDashboard.css'; // You'll need to create this CSS file

const RiderDashboard = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock function to fetch ride requests
  const fetchRideRequests = async () => {
    // In a real application, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, pickup: "123 Main St", dropoff: "456 Elm St", fare: 150, status: "pending" },
          { id: 2, pickup: "789 Oak Ave", dropoff: "321 Pine Rd", fare: 200, status: "pending" },
          { id: 3, pickup: "555 Cedar Ln", dropoff: "777 Maple Dr", fare: 175, status: "pending" },
        ]);
      }, 1000); // Simulate network delay
    });
  };

  useEffect(() => {
    const getRideRequests = async () => {
      try {
        const data = await fetchRideRequests();
        setRideRequests(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ride requests');
        setLoading(false);
      }
    };

    getRideRequests();
  }, []);

  const handleAcceptRide = (id) => {
    // In a real application, this would update the ride status in the backend
    setRideRequests(rideRequests.map(ride => 
      ride.id === id ? { ...ride, status: 'accepted' } : ride
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="rider-dashboard">
      <h1 className="heading">Pending Ride Requests</h1>
      {rideRequests.length === 0 ? (
        <p>No pending ride requests at the moment.</p>
      ) : (
        <ul className="ride-request-list">
          {rideRequests.map(ride => (
            <li key={ride.id} className="ride-request-item">
              <div className="ride-details">
                <p><strong>Pickup:</strong> {ride.pickup}</p>
                <p><strong>Dropoff:</strong> {ride.dropoff}</p>
                <p><strong>Fare:</strong> ₹{ride.fare}</p>
                <p><strong>Status:</strong> {ride.status}</p>
              </div>
              {ride.status === 'pending' && (
                <button onClick={() => handleAcceptRide(ride.id)} className="accept-button">
                  Accept Ride
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RiderDashboard;