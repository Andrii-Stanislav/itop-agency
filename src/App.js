/*
  На жаль, за день не зміг розібратися із RxJs, а раніше із цією бібліотекою не працював.
  Буду далі в ній розбиратися, а Вам пропоную  мій варіант вирішення тестового завдання.
*/

import React, { useState, useEffect, useRef } from 'react';
import styles from './App.module.css';

export default function App() {
  const unixTime = 'Jan 01 1970 00:00:00 GMT+0300';
  const [timer, setTimer] = useState(new Date(unixTime));
  const [timerOn, setTimerOn] = useState(false);

  const intervalId = useRef();

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const start = () => {
    setTimerOn(true);
    intervalId.current = setInterval(() => {
      setTimer(prevTimer => new Date(prevTimer.getTime() + 1000));
    }, 1000);
  };

  const stop = () => {
    setTimerOn(false);
    clearInterval(intervalId.current);
    setTimer(new Date(unixTime));
  };

  const wait = () => {
    setTimerOn(false);
    clearInterval(intervalId.current);
  };

  const reset = () => {
    stop();
    start();
  };

  const doubleClick = useRef(false);
  const heandleDoubleClick = () => {
    if (doubleClick.current) {
      wait();
    }
    doubleClick.current = !doubleClick.current;
    setTimeout(() => {
      doubleClick.current = false;
    }, 300);
  };

  return (
    <>
      <p className={styles.clockface}>Таймер - {timer.toLocaleTimeString()}</p>
      <div className={styles.buttonBox}>
        <button
          disabled={timerOn}
          className={styles.button}
          type="button"
          onClick={start}
        >
          Start
        </button>
        <button
          disabled={!timerOn}
          className={styles.button}
          type="button"
          onClick={stop}
        >
          Stop
        </button>
        <button
          disabled={!timerOn}
          className={styles.button}
          type="button"
          onClick={heandleDoubleClick}
        >
          Wait
        </button>
        <button
          disabled={!timerOn}
          className={styles.button}
          type="button"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </>
  );
}
