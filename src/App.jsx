'use strict';

import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Lost from './components/Lost.jsx';
import Found from './components/Found.jsx';
import UserProfile from './Auth/UserProfile.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleMaps from './components/GoogleMaps.jsx';

function App() {
  return (
    <>
      <Provider store={store}>
        <div id='root'>
          <Router>
            <Header />
            <Routes>
              <Route exact path='/' element={<GoogleMaps />} />
              <Route exact path='/lost' element={<Lost />} />
              <Route exact path='/found' element={<Found />} />
              <Route exact path='/edit-profile' element={<UserProfile />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;
