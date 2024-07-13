import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import "./Rider.css"

const libraries = ["places"];

const RiderD = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const navigate = useNavigate();  // Initialize useNavigate

  const pickup = { lat: 10.0439, lng: 76.3249 };
  const dropoff = { lat: 10.0483, lng: 76.3315 };

  const driverPath = [
    { lat: 10.057597, lng: 76.321678 }, // Initial location
    { lat: 10.047305720476615, lng: 76.3192038339423 },
    { lat: 10.047210641772333, lng: 76.31947205485068 },
    { lat: 10.046798633730784, lng: 76.32045910779357 },
    { lat: 10.046492268436532, lng: 76.32140324539111 },
    { lat: 10.046354932175943, lng: 76.3219396872079 },
    { lat: 10.046238724525262, lng: 76.3222079081163 },
    { lat: 10.04605913080119, lng: 76.32290528247812 },
    { lat: 10.045942923044228, lng: 76.32301257084147 },
    { lat: 10.045953487389331, lng: 76.32313058801417 },
    { lat: 10.04533019054617, lng: 76.32345245310422 },
    { lat: 10.045076645723903, lng: 76.32378504703064 },
    { lat: 10.044590684259068, lng: 76.32442877721078 },
    { lat: 10.044400525226258, lng: 76.3246111674285 },
    { lat: 10.044231494881025, lng: 76.3246755404465 },
  ];

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

  // Simulate driver movement
  useEffect(() => {
    let index = 0;
    const moveDriver = () => {
      if (index < driverPath.length) {
        const newLocation = driverPath[index];
        setDriverLocation(newLocation);
        if (markerRef.current) {
          markerRef.current.setPosition(newLocation);
        }
        panTo(newLocation);
        index++;
        setTimeout(moveDriver, 2000);
      }
    };
    moveDriver();
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

  const handleEndRide = () => {
    navigate('/RiderAfterD');  // Navigate to Feedback.js
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className='Map-container'>
      <h1>onto your pickup location..</h1>
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
          <p><strong>Pickup:</strong> Seminar Complex, CUSAT</p>
          <p><strong>Dropoff:</strong> School of Engineering, CUSAT</p>
        </div>
        <div className='rider-info'>
          <h3>Rider Information</h3>
          <p><strong>Name:</strong> Adil</p>
          <p><strong>Phone:</strong> 9645176072</p>
        </div>
      </div>
      <button className= "button" onClick={handleEndRide}>Start Ride</button> {/* Add the Start Ride button */}
    </div>
  );
};

export default RiderD;
