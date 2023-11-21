import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <img 
          src={user.picture} 
          alt="Profile" 
          style={{ width: '30px', height: '30px', borderRadius: '50%' }} 
        />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <div className="dropdown-item" style={{ textAlign: 'left' }}>
          <img 
            src={user.picture} 
            alt="Profile" 
            style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }} 
          />
          <div>Hello, {user.nickname}</div>
          <div>Email: {user.email}</div>
        </div>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/edit-profile">Edit Profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={handleLogout}>Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
