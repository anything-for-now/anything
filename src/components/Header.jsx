import React, { useState } from 'react';

const Header = () => {
  // State to toggle between login and logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f5f5f5' }}>
      <button className="header-button">Home</button>
      <div className="header-right-buttons">
        <button className="header-button">Sign Up</button>
        <button className="header-button" onClick={handleLoginLogout}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </header>
  );
};

export default Header;
