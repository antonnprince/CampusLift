import React, { useState, useEffect } from 'react';
import './RiderDashboard.css'; // You'll need to create this CSS file
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom';

const RiderDashboard = () => {
  const navigate = useNavigate()
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState('');
  const [requestId, setRequestId]=useState("")
  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      transports: ["websocket"]
    });

    newSocket.on("connect", () => {
      console.log("Rider connected");
      setSocketId(newSocket.id);
    });

    newSocket.on("rideRequestDetails", (details) => {
      console.log("Ride request details received:", details);
      setRideRequests(details);
      setLoading(false);
    });

    newSocket.on("disconnect", () => {
      console.log("Rider disconnected");
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const acceptRide=()=>{
    socket.emit("acceptRide", {requestId:requestId,driverId:socketId})
      const data = {
          driverId:socketId,
      }
    socket.emit("getRiderDetails",data)
    }

  return (
    <div className="rider-dashboard">
      <h1 className="heading">Pending Ride Requests</h1>
      
      {rideRequests.length === 0 ? (
        <p>No pending ride requests at the moment.</p>
      ) : (
        <ul className="ride-request-list">
          {rideRequests.map((ride) => (
            <li key={ride.id} className="ride-request-item">
              <div className="ride-details">
                <p><strong>Pickup:</strong>{ride.pickup}</p>
                <p><strong>Dropoff:</strong>{ride.dropoff}</p>
              </div>

              <button onClick={()=>{navigate("/riderD")}} className="accept-button">
                Accept Ride
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RiderDashboard;
