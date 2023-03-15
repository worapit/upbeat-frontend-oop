import React, { useRef } from "react";
import myLoading from "./image/loading.mp4";
import myCustomFontt from "./font/Space.ttf";
import "./loading.css";
import { color } from "@mui/system";

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
        src={myLoading}
        autoPlay
        loop
        muted
        play-inline
        id="bg-video"
      ></video>
      <div className="load-text">
      <span></span>
        <span></span>
        <span></span>
        <span></span>
        <h1
           style={{
            fontFamily: "space"
          }}
        >LOADING...</h1>
        <h1
           style={{
            fontFamily: "space"
          }}
        >WAITING FOR ANOTHER PLAYER.</h1>
      </div>
    </div>
  );
}
