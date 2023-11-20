import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from "./Login.jsx";

function AuthButtons() {
  const { isAuthenticated } = useAuth0();

  return !isAuthenticated ? <Login /> : null;
}

export default AuthButtons;
