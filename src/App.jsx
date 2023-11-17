import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomeCarousel from './components/HomeCarousel.jsx';
import Lost from './components/Lost.jsx';
import Found from './components/Found.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleMaps from './components/GoogleMaps.jsx'; 

function App() {
  return (
    <>
      <div id='root'>
        <Router>
          <Header />
    <GoogleMaps />
          <Routes>
            <Route exact path='/' element={<HomeCarousel />}></Route>
          </Routes>
          <Routes>
            <Route exact path='/lost' element={<Lost />}></Route>
          </Routes>
          <Routes>
            <Route exact path='/found' element={<Found />}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
