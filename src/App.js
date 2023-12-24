import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Loader from './Spinner/Loader';

const LoginPage = lazy(() => import('./Login/Login'));
const RegisterPage = lazy(() => import('./Register/Registry'));
const NavLinks = lazy(() => import('./NavLinks/NavBar'));
const Dashboard = lazy(() => import('./Components/DashBoard'));
const Application = lazy(() => import('./Components/Application'));
const Recording = lazy(() => import('./Components/Recording'));

function App() {
  const [userValidate, setUserValidate] = useState(false);
  const [load, setLoad] = useState(0);

  //  Here we have set 'startLoading" function on App.js file because we want to start loading in recording page, and this download should keep on running in background (till it reaches to 100 then stop) even if we change the component.
  //  So we set this function in root file so that changing the component should not affect background running function.
  const startLoading = (event) => {
    let timer = setInterval(() => {
      setLoad((prev) => {
        if (prev === 100) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 500);
  };
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <BrowserRouter basename="/">
          {/* {userAuth && <NavLinks setUserValidate={setUserValidate} />} */}
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />

            {/*               These  are Private Routes                                */}

            <Route exact path="/" element={<PrivateRoute setUserValidate={setUserValidate} />} >
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/application" element={<Application />} />
              <Route exact path="/recording" element={<Recording load={load} startLoading={startLoading} />} />
            </Route>

            {/*                             OR Below Method            */}
            {/* <Route exact path="/" element={isAuth ? <Loader /> : <Navigate to="/login"  />}/> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

export function NotFound() {
  return (
    <>
      <div
        style={{
          fontSize: '40px',
          margin: 'auto',
          position: 'relative',
          left: '300px',
          top: '400px',
        }}
      >
        <Link to="/" preventScrollReset={true} unstable_viewTransition>
          You have landed on a page that doesn't exist.
        </Link>
        {/*  Link get to the desired page without reloading the page. If you are using <ScrollRestoration>, "preventScrollReset" lets you prevent the scroll position from being reset to the top of the window when the link is clicked. */}
      </div>
    </>
  );
}

export const PrivateRoute = ({ setUserValidate }) => {
  // determine if authorized, from context or however you're doing it
  let userAuth = JSON.parse(localStorage.getItem('userValidation'));
  // If you are entering the url directing into the browser, React will reload completely and you will lose all state whether 'global' or otherwise.
  //  so to maintain it we are using localStorage.

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page.
  //  User can't go to home page whose base url "/" until they are verified, but they can go to other routes if we do not put Route inside <PrivateRoute />.

  if (!userAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      {userAuth && (
        <div>
          <NavLinks setUserValidate={setUserValidate} />
          <Outlet />
        </div>
      )}
    </div>
  );
};

// The Outlet component alone allows nested routes to render their element content out and anything else the layout route is rendering, i.e. navbars, sidebars, specific layout components, etc.

//  Note :-

// If you are entering the url directing into the browser, React will reload completely and you will lose all state whether 'global' or otherwise.
// The most likely scenario is that your router is trying to validate your ability to view a component before you have your auth data.
