import React, { useState, useEffect } from "react"; // Import useState and useEffect
import lose from "./image/youlose2.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import myCustomFontt from "./font/Space.ttf";
import { useNavigate } from "react-router-dom";
import "./youlose.css";

export default function Youlose() {

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

  useEffect(() => {
    const videoElement = document.getElementById("youlose-video");

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
        src={lose}
        autoPlay
        loop
        muted
        playsInline // Change play-inline to playsInline
        id="youlose-video"
      ></video>
      {/* <div id="yl-popup-container"></div> */}

      <div id="youlose-container">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="youlosebox">
          <p style={{ fontFamily: "space" , fontSize: "90px" }}>
            You Lose
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
