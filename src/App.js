import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Loader = lazy(() => import('./Spinner/Loader'));
function App() {

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <BrowserRouter basename="/">
          <Routes>
            <Route exact path="/" element={<Loader />} />
            {/* <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} /> */}
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
      <div style={{ fontSize: '40px', margin: 'auto' }}>
        <Link to="/">You have landed on a page that doesn't exist.</Link>
      </div>
    </>
  );
}
