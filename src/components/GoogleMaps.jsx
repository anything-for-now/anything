import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const defaultCenter = {
  lat: 47.608013,
  lng: -122.3328
};

const GoogleMaps = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState([]);
  const [address, setAddress] = useState('');
  const [tempMarker, setTempMarker] = useState(null); 

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setTempMarker(newMarker); 

    // Reverse geocoding to get the address for the clicked location
    const geocoder = new google.maps.Geocoder();
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
    const geocoder = new google.maps.Geocoder();
  
    if (address) {
      // Geocode the address entered by the user
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          const newMarker = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setMarkers([...markers, newMarker]);
        //   setMapCenter(newMarker); 
          setAddress(''); 
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    } else if (tempMarker) {
      setMarkers([...markers, tempMarker]);
      setTempMarker(null); 
    } else {
      alert('Please enter an address or click on the map to select a location.');
    }
  };
  
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter an address"
      />
      <button onClick={handleAddMarker}>Add Marker</button>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={8}
        onClick={handleMapClick}
      >
        {markers.map((position, idx) => (
          <Marker key={idx} position={position} />
        ))}
        {tempMarker && <Marker position={tempMarker} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
