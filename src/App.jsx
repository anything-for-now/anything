import React from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomeCarousel from './components/HomeCarousel.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <>
      <div id="root">
        <Header />
        <HomeCarousel />
        <Footer />
      </div>
    </>
  )
}

export default App
