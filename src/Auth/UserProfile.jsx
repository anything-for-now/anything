import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Form, Button } from 'react-bootstrap';

function UserProfile() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [formData, setFormData] = useState({
    nickname: '',
    city: '',
    image: null,
  });
  const [cityCoordinates, setCityCoordinates] = useState(null);

  const updateCityCoordinates = async (cityName) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      const location = data.results[0]?.geometry.location;
      if (location) {
        setCityCoordinates(location);
      }
    } catch (error) {
      console.error("Geocoding error: ", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        setFormData({
          nickname: userData.nickname || '',
          city: userData.city || '',
          image: user.picture || null,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [getAccessTokenSilently, user.picture]);

  useEffect(() => {
    if (formData.city) {
      updateCityCoordinates(formData.city);
    }
  }, [formData.city]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    console.log("City Coordinates: ", cityCoordinates);
  };
  return (
    <Card className="user-profile-card">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
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
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
            />
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Profile"
                className="preview-image mt-3"
                style={{ width: '100px', height: '100px' }}
              />
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserProfile;
