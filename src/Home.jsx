import React, { useRef } from "react";
import myCustomFont from "./font/Space.ttf";
import "./home.css";
import ReactDOM from "react-dom";
import homevideo from "./image/homevideo.mp4"

export default function Home() {
  const lightRef = useRef(null);

  const handleMouseMove = (e) => {
    const light = lightRef.current;
    light.style.left = `${e.clientX}px`;
    light.style.top = `${e.clientY}px`;
  };

  const styles = `
    @font-face {
      font-family: 'gamefont';
      src: url(${myCustomFont}) format('truetype');
    }
  `;

  return (
    <div id="homevideo">
      <video src={homevideo} autoPlay loop muted></video>
      <div className="rec">
        <div className ="upbeat">
          <p>upbeat</p>
        </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </div>

  );
}
