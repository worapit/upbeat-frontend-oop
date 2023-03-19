import React, { useRef } from "react";
import lose from "./image/youlose.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import myCustomFontt from "./font/Space.ttf";
import "./youlose.css";

export default function Youlose() {
  const styles = `
  @font-face {
    font-family: 'space';
    src: url(${myCustomFontt}) format('truetype');
  }
`;

  return (
    <div>
      <video
        src={lose}
        autoPlay
        loop
        muted
        play-inline
        id="youlose-video"
      ></video>
      {/* <div id="yl-popup-container"></div> */}

      <div className="you-lose-show">
        <div class="youlosecontainer">
          <div className="youlose-text">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <h1
              style={{
                fontFamily: "space",
              }}
            >
              YOU LOSE
            </h1>
          </div>
          <a
            style={{
              fontFamily:  "Bungee",
            }}
          >
            {/* <FontAwesomeIcon icon={faArrowLeft}  size="1x" /> */}
            back to home
          </a>
        </div>
      </div>
    </div>
  );
}
