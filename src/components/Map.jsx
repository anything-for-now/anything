import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from 'react-bootstrap';
import './Map.css';

// const mapContainerStyle = {
//   height: '500px',
//   width: '600px',
// };

const defaultCenter = {
  lat: 47.608013,
  lng: -122.3328,
};

const Map = ({handleAddLocation, handleClose}) => {
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

  const handleAddMarker = () => {
    const geocoder = new window.google.maps.Geocoder();
    handleAddLocation(address);
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
    handleClose();
  };

  return (
    <>
      <div id='google-map'>
        <GoogleMap
          id='map-container'
          center={mapCenter}
          zoom={8}
          onClick={handleMapClick}
        >
          {marker && <Marker position={marker} />}
          {tempMarker && <Marker position={tempMarker} />}
        </GoogleMap>
      </div>
      <Button id='location-button' variant='primary' onClick={handleAddMarker}>
        Add Location
      </Button>
      </>

  );
};

export default Map;
