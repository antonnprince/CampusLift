import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios'; // Make sure to install axios: npm install axios

const libraries = ["places"];

const RiderLocationTracker = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const pickup = { lat: 10.0439, lng: 76.3249 };
  const dropoff = { lat: 10.0483, lng: 76.3315 };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBvRXLxeGTr5AwjgjtaHK5Emdgtyz6A6U0",
    libraries
  });

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const mapOptions = {
    disableDefaultUI: true,
    clickableIcons: false,
    scrollwheel: true,
  };

  // Smooth center change
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current?.panTo({ lat, lng });
    mapRef.current?.setZoom(15);
  }, []);

  // Function to fetch driver's location from backend
  const fetchDriverLocation = async () => {
    try {
      const response = await axios.get('YOUR_BACKEND_API_URL/driver-location');
      return response.data; // Assuming the API returns { lat: number, lng: number }
    } catch (error) {
      console.error('Error fetching driver location:', error);
      setError('Failed to fetch driver location');
      return null;
    }
  };

  // Fetch driver's location at regular intervals
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const newLocation = await fetchDriverLocation();
      if (newLocation) {
        setDriverLocation(newLocation);
        if (markerRef.current) {
          markerRef.current.setPosition(newLocation);
        }
        panTo(newLocation);
      }
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [panTo]);

  const calculateRoute = useCallback(() => {
    if (isLoaded && window.google && driverLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: driverLocation,
          destination: dropoff,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setError(null);
          } else {
            console.error(`Error fetching directions: ${status}`);
            setDirections(null);
            setError(`Error fetching directions. Status: ${status}`);
          }
        }
      );
    }
  }, [isLoaded, driverLocation, dropoff]);

  useEffect(() => {
    if (driverLocation) {
      calculateRoute();
    }
  }, [calculateRoute, driverLocation]);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMarkerLoad = useCallback((marker) => {
    markerRef.current = marker;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className='Map-container'>
      <h1>Your Lift is on the way..</h1>
      <div className='gmap-container'>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={driverLocation || pickup}
          zoom={15}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          {driverLocation && (
            <Marker
              position={driverLocation}
              icon={{
                url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                scaledSize: new window.google.maps.Size(40, 40)
              }}
              onLoad={onMarkerLoad}
            />
          )}
          <Marker position={pickup} label="P" />
          <Marker position={dropoff} label="D" />
          {directions && <DirectionsRenderer directions={directions} options={{suppressMarkers: true}} />}
        </GoogleMap>
      </div>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <div className='trip-info'>
        <h2>Trip Details</h2>
        <div className='location-info'>
          <p><strong>Pickup:</strong> {pickup.lat.toFixed(4)}, {pickup.lng.toFixed(4)}</p>
          <p><strong>Dropoff:</strong> {dropoff.lat.toFixed(4)}, {dropoff.lng.toFixed(4)}</p>
        </div>
        <div className='rider-info'>
          <h3>Rider Information</h3>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default RiderLocationTracker;