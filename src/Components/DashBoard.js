import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Spinner/Loader';
const DashboardPage = () => {
  const [project, setProject] = useState([]);

  let styles = {
    head: {
      width: '100%',
      marginTop: '10%',
    },
    card: {
      width: '700px',
      margin: 'auto',
      marginBottom: '20px'
    },
  };
  useEffect(() => {
    let flag = true;
    const apiFun = async () => {
      let result = await axios.get('/api/projects');
      if (flag) {
        setProject(result.data);
      }
    };
    apiFun();

    return () => (flag = false);
  }, []);

  if (project.length === 0) {
    return <div>{<Loader />}</div>;
  }

  return (
    (
      <div style={styles.head}>
        {project?.map((item,index) => {
          return (
            <div class="card" style={styles.card} key={item.id}>
              <div class="card-header">project {"  "}{index+1}</div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>{item.name}</p>
                  <footer class="blockquote-footer">
                    {item.description}{' '}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};
export default DashboardPage;
