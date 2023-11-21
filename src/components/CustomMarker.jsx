import React from 'react';
import { OverlayView } from '@react-google-maps/api';

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

export default CustomMarker;
