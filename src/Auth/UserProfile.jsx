import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../store/user/index.js';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const profileData = useSelector((state) => state.userProfile.profileData);
  const [formData, setFormData] = useState({
    nickname: '',
    city: '',
    image: '',
  });

  // Fetch user profile data on component mount
  useEffect(() => {
    if (user?.sub) {
      dispatch(fetchUserProfile(user.sub));
    }
  }, [user?.sub, dispatch]);

  // Update formData when profileData changes
  useEffect(() => {
    if (profileData) {
      setFormData({
        nickname: profileData.nickname || '',
        city: profileData.city || '',
        image: profileData.image || '', // Assuming image is a URL
      });
    }
  }, [profileData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserProfile({
      auth0Id: user.sub, // Make sure this matches with the auth0Id in your database
      ...formData,
    }));
    navigate('/');
  };

  return (
    <Card>
      <Card.Body className="user-profile-card">
        <h5>Current Profile</h5>
        <p><strong>Nickname:</strong> {profileData.nickname || 'Not set'}</p>
        <p><strong>City:</strong> {profileData.city || 'Not set'}</p>
        {profileData.image && (
          <img
            src={profileData.image}
            alt="Current Profile"
            className="preview-image"
          />
        )}
        <hr />
        <Form className="user-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Profile"
                className="preview-image mt-3"
                style={{ width: '100px', height: '100px' }}
              />
            )}
          </Form.Group>

          <Button className="btn btn-dark" variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserProfile;
