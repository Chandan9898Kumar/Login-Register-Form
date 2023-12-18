import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import './links.css';
import axios from 'axios';
const Navbar = ({ setUserValidate }) => {
  const navigate = useNavigate();

  const logoutUser = () => {
    let userToken = JSON.parse(localStorage.getItem('validation'));
    axios.post('/api/logout',{},{headers: { Authorization: 'Bearer ' + userToken.userAuth.token }})
    .then((r) => {
        localStorage.setItem('userValidation', 'false');

        //  Here we are redirecting back to login page, we can also redirect to base url '/'  where protected route will check condition  and redirect to specified route.
        //  But for that we need to update the App component state so that it can again render the all routes and match it.this issue there from  it is redirecting from '/' to '/'
        // so it is not rendering the protected route,to do it we have to pass a state function here so that when we click it will update the state of the App component and 
        //  again render all routes. when we redirect to different route then route will be updated, not on  same route link from  '/' to '/'  .
        
        navigate('/login');
      })
      .catch((error) => {
        localStorage.setItem('userValidation', 'false');
        navigate('/login');

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
