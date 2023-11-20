import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '500px',
  width: '500px',
};

const defaultCenter = {
  lat: 47.608013,
  lng: -122.3328,
};

const Map = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState('');
  const [tempMarker, setTempMarker] = useState(null);

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setTempMarker(newMarker);

    // Reverse geocoding to get the address for the clicked location
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newMarker }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        console.error('Reverse geocoding failed due to: ' + status);
      }
    });
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAddMarker = () => {
    const geocoder = new window.google.maps.Geocoder();

    if (address) {
      // Geocode the address entered by the user
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          const newMarker = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setMarker(newMarker);
          setMapCenter(newMarker);
          setAddress('');
        } else {
          alert(
            'Geocode was not successful for the following reason: ' + status
          );
        }
      });
    } else if (tempMarker) {
      setMarker(tempMarker);
      setMapCenter(tempMarker);
      setTempMarker(null);
    } else {
      alert(
        'Please enter an address or click on the map to select a location.'
      );
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <input
        type='text'
        value={address}
        onChange={handleAddressChange}
        placeholder='Enter an address'
      />
      <button onClick={handleAddMarker}>Add Location</button>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={8}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
        {tempMarker && <Marker position={tempMarker} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
