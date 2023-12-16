import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav>
      <div>
        <div>
          <ul>
            <li>
              <NavLink to="/">DashBoard</NavLink>
            </li>
            <li>
              <NavLink to="/application">Application</NavLink>
            </li>
            <li>
              <NavLink to="/recording">Recording</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
