import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';


export function useAuthRequest() {
  const { getAccessTokenSilently, user } = useAuth0();

  const createUser = async () => {
    try {
      const token = await getAccessTokenSilently();
      const userData = {
        user_id: user.sub,
        email: user.email,
        // Add more fields here if required by your User schema
      };

      await axios({
        method: 'post',
        url: `${SERVER_URL}/users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: userData,
      });

      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const authRequest = async (method, token, id, data) => {
    console.log(id);
    const config = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      baseURL: SERVER_URL,
      url: id ? `/${id}` : '/',
      data: data ? data : null,
    };
    return await axios(config);
  };

  return { authRequest, createUser };
}
