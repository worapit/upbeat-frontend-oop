import React, { useRef } from "react";
import lose from "./image/youlose.mp4";
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
        </div>

        <a>helllo</a>

      </div>
    </div>
  );
}
