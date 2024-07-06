import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import "./MapPage.css";

const MapPage = () => {
  const [directions, setDirections] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [duration, setDuration] = useState('');
  const [fare, setFare] = useState(0);
  const navigate = useNavigate();

  const mapStyles = {
    height: "64vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 10.051969,
    lng: 76.315773,
  };

  const onPlaceChangedPickup = (value) => {
    setPickup(value);
  };

  const onPlaceChangedDropoff = (value) => {
    setDropoff(value);
  };

  const Next = () => {
    navigate('/success', { state: { pickup: pickup.label, dropoff: dropoff.label, fare } });
  };
  const calculateFare = (distance, duration) => {
    const baseFare = 10; // Base fare in currency units
    const costPerKm = 2; // Cost per kilometer in currency units
    const costPerMinute = 1; // Cost per minute in currency units
    const rushHourMultiplier = 1.5; // Rush hour multiplier

    // Assuming rush hours are between 9-11 AM and 1-6 PM
    const currentHour = new Date().getHours();
    const isRushHour = (currentHour >= 9 && currentHour <= 11) || (currentHour >= 15 && currentHour <= 18);

    const fare = baseFare + (distance / 1000) * costPerKm + (duration / 60) * costPerMinute;

    return isRushHour ? fare * rushHourMultiplier : fare;
  };
  const calculateRoute = () => {
    if (pickup && dropoff) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup.label,
          destination: dropoff.label,
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

      <LoadScript
        googleMapsApiKey="AIzaSyBvRXLxeGTr5AwjgjtaHK5Emdgtyz6A6U0"
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          {directions && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
        <div>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyBvRXLxeGTr5AwjgjtaHK5Emdgtyz6A6U0"
            selectProps={{
              value: pickup,
              onChange: onPlaceChangedPickup,
              placeholder: "Enter Pickup Location",
            }}
          />
          <GooglePlacesAutocomplete
            apiKey="AIzaSyBvRXLxeGTr5AwjgjtaHK5Emdgtyz6A6U0"
            selectProps={{
              value: dropoff,
              onChange: onPlaceChangedDropoff,
              placeholder: "Enter Dropoff Location",
            }}
          />
        </div>
      </LoadScript>
      <button onClick={calculateRoute} className='button1'>Calculate Route</button>
      {duration && <div>Estimated Time: {duration}</div>}
      <button className='button2' onClick={Next} disabled={!pickup || !dropoff}>Confirm Ride</button>
    </div>
  );
};

export default MapPage;


