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
          <a href="#">Post Project</a>
          <a href="#">Messages</a>
          <a href="#">Projects</a>
        </nav>
        <button className="logout-home-btn">Log Out</button>
      </header>
      <hr className="header-divider-home" />
    </>
  );
};

export default Header;
