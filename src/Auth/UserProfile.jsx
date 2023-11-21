import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserProfile,
  updateUserProfile,
} from '../store/user-profile/index.js';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const profileData = useSelector((state) => state.userProfile.profileData);
  const [formData, setFormData] = useState({
    nickname: '',
    city: '',
    image: null,
  });

  const userState = useSelector((state) => state.userProfile.profileData);

  console.log('HERES THE USER STATE:', userState);
  console.log('HERES THE USER INFO', user);

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
        image: profileData.image || null, // Assuming the image is a URL
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
    dispatch(
      updateUserProfile({
        ...formData,
        userId: user.sub,
      })
    );
    navigate('/');
  };

  return (
    <Card className='user-profile-card'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type='text'
              name='nickname'
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              name='city'
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type='file' name='image' onChange={handleChange} />
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt='Profile'
                className='preview-image mt-3'
                style={{ width: '100px', height: '100px' }}
              />
            )}
          </Form.Group>

          <Button variant='primary' type='submit'>
            Update Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserProfile;
