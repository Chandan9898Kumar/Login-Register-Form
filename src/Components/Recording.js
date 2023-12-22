import React, { useEffect, useState, useRef } from 'react';

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
    progressTwo: {
      display: 'block',
      width: '500px',
      background: 'wheat',
      height: '30px',
      margin: 'auto',
      position: 'relative',
      borderRadius: '15px',
      border: '1px solid black',
      overflow: 'hidden',
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
    <div>
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
        <span style={{ color: 'black', fontSize: 'larger' }}>
          {progressOne}
        </span>
      </div>

      <br />

      <div style={styles.firstProgress}>
        <div style={{ color: 'green' }}> Progress Bar 2.</div>
        <div style={styles.progressTwo}>
          <ProgressBarTwo />
        </div>
      </div>
    </div>
  );
};
export default RecordingPage;

//                                                                            Progress Bar Two

export function ProgressBarTwo() {
  const ref = useRef('');
  const [value, setValue] = useState(0);

  const styles = {
    progressTwoInput: {
      position: 'absolute',
      width: '0px',
      height: '28px',
      borderRadius: '20px',
      background: 'cadetblue',
    },
  };

  useEffect(() => {
    let timer = setInterval(() => {
      setValue((prev) => {
        if (prev === 100) {
          clearInterval(timer);
          return prev;
        }
        ref.current.style.width = `${prev * 5}px`;
        return prev + 1;
      });
    }, 300);
  }, []);

  return (
    (
      <>
        <input ref={ref} style={styles.progressTwoInput} type="text" />
      </>
    )
  );
}
