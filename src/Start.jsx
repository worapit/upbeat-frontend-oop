import React, { useEffect, useRef, useState } from "react";
import myLogin from "./image/startvideo.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PopUp from "./component/PopUp";
import "./start.css";

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

  //pop up how to play
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function openPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  return (
    <div id="start-bg-video">
      <video ref={videoRef} src={myLogin} autoPlay loop muted ></video>

      <div className="start-container">
        <div className="start-button">

          <a href="/loading" style={{ "--clr": "#ff1867" }}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            start game
          </a>

          <a onClick={openPopup} style={{ "--clr": "#1e9bff" }}>
          <span></span>
            <span></span>
            <span></span>
            <span></span>
            how to play
          </a>
          {isPopupOpen && (
            <div id="start-popup-container">
              <PopUp />
              <a onClick={closePopup}>
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ color: "#fff" }}
                  size="2x"
                />
              </a>
            </div> 
          )}
        </div>
      </div>
    </div>
  );
}
