import React, { useState, useEffect } from 'react';
import Loader from '../Spinner/Loader';
const ApplicationPage = () => {
  const [application, setApplication] = useState([]);

  const styles = {
    head: {
      textAlign: 'center',
      marginTop: '50px',
    },
  };

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

  if (application.length === 0) {
    return <div>{<Loader />}</div>;
  }

  return (
    <div style={styles.head}>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Color</th>
            <th scope="col">Price</th>
            <th scope="col">Generation</th>
          </tr>
        </thead>
        <tbody>
          {application?.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>
                  {item?.data?.Capacity
                    ? item?.data?.Capacity
                    : item?.data?.capacity
                      ? item?.data?.capacity
                      : 'null'}{' '}
                </td>
                <td>
                  {item?.data?.Color
                    ? item?.data?.Color
                    : item?.data?.color
                      ? item?.data?.color
                      : 'null'}
                </td>
                <td>
                  {item?.data?.Price
                    ? item?.data?.Price
                    : item?.data?.price
                      ? item?.data?.price
                      : '0'}
                </td>
                <td>
                  {item?.data?.Generation
                    ? item?.data?.Generation
                    : item?.data?.generation
                      ? item?.data?.generation
                      : 'null'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ApplicationPage;
