import React, { useState } from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { Button } from 'react-bootstrap';
import './Map.css';

const defaultCenter = {
  lat: 47.608013,
  lng: -122.3328,
};

const Map = ({ handleAddLocation, handleClose, itemType }) => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [items, setItems] = useState([]); 
  const [address, setAddress] = useState('');
  const [tempMarker, setTempMarker] = useState(null); 

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      type: itemType, 
    };

    setTempMarker(newMarker);

   // Reverse geocoding to get the address for the clicked location
   const geocoder = new window.google.maps.Geocoder();
   geocoder.geocode({ location: newMarker }, (results, status) => {
     if (status === 'OK' && results[0]) {
       setAddress(results[0].formatted_address); // Set address
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
        setMapCenter(newMarker);
        setAddress('');
      } else {
        alert(
          'Geocode was not successful for the following reason: ' + status
        );
      }
    });
  } else if (tempMarker) {
    setMapCenter(tempMarker);
    setTempMarker(null);
  } else {
    alert(
      'Please enter an address or click on the map to select a location.'
    );
  }
  handleClose();
};

  const CustomMarker = ({ item }) => {
    const getPixelPositionOffset = (width, height) => ({
      x: -(width / 2),
      y: -(height / 2),
    });

    const markerIcon = item.type === 'lost' ? '🚩' : '🕵️‍♂️'; 

    return (
      <OverlayView
        position={{ lat: item.lat, lng: item.lng }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <div className="custom-marker">
          {markerIcon}
        </div>
      </OverlayView>
    );
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
          {items.map((item, idx) => (
            <CustomMarker key={idx} item={item} />
          ))}
          {tempMarker && <CustomMarker item={tempMarker} />} 
        </GoogleMap>
      </div>
      <Button id='location-button' variant='primary' onClick={handleAddMarker}>
        Add Location
      </Button>
    </>
  );
};

export default Map;
