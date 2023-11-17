import React, { useState } from 'react';
import AuthButtons from '../Auth/AuthButtons'

const Header = () => {
  

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f5f5f5' }}>
      <button className="header-button">Home</button>
      <div className="header-right-buttons">
    <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
