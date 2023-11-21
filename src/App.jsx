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
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, setUser } from './store/user';

function App() {
  const dispatch = useDispatch();
  const { getIdTokenClaims, isAuthenticated } = useAuth0();

  // useEffect(() => {
    const fetchIdTokenClaims = async () => {
      try {
        const idTokenClaims = await getIdTokenClaims();
        // Extract user info from idTokenClaims
        const user = {
          email: idTokenClaims.email,
          nickname: idTokenClaims.nickname,
        };

        // Dispatch actions to update Redux store
        // console.log("HERES THE user", user)
        dispatch(setUser(user));
        dispatch(fetchUser(user))
      } catch (error) {
        console.error('Error fetching Id Token Claims:', error);
        // Handle errors gracefully (e.g., display an error message)
      }
    };

    fetchIdTokenClaims();
  // }, [dispatch, getIdTokenClaims]);

  // const userState = useSelector((state) => state.user.user);

  // console.log('HERES THE USER STATE', userState);

  return (
    <LoadScriptWrapper>
      <div id='root'>
        <Router>
          <Header />
          <Routes>
            <Route exact path='/' element={<GoogleMaps />} />
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
