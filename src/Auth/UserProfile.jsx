import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function UserProfile() {
  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    username: '',
    actualName: '',
    email: '',
    city: '',
    image: null,
  });

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
        setFormData({ ...userData });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [getAccessTokenSilently]);

  // Handle change in form inputs
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add validation and submit logic here
    console.log(formData);
  };

  return (
    <div className="user-profile">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Given Name</label>
          <input
            type="text"
            name="actualName"
            value={formData.actualName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City/Address</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Profile Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Profile"
              className="preview-image"
            />
          )}
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UserProfile;

