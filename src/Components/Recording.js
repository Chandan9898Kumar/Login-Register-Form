import './application.css';
import React, { useEffect, useState, useRef, memo } from 'react';

const RecordingPage = ({ load, startLoading }) => {
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
      height: '35px',
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
    }, 800);
  };

  return (
    <div>
      <div className="center">
        <div
          style={{
            color: 'green',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Progress Bar 1.
        </div>
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
      <ProgressBarTwo />
      <div>
        <ProgressBarThree load={load} startLoading={startLoading} />
      </div>
    </div>
  );
};
export default memo(RecordingPage);

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

  useEffect(() => {
    let timer = setInterval(() => {
      setValue((prev) => {
        if (prev === 100) {
          clearInterval(timer);
          return prev;
        }
        ref.current.style.width = `${prev * 5 + 5}px`;
        return prev + 1;
      });
    }, 300);
  }, []);

  return (
    <>
      <div className="center">
        <div
          style={{
            color: 'green',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {' '}
          Progress Bar 2.
        </div>
        <div style={styles.progressTwo}>
          <input ref={ref} style={styles.progressTwoInput} type="text" />
        </div>
        <div
          style={{
            fontFamily: 'cursive',
            fontSize: 'larger',
            fontWeight: 'bolder',
            color: 'grey',
          }}
        >
          {`${value}%`}
        </div>
      </div>
    </>
  );
}

//                                                                     Progress Bar 3.

export const ProgressBarThree = ({ load, startLoading }) => {
  const ref = useRef('');

  useEffect(() => {
    //  Note : Here in useEffect we are not setting any state(component re-render when state and props changes) but still we can see on ui that our ui is showing us increasing width of input field.
    //  Reason : we are directly manipulating the dom element by using ref. useEffect gets called after the  component render,question is is that how component is showing updated width when there is no change in state or props.
    //  so the answer is ref. ref directly manipulate the dom element.
    ref.current.style.width = `${load === 0 ? load : load * 5 + 5}px`;
  }, [load]);

  const styles = {
    
    progressThree: {
      display: 'block',
      width: '500px',
      background: '#f3f3f1',
      height: '30px',
      margin: 'auto',
      position: 'relative',
      borderRadius: '15px',
      border: '1px solid black',
      overflow: 'hidden',
    },
    progressThreeInput: {
      position: 'absolute',
      width: '0px',
      height: '28px',
      borderRadius: '20px',
      background: '#cfff83',
    },
    fullyLoaded: {
      background: 'rgb(223 86 80)',
      position: 'absolute',
      width: '0px',
      height: '28px',
      borderRadius: '20px',
    },
  };

  return (
    <div className="center">
      <div
        style={{
          color: 'green',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        {' '}
        Progress Bar 3.
      </div>
      <div style={styles.progressThree}>
        <input
          ref={ref}
          style={load === 100 ? styles.fullyLoaded : styles.progressThreeInput}
          type="text"
        />
      </div>
      <div
        style={{
          fontFamily: 'cursive',
          fontSize: 'larger',
          fontWeight: 'bolder',
          background: 'beige',
          width: '100px',
          borderRadius: '20px',
        }}
      >
        <button
          onClick={startLoading}
          style={{ color: 'black', width: 'inherit' }}
        >
          {load ? `${load}%` : 'Start'}
        </button>
      </div>
    </div>
  );
};
