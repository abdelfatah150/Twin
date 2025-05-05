// components/Header.tsx
import React from 'react';
import '../styles/header.css';

const Header: React.FC = () => {
  return (
    <>
      <header className="top-header">
        <h1 className="logo">Twin</h1>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Post Project</a>
          <a href="#">Messages</a>
          <a href="#">Projects</a>
        </nav>
        <button className="logout-btn">Log Out</button>
      </header>
      <hr className="header-divider" />
    </>
  );
};

export default Header;
