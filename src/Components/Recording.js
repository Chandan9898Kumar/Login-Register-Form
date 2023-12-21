import React, { useEffect, useState } from 'react';

const RecordingPage = () => {
  const [progressOne, setProgressOne] = useState(0);

  const styles = {

    firstProgress: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '100px',
      marginTop: '50px',
    },
    progressValue: {
      width: '500px',
      height: '25px',
    },
    btnClass: {
      display: 'block',
      background: 'cornflowerblue',
      borderRadius: '20px',
    },
    button: {
      width: '100px',
      fontSize: 'larger',
      fontFamily: 'cursive',
    },
    
  };

  const ProgressBarOne = () => {
    let time = setInterval(() => {
      setProgressOne((prev) => {
        if (prev === 100) {
          clearInterval(time);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="progressHead">

      <div style={styles.firstProgress}>
        <div style={{ color: 'green' }}>Progress Bar 1.</div>
        <div>
          <progress
            value={progressOne}
            max={100}
            style={styles.progressValue}
          />
        </div>
        <div style={styles.btnClass}>
          <button type="button" style={styles.button} onClick={ProgressBarOne}>
            Start
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <span style={{ color: 'black',fontSize:'larger' }}>{progressOne}</span>
      </div>
      
    </div>
  );
};
export default RecordingPage;
