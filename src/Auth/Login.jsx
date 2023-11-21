import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

function Login({ onCreateUser }) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
    onCreateUser(); // Call createUser after login
  };

  return !isAuthenticated &&
    <Button onClick={handleLogin}>Log in</Button>;
}

export default Login;
