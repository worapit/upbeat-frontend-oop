import React, { useRef } from "react";
import myCustomFont from "./font/Space.ttf";
import "./home.css";
import ReactDOM from "react-dom";
import homevideo from "./image/homevideo.mp4"
import user from "./image/user.png"
import pass from "./image/padlock.png"

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
      <div className="rec"> </div>
      <div className ="upbeat">
        <p style={{
            fontFamily: "gamefont"}}>upbeat</p>
      </div>
      <div className="home-container">
        <div className="home-login">
          <h2 style={{ fontSize: "50px"}}>SIGN IN</h2>
          <div className="home-inputBox">
            <img className="user" src={user}></img>
            <input type="text" placeholder="Username" />
          </div>
          <div className="home-inputBox">
            <img className="pass" src={pass}></img>
            <input type="local" placeholder="Local-Host" />
          </div>
          <form action="/start">
            <div class="home-inputBox">
              <input type="submit" value="Login" id="btn" />
            </div>
          </form>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>

  );
}
