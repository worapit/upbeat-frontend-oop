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

  localStorage.clear();

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

  useEffect(() => {
    const videoElement = document.getElementById("youwin-video");

    function resizeVideo() {
      const windowAspectRatio = window.innerWidth / window.innerHeight;
      const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;

      if (windowAspectRatio > videoAspectRatio) {
        videoElement.style.width = "100vw";
        videoElement.style.height = "auto";
        videoElement.style.top = "50%";
        videoElement.style.left = "50%";
        videoElement.style.transform = "translate(-50%, -50%)";
      } else {
        videoElement.style.width = "auto";
        videoElement.style.height = "100vh";
        videoElement.style.top = "50%";
        videoElement.style.left = "50%";
        videoElement.style.transform = "translate(-50%, -50%)";
      }
    }

    if (videoElement.readyState >= 2) {
      resizeVideo();
    } else {
      videoElement.addEventListener("loadeddata", resizeVideo);
    }

    window.addEventListener("resize", resizeVideo);

    return () => {
      window.removeEventListener("resize", resizeVideo);
    };
  }, []);

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
