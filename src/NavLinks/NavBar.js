import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './links.css';
import axios from 'axios';
const Navbar = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    axios.post('/api/logout',{},{headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }})
    .then((response) => {
        if(response.status === 200){
          localStorage.setItem('token', "")
        }
        
        //  Here we are redirecting back to login page, we can also redirect to base url '/'  where protected route will check condition  and redirect to specified route.
        //  But for that we need to update the App component state so that it can again render the all routes and match it.the issue is there from  it is redirecting from '/' to '/'
        //  so it is not rendering the protected route,to do it we have to pass a state function here so that when we click it will update the state of the App component and 
        //  again render all routes. when we redirect to different route then route will be updated, not on  same route link from  '/' to '/'  .

        navigate('/login');
      })
      .catch((error) => {
        console.log(error,'error')
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


//  Note : NavLink is a special version of the <Link> that will add styling attributes to the rendered element when it matches the current URL.