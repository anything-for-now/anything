import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Lost from './components/Lost.jsx';
import Found from './components/Found.jsx';
import UserProfile from './Auth/UserProfile.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadScriptWrapper from './components/LoadScriptWrapper.jsx';
import GoogleMaps from './components/GoogleMaps.jsx';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { fetchUser, setUser } from './store/user';
import placeholderImage from '../assets/map.png';

function App() {
  const dispatch = useDispatch();
  const { getIdTokenClaims, isAuthenticated } = useAuth0();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchIdTokenClaims = async () => {
    try {
      if (!getIdTokenClaims) {
        console.warn('getIdTokenClaims is not available yet');
        return;
      }

      const idTokenClaims = await getIdTokenClaims();

      if (!idTokenClaims || !idTokenClaims.email) {
        console.warn('Id Token Claims or email is undefined');
        return;
      }

      const user = {
        email: idTokenClaims.email,
        nickname: idTokenClaims.nickname,
      };

      dispatch(setUser(user));
      dispatch(fetchUser(user));
    } catch (error) {
      console.error('Error fetching Id Token Claims:', error);
    }
  };

  useEffect(() => {
    fetchIdTokenClaims();
  }, [getIdTokenClaims, dispatch, fetchIdTokenClaims]);

  if (!isAuthenticated) {
    // You might want to return a loading state or a login component here
    return <div>Loading...</div>;
  }

  return (
    <LoadScriptWrapper>
      <div id='root'>
        <Router>
          <Header />
          <Routes>
            <Route
              exact
              path='/'
              element={
                isAuthenticated ? (
                  <GoogleMaps />
                ) : (
                  <img src={placeholderImage} alt='Map Placeholder' />
                )
              }
            />
            <Route
              exact
              path='/lost'
              element={isAuthenticated ? <Lost /> : null}
            />
            <Route
              exact
              path='/found'
              element={isAuthenticated ? <Found /> : null}
            />
            <Route
              exact
              path='/edit-profile'
              element={isAuthenticated ? <UserProfile /> : null}
            />
          </Routes>
          <Footer />
        </Router>
      </div>
    </LoadScriptWrapper>
  );
}

export default withAuth0(App);
