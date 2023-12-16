import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './links.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className="topNav">
      <div>
        <NavLink
          to="/"
          caseSensitive
          className={({ isActive }) => (isActive ? 'isActive' : '')}
        >
          DashBoard
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/application"
          caseSensitive
          className={({ isActive }) => (isActive ? 'isActive' : '')}
        >
          Application
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/recording"
          caseSensitive
          className={({ isActive }) => (isActive ? 'isActive' : '')}
        >
          Recording
        </NavLink>
      </div>
      <div className="btn">
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
