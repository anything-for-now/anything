import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Modal, Button } from 'react-bootstrap';
import './UserProfile.css';

function UserProfile() {
  const { user } = useAuth0();

  return (
    <Modal show={true} onHide={() => {}} centered>
      <Modal.Header>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="user-profile-modal">
        {user.image && (
          <img
            src={user.image}
            alt="Profile"
            className="preview-image"
            style={{ width: '100px', height: '100px' }}
          />
        )}
        <div className="profile-details">
          <p><strong>Nickname:</strong> {user.nickname || 'Not set'}</p>
          <p><strong>City:</strong> {user.city || 'Not set'}</p>
          <p><strong>Email:</strong> {user.email || 'No email'}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {}}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserProfile;
