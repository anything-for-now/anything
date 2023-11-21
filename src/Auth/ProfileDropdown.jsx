// ProfileDropdown.jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css';

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
    <Dropdown className='dropdown-button'>
   <Dropdown.Toggle variant="" id="dropdown-basic" className="rounded-circle">
      <img 
        src={user.picture} 
        alt="Profile" 
        className="profile-image-small"
      />
    </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <div className="dropdown-item-text">
          <img 
            src={user.picture} 
            alt="Profile" 
            className="profile-image"
          />
          <div>Hello, {user.nickname}</div>
          <div>Email: {user.email}</div>
        </div>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/edit-profile" className="edit-profile">Edit Profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={handleLogout} className="logout-button">Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
