import React, { useState, useEffect } from 'react';

const ApplicationPage = () => {
  const [application, setApplication] = useState([]);

  useEffect(() => {
    let flag = true;
    const apiFunctions = () => {
      fetch('https://api.restful-api.dev/objects')
        .then((response) => response.json())
        .then((json) => {
          if (flag) {
            setApplication(json);
          }
        });
    };

    apiFunctions();

    return () => (flag = false);
  }, []);

  return (
    <>
      <div>Application...</div>
    </>
  );
};
export default ApplicationPage;
