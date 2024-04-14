// src/components/Navbar.js
import React from 'react';
import './navbar.css'; // Assuming you have copied the CSS into this file

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Convert the HTML from Shadcn/UI to JSX here */}
      <a href="/" className="navbar-brand">Executive Functions Research</a>
      <div className="navbar-links">
        {/* <a href="/about">About</a>
        <a href="/contact">Contact</a> */}
        {/* Add more links as needed */}
      </div>
    </nav>
  );
};

export default Navbar;
