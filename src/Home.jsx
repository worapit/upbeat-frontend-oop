import React, { useRef } from "react";
import myCustomFont from "./font/Space.ttf";
import "./home.css";
import ReactDOM from "react-dom";

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
    <div className="home-page ">
      <header id="hex-grid" onMouseMove={handleMouseMove}>
        <div className="light" ref={lightRef}></div>
          <div className="grid">
            <div className="home-button">

              <p
                style={{
                  fontFamily: "gamefont",
                  color: "#fff",
                }}
              >
                UPBEAT
              </p>


              

              <div className="home-show-button">
                <a href="/login" style={{ "--clr": "#ff1867" }}>
                  <span style={{ fontFamily: "Bungee" }}>START</span>
                  <i></i>
                </a>
                <a href="#" style={{ "--clr": "#ff1867" }}>
                  <span style={{ fontFamily: "Bungee" }}>how to play</span>
                  <i></i>
                </a>
              </div>

            </div>
          </div>

      </header>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}
