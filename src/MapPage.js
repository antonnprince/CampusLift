import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import "./MapPage.css";


const MapPage = () => {
  const [directions, setDirections] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [duration, setDuration] = useState('');
  const [fare, setFare] = useState(0);
 
  const navigate = useNavigate();

  const mapStyles = {
    height: "64vh",
    width: "100%",
  };
  const defaultCenter = {
    lat: 10.042515310682658,
    lng: 76.32844361074093,
  };

  const MAX_RADIUS = 3; // Maximum radius in kilometers

  const onPlaceChangedPickup = (value) => {
    setPickup(value);
    getCoordinates(value.label, setPickupCoords);
  };

  const onPlaceChangedDropoff = (value) => {
    setDropoff(value);
    getCoordinates(value.label, setDropoffCoords);
  };

  const getCoordinates = (address, setCoords) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        const { lat, lng } = results[0].geometry.location;
        setCoords({ lat: lat(), lng: lng() });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };
 
  const Next = () => {
    navigate('/success', { 
      state: { 
        pickup: pickup?.label, 
        dropoff: dropoff?.label, 
        pickupCoords,
        dropoffCoords,
        fare 
      } 
    });

  };

  const calculateFare = (distanceInMeters, durationInSeconds) => {
    const baseFare = 10; // Base fare in currency units
    const costPerKm = 2; // Cost per kilometer in currency units
    const costPerMinute = 1; // Cost per minute in currency units
    const rushHourMultiplier = 1.5; // Rush hour multiplier
  
    // Assuming rush hours are between 9-11 AM and 3-6 PM
    const currentHour = new Date().getHours();
    const isRushHour = (currentHour >= 9 && currentHour <= 11) || (currentHour >= 15 && currentHour <= 18);
  
    const fare = baseFare + (distanceInMeters / 1000) * costPerKm + (durationInSeconds / 60) * costPerMinute;
  
    return Math.ceil(isRushHour ? fare * rushHourMultiplier : fare);
  };

  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in kilometers

    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lng - coords1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const calculateRoute = () => {
    if (pickup && dropoff && pickupCoords && dropoffCoords && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickupCoords,
          destination: dropoffCoords,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const legs = result.routes[0].legs;
            if (legs.length > 0) {
              const distanceInKm = legs[0].distance.value / 1000;
              
              if (distanceInKm > MAX_RADIUS) {
                setDirections(null);
                setDuration('');
                setFare(0);
                alert(`The dropoff location is beyond the allowed radius of ${MAX_RADIUS} kilometers.`);
                return;
              }
  
              setDirections(result);
              setDuration(legs[0].duration.text);
              const durationInSeconds = legs[0].duration.value;
              const calculatedFare = calculateFare(legs[0].distance.value, durationInSeconds);
              setFare(calculatedFare);
            }
          } else {
            console.error(`Error fetching directions: ${status}`);
            setDirections(null);
            setDuration('');
            setFare(0);
          }
        }
      );
    }
  };

  useEffect(() => {
   
}, [pickup, dropoff, pickupCoords, dropoffCoords]);
  

  return (
    <div style={{ fontFamily: 'Inter', padding: '20px' }}>
      <h1 style={{ fontFamily: 'Inter', fontWeight: 'Bold', fontSize: '30px' }}>Let's start the ride</h1>

      <LoadScript
        googleMapsApiKey='AIzaSyBvRXLxeGTr5AwjgjtaHK5Emdgtyz6A6U0'
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
            apiKey='AIzaSyBvRXLxeGTr5AwjgjtaHK5Emdgtyz6A6U0'
            selectProps={{
              value: pickup,
              onChange: onPlaceChangedPickup,
              placeholder: "Enter Pickup Location",
            }}
          />
          <GooglePlacesAutocomplete
            apiKey='AIzaSyBvRXLxeGTr5AwjgjtaHK5Emdgtyz6A6U0'
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
      {fare > 0 && <div>Estimated Fare: ₹{fare}</div>}
      <button className='button2' onClick={Next} disabled={!pickup || !dropoff}>Confirm Ride</button>
    </div>
  );
};

export default MapPage;