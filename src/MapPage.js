import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import "./MapPage.css";

const MapPage = () => {
  const [directions, setDirections] = useState(null);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [duration, setDuration] = useState('');
  const [fare, setFare] = useState(0);
  const navigate = useNavigate();

  const mapStyles = {
    height: "64vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 10.051969, lng: 76.315773
  };

  const Next=()=>{
    navigate('/success', { state: { pickup, dropoff, fare } });
  }

  const calculateRoute = () => {
    if (pickup !== '' && dropoff !== '') {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: dropoff,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            const legs = result.routes[0].legs;
            if (legs.length > 0) {
              setDuration(legs[0].duration.text);
              const distanceInMeters = legs[0].distance.value;
              const fare = Math.ceil(distanceInMeters / 150) * 5;
              setFare(fare);
              
            }
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  return (
    <div style={{ fontFamily: 'Inter', padding: '20px' }}>
      <h1 style={{ fontFamily: 'Inter', fontWeight: 'Bold', fontSize: '30px' }}>Let's start the ride</h1>

      <LoadScript googleMapsApiKey="AIzaSyBvRXLxeGTr5AwjgjtaHK5Emdgtyz6A6U0">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <div>
        <input className='pickupinput'
          type="text"
          placeholder="Enter Pickup Location"
          value={pickup}
          onChange={e => setPickup(e.target.value)}
        />
        <input className='dropoffinput'
          type="text"
          placeholder="Enter Dropoff Location"
          value={dropoff}
          onChange={e => setDropoff(e.target.value)}
        />
      </div>
      <button onClick={calculateRoute} className='button1'>Calculate Route</button>
      {duration && <div>Estimated Time: {duration}</div>}
      <button className='button2' onClick={Next}>Confirm Ride</button>
    </div>
  );
};

export default MapPage;
