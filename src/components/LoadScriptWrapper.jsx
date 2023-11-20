import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const LoadScriptWrapper = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {children}
    </LoadScript>
  );
};

export default LoadScriptWrapper;