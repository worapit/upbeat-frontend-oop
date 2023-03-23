import React, { useState, useEffect } from "react"; // Import useState and useEffect
import win from "./image/youwin.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import myCustomFontt from "./font/Space.ttf";
import { useNavigate } from "react-router-dom";
import "./youwin.css";

export default function Youwin() {

  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div>
      <video
        src={win}
        autoPlay
        loop
        muted
        playsInline // Change play-inline to playsInline
        id="youwin-video"
      ></video>
      {/* <div id="yl-popup-container"></div> */}

      <div id="youwin-container">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="youwinbox">
          <p style={{ fontFamily: "space" , fontSize: "90px" }}>
            You Win
          </p>
          <p style={{ fontFamily: "space" , fontSize: "50px" }}>
            Back to home in {" "}
            <span id="countdown">{countdown}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
