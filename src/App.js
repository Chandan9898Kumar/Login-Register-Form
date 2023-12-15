import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Loader = lazy(() => import('./Spinner/Loader'));
function App() {
  // let vari = process.env.NODE_ENV 
  // // let url= process.env.REACT_APP_API_URL
  // console.log(vari,'processsssssssssssssssssssssssssss',process.env.REACT_APP_API_KEY) 
  return (
    <div>
      <Suspense fallback={<Loader />}>
      <Loader />
      
        {/* <BrowserRouter basename="/">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter> */}
      </Suspense>
    </div>
  );
}

export default App;

export function NotFound() {
  return (
    <>
      <div style={{ fontSize: '40px', margin: 'auto' }}>
        <Link to="/">You have landed on a page that doesn't exist.</Link>
      </div>
    </>
  );
}
