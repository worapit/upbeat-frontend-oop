import React, { useEffect, useRef } from "react";
import myLogin from "./image/startvideo.mp4";
import "./start.css";
import Loading from "./Loading";

export default function Start() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      video.classList.add("fade-out");
      video.currentTime = 0;
      video.play();
      setTimeout(() => {
        video.classList.remove("fade-out");
      }, 1800);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div id="log-bg-video">
      <video ref={videoRef} src={myLogin} autoPlay loop muted></video>
      <form action="/loading">
        <div className="log-container">
          <div className="login">
            <div className="log-inputBox">
              <input type="submit" value="Start Game" id="btn" />
            </div>
          </div>
        </div>
      </form>
      <form action="/howto">
        <div className="log-container">
          <div className="login">
            <div className="log-inputBox">
              <input type="submit" value="HOW TO PLAY" id="btnn" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
