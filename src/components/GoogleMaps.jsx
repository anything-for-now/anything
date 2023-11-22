import React, { useState, useEffect } from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../store/item'; 
import './GoogleMap.css';

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const defaultCenter = {
  lat: 47.608013,
  lng: -122.3328
};

const CustomMarker = ({ text, position, type }) => {
  const markerClass = type === 'lost' ? 'custom-marker-lost' : 'custom-marker-found';

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -(height / 2),
      })}
    >
      <div className={markerClass}>
        {text}
      </div>
    </OverlayView>
  );
};

const GoogleMaps = () => {
  const dispatch = useDispatch();
  const [markers, setMarkers] = useState([]);
  const items = useSelector((state) => state.item.items); 

  useEffect(() => {
    dispatch(fetchData()); 
  }, [dispatch]);

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();

    items.forEach((item) => {
      geocoder.geocode({ address: item.location }, (results, status) => {
        if (status === 'OK') {
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              text: item.itemName ,
              type: item.type,
            }
          ]);
        } else {
          console.error('Geocoding failed: ' + status);
        }
      });
    });
  }, [items]); 

  return (
    <div className="map-container">
      <div className="map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={8}
      >
        {markers.map((marker, idx) => (
           <CustomMarker
           key={idx}
           text={marker.text}
           position={{ lat: marker.lat, lng: marker.lng }}
           type={marker.type} 
         />
        ))}
      </GoogleMap>
      </div>
      <div className="legend">
        <div className="legend-item">
          <div className="custom-marker-lost">Lost</div>
          {/* <span>Lost Items</span> */}
        </div>
        <div className="legend-item">
          <div className="custom-marker-found">Found</div>
          {/* <span>Found Items</span> */}
        </div>
      </div>
    </div>
  );
};

export default GoogleMaps;
