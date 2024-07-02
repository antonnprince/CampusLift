import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import "./MapPage.css"
const MapPage = () => {
  const [directions, setDirections] = useState(null);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [duration, setDuration] = useState('');
  
  const mapStyles = {
    height: "67vh",
    width: "100%",
    
  };

  const defaultCenter = {
    lat: 10.051969, lng: 76.315773
  };

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
            }
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  return (
    <div style={{fontFamily : 'Inter', padding : '20px'}}>
      <h1 style={{fontFamily: 'Inter', fontWeight: 'Bold',fontSize: '30px'}}>Lets start the ride</h1>

      <LoadScript googleMapsApiKey="API KEY">
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
    </div>
  );
};

export default MapPage;
