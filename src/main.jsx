'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import './index.css';

const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN
const AUTH_CID = import.meta.env.VITE_AUTH_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain= { AUTH_DOMAIN }
    clientId= { AUTH_CID }
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)