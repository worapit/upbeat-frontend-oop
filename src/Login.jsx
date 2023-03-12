import React, { useRef } from "react";
import Logo from "./image/logo.png";
import myLogin from "./image/space.mp4";
import "./login.css";

export default function Login() {
  return (
    <div id="log-bg-video">
      <video src={myLogin} autoPlay loop muted></video>
      <div className="log-container">
        <img className="log-logo" src={Logo} />
        <div className="login">
          <h2>LOGIN</h2>
          <div className="log-inputBox">
            <input type="text" placeholder="Username" />
          </div>
          <div className="log-inputBox">
            <input type="local" placeholder="Local-Host" />
          </div>
          <form action="/loading">
            <div class="log-inputBox">
              <input type="submit" value="Login" id="btn" />
            </div>
          </form>
          {/* <div className="group">
            <a href="#">LOGIN</a>
          </div> */}
        </div>
        
      </div>
      
    </div>
  );
}
