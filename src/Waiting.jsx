import React, { useRef } from "react";
import myWaiting from "./image/Waiting.mp4";
import myCustomFontt from "./font/Space.ttf";
import "./waiting.css";



export default function Loading() {
  
const styles = `
  @font-face {
    font-family: 'space';
    src: url(${myCustomFontt}) format('truetype');
  }
`;

  
  return (
    <div>

      <video
        src={myWaiting}
        autoPlay
        loop
        muted
        play-inline
        id="bg-video"
        
      ></video>

      
      {/* <img src={waitwall}></img> */}
    
      <div className="waiting-text">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      <h2
           style={{
            fontFamily: "space"
          }}
        >
          WAITING...</h2>
          <h2
           style={{
            fontFamily: "space"
          }}
        > Another player is setting game.</h2>
      </div>
    </div>
  );
}
