import { color } from "@mui/system";
import React from "react";
import {useState , useEffect } from 'react';
import "./CountdownTimercss.css";
import {getRemainingTimeUnitMsTimestamp} from './Utils/CountdownTimerUtils';

const CountTimer = ({countdownTimestampMs, minutes, seconds}) => {
  const [remainingTime, setRemainingTime] = useState({
    minutes: minutes || '05',
    seconds: seconds || '05',
  });
  
  // rest of the code


  
  useEffect(() => {
     const intervalId = setInterval(() => {
        updateRemaininngTime(countdownTimestampMs);
     },1000);
     return () => clearTimeout(intervalId)
  },[countdownTimestampMs])
  function updateRemaininngTime(countdown) {
    setRemainingTime(getRemainingTimeUnitMsTimestamp (countdown));
  }

  const totalSeconds = Number(remainingTime.seconds) + Number(remainingTime.minutes) * 60;
  const percentageRemaining = totalSeconds / (5 * 60) * 100; // 5 minutes
  
  let textColor = "#fff";
  if (percentageRemaining > 60) {
    textColor = "#32CD32";
  } else if (percentageRemaining > 20) {
    textColor = "yellow";
  } else {
    textColor = "red";
  }

  return (
    <div className="countdown-timer">
      <span id="content1" style={{paddingRight: '10px', color:"white"}}>Time Remaining:</span>
      <span className="two-numbers" style={{color: textColor}}>{remainingTime.minutes}</span>
      <span style={{color: textColor}}>:</span>
      <span className="two-numbers" style={{color: textColor}}>{remainingTime.seconds}</span>
    </div>
  );
}

export default CountTimer;
