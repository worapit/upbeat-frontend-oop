import React, { useEffect, useRef, useState } from "react";
import myLogin from "./image/startvideo.mp4";
import myCustomFont2 from "./font/Space.ttf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PopUp from "./component/PopUp";
import "./start.css";

export default function Start() {

  const styles2 = `
  @font-face {
    font-family: 'gamefont2';
    
    src: url(${myCustomFont2}) format('truetype');
  }
`;

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
      <div>
        <p className="start-upbeat" style={{ fontFamily: "gamefont2"}}>
          upbeat
        </p>
        <style dangerouslySetInnerHTML={{ __html: styles2 }} />
      </div>
        <div className="start-button">

          <a href="/loading" style={{ "--clr": "#68BB59" }}>
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

          <a href="/home" style={{ "--clr": "#D21404" }}>
          <span></span>
            <span></span>
            <span></span>
            <span></span>
            Back to menu
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
