import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import './links.css';
import axios from 'axios';
const Navbar = ({ setUserValidate }) => {
  const navigate = useNavigate();

  const logoutUser = () => {
    let userToken = JSON.parse(localStorage.getItem('validation'));
    axios.post('/api/logout',{},{headers: { Authorization: 'Bearer ' + userToken.data.token }})
    .then((r) => {
        setUserValidate(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error,'error');
      });
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
        <button onClick={logoutUser}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
