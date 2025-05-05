// components/Header.tsx
import React from 'react';
import '../styles/header.css';

const Header: React.FC = () => {
  return (
    <>
      <header className="top-header-home">
        <h1 className="logo-home">Twin</h1>
        <nav className="nav-links-home">
          <a href="#">Home</a>
          <a href="#">How It Works</a>
          <a href="#">About Us</a>
          <a href="#">Our Vision</a>
        </nav>
        <button className="share-home-btn">Share</button>
      </header>
      <hr className="header-divider-home" />
    </>
  );
};

export default Header;
