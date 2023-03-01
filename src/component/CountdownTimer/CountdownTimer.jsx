import React from "react";
import {useState , useEffect } from 'react';
import "./CountdownTimer.css";
import {getRemainingTimeUnitMsTimestamp} from './Utils/CountdownTimerUtils';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '05',
}

const CountdownTimer = ({countdownTimestampMs}) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  
  useEffect(() => {
     const intervalId = setInterval(() => {
        updateRemaininngTime(countdownTimestampMs);
     },1000);
     return () => clearTimeout(intervalId)
  },[countdownTimestampMs])
  function updateRemaininngTime(countdown) {
    setRemainingTime(getRemainingTimeUnitMsTimestamp (countdown));
  }


  return(
    <div className="countdown-timer">
      <span className="two-numbers">{remainingTime.minutes}</span>
      <span>:</span>
      <span className="two-numbers">{remainingTime.seconds}</span>
    </div>
  ); 
}

export default  CountdownTimer; 