import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import myLoading from "./image/setcpt.mp4";
import myCustomFontt from "./font/Space.ttf";
import "./setcompleted.css";
import Hexagon from "./component/Hexagon";

export default function SetComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { valueR, valueC} = location.state || {};
  const [countdown, setCountdown] = useState(11);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/cstPlan");
    }
  }, [countdown, navigate]);


  

  const styles = `
    @font-face {
      font-family: 'space';
      src: url(${myCustomFontt}) format('truetype');
    }
  `;

  return (
    <div>
      <video
        src={myLoading}
        autoPlay
        loop
        muted
        play-inline
        id="setcpt-video"
      ></video>
      
        <div id="setcpt-title">
            <p className="setcpt-header" style={{ fontFamily: "space", fontSize: "60px" }}>
                Setting is complete
            </p>
            <p className="setcpt-header" style={{ fontFamily: "space" , fontSize: "60px" }}>
                Game starting in {" "}
            <span id="countdown">{countdown}</span>
            </p>
            <div id="box-container">
                <div className="box">
                    <p style={{fontSize: "50px", fontFamily: "space"}}>Map size</p>
                    <p>row:  {valueR}</p>
                    <p>column:  {valueC}</p>
                    
                </div>
                <div className="box">
                    <p style={{fontSize: "50px", fontFamily: "space"}}>Time</p>
                    <p>time write plan: 5:00</p>
                    <p>time change plan: 3:00</p> 
                </div>
                <div className="box">
                    <p style={{fontSize: "50px", fontFamily: "space"}}>Properties</p>
                    <p>budget: 15000</p>
                    <p>center deposit: 60</p>
                    <p>cost of changing plan: 80</p>
                    <p>max deposit: 400000</p>
                    <p>interest percent: 8</p>
                </div>
            </div>
        </div>
    </div>
  );
}
