import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
const Loader = lazy(() => import('./Spinner/Loader'));
const LoginPage = lazy(() => import('./Login/Login'));
const RegisterPage = lazy(() => import('./Register/Registry'));
const NavLinks = lazy(() => import('./NavLinks/NavBar'));
function App() {
  let customerValid = false;
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <BrowserRouter basename="/">
          {customerValid && <NavLinks />}
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />

            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Loader />} />
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
        <Link to="/">You have landed on a page that doesn't exist.</Link>
      </div>
    </>
  );
}

export const PrivateRoute = () => {
  const auth = false; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page.
  //  User can't go to home page whose base url "/" until they are verified, but they can go to other routes if we do not put Route inside <PrivateRoute />.
  return auth ? <Outlet /> : <Navigate to="/login" />;
};
