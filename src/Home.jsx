import React, { useRef } from "react";
import myCustomFont from "./font/Space.ttf";
import "./home.css";
import ReactDOM from "react-dom";
import CstPlan from "./CstPlan";


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
    <div className="container">
      <header id="hex-grid" onMouseMove={handleMouseMove}>
        <div className="light" ref={lightRef}></div>
        <div className="grid">
          <div className="button">
            <p
              style={{
                fontFamily: "gamefont",
                fontSize: "10em",
                color: "#fff",
              }}
            >
              UPBEAT
            </p>
            <a href="/CstPlan" style={{ "--clr": "#ff1867" }}>
              <span style={{ fontFamily: "Bungee" }}>START</span>
              <i></i>
            </a>
            <a href="#" style={{ "--clr": "#ff1867" }}>
              <span style={{ fontFamily: "Bungee" }}>how to play</span>
              <i></i>
            </a>
          </div>
        </div>
      </header>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}