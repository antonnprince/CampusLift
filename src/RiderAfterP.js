import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import "./Rider.css"

const libraries = ["places"];

const RideafterP = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const navigate = useNavigate();  // Initialize useNavigate

  const pickup = { lat: 10.0439, lng: 76.3249 };
  const dropoff = { lat: 10.0483, lng: 76.3315 };

  const driverPath = [
    { lat: 10.044067691717926, lng: 76.32486861069607 },
    { lat: 10.044659295464625, lng: 76.32493298493318 },
    { lat: 10.044881143800986, lng: 76.32540505340363 },
    { lat: 10.044881143800986, lng: 76.32540505340363 },
    { lat: 10.045958700218806, lng: 76.32626336784145 },
    { lat: 10.045948125688483, lng: 76.32720751105568 },
    { lat: 10.04584246354223, lng: 76.32847352758559 },
    { lat: 10.046983401269427, lng: 76.329524995662 },
    { lat: 10.046814371138213, lng: 76.32949280489808 },
    { lat: 10.047532747154378, lng: 76.32978250717953 },
    { lat: 10.048208867124629, lng: 76.33007221219877 },
    { lat: 10.048240555049833, lng: 76.33043700764708 },
    { lat: 10.04816659951428, lng: 76.3307052377305 },
    { lat: 10.048166596706691, lng: 76.33087690665508 },
    { lat: 10.048367357152644, lng: 76.33098411295815 },
    { lat: 10.04846243546991, lng: 76.331123592967 },
    { lat: 10.048346222837555, lng: 76.33149910933872 }
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

  const handleStartRide = () => {
    navigate('/Feedback');  // Navigate to RiderAfter.js
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className='Map-container'>
      <h1>Ride Started..</h1>
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
      <button className= "button" onClick={handleStartRide}>End Ride</button> {/* Add the Start Ride button */}
    </div>
  );
};

export default RideafterP;
