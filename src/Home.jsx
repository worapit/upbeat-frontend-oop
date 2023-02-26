import React, { useRef } from "react";
import CstPlan from "./CstPlan";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const lightRef = useRef(null);

  const handleMouseMove = (e) => {
    const light = lightRef.current;
    light.style.left = `${e.clientX}px`;
    light.style.top = `${e.clientY}px`;
  };

  return (
    <div className="container">
      <header id="hex-grid" onMouseMove={handleMouseMove}>
        <div className="light" ref={lightRef}></div>
        <div className="grid">
          <div className="button">
            <p
              style={{
                fontFamily: "Bungee",
                fontSize: "10em",
                color: "#fff",
              }}
            >
              UPBEAT
            </p>
            <a href="#" style={{ "--clr": "#ff1867" }}>
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
    </div>
  );
}
