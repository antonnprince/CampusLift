import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './LocationSearch.css';

const LocationSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelect = (place) => {
    setSelectedLocation(place);
  };

  return (
    <div className="location-search">
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        selectProps={{
          placeholder: 'Where to?',
          onChange: handleSelect,
        }}
        debounce={400}
        fetchDetails={true}
        enablePoweredByContainer={false}
        nearbyPlacesAPI="GooglePlacesSearch"
      />
      {selectedLocation && (
        <div className="selected-location">
          <h3>Selected Location:</h3>
          <p>{selectedLocation.label}</p>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
