// import axios from 'axios';
// import { useAuth0 } from '@auth0/auth0-react';
// const SERVER_URL = import.meta.env.VITE_SERVER_URL;


// export function useAuthRequest() {
//     const authRequest = async (method, token, id, data) => {
//         console.log(id)
//       const config = {
//         method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         baseURL: SERVER_URL,
//         url: id ? `/${id}` : '/',
//         data: data ? data : null,
//       }
//       return await axios(config);
//     }
  
//     return authRequest;
//   }
