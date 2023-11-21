import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from "./Login.jsx";
import { useAuthRequest } from './Authorization.js'; 

function AuthButtons() {
  const { isAuthenticated } = useAuth0();
  const { createUser } = useAuthRequest();

  return !isAuthenticated ? <Login onCreateUser={createUser} /> : null;
}

export default AuthButtons;
