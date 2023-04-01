import React, { useRef, useState, useEffect } from "react";
import myCustomFont from "./font/Space.ttf";
import "./home.css";
import homevideo from "./image/homevideo.mp4";
import MyPlanet from "./image/neptune.png";
import user from "./image/user.png";

import { url } from "./constants";
import { Client } from "@stomp/stompjs"
import { useNavigate } from "react-router-dom";

let client;

export default function Home() {
  const [username, setUsername] = useState("");
  const [nameP1, setNameP1] = useState(null);
  const [nameP2, setNameP2] = useState(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");  
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
    .homepopup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.65);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .homepopup-content {
      font-size: 28px;
      background-color: rgba(201, 199, 238, 0.88);
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      font-family: "bungee";
      border: 7px solid #f31c1c;
      box-sizing: border-box;
      max-width: 80%; /* Optional: Limit width of the popup content */
    }
    homebutton {
      background-color: #D21404;
      padding: 10px 20px;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 22px;
      border-radius: 8px;
      margin-left: 40px;
      margin-right: 40px;
      transition: letter-spacing 0.5s; /* Add a smooth transition for the letter-spacing */
    }
  `;
  

  useEffect(() => {
    if (!client) {
      client = new Client(
        {
          brokerURL: url,
          onConnect: () => {
            client.subscribe("/app/game", (message) => {
              const body = JSON.parse(message.body);
              if (body["player1"])
                setNameP1(body["player1"]["name"]);
              if (body["player2"])
                setNameP2(body["player2"]["name"]);
            });

            client.subscribe("/topic/game", (message) => {
              const body = JSON.parse(message.body);
              if (body["player1"])
                setNameP1(body["player1"]["name"]);
              if (body["player2"])
                setNameP2(body["player2"]["name"]);
            });
          }
        });
      client.activate();
    }
  }, [nameP1, nameP2]);

  const createPlayer = () => {
    if (nameP1 != null && nameP2 != null) {
      setPopupMessage("The player is full");
      setShowPopup(true);
    } else if (username === "") {
      setPopupMessage("You must enter a username");
      setShowPopup(true);
    } else if (/ /g.test(username)) {
      setPopupMessage("Username cannot have space");
      setShowPopup(true);
    } else if (nameP1 === username) {
      setPopupMessage("The username is already being used");
      setShowPopup(true);
    } else if (client) {
      localStorage.setItem("username", username);
      if (client.connected) {
        client.publish({
          destination: "/app/newPlayer",
          body: JSON.stringify({
            name: username,
          }),
          replyTo: "/topic/game",
        });
      }
  
      navigate("/start");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const videoElement = document.getElementById("homevideo");

    function resizeVideo() {
      const windowAspectRatio = window.innerWidth / window.innerHeight;
      const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight;

      if (windowAspectRatio > videoAspectRatio) {
        videoElement.style.width = "100vw";
        videoElement.style.height = "auto";
        videoElement.style.top = "50%";
        videoElement.style.left = "50%";
        videoElement.style.transform = "translate(-50%, -50%)";
      } else {
        videoElement.style.width = "auto";
        videoElement.style.height = "100vh";
        videoElement.style.top = "50%";
        videoElement.style.left = "50%";
        videoElement.style.transform = "translate(-50%, -50%)";
      }
    }

    if (videoElement.readyState >= 2) {
      resizeVideo();
    } else {
      videoElement.addEventListener("loadeddata", resizeVideo);
    }

    window.addEventListener("resize", resizeVideo);

    return () => {
      window.removeEventListener("resize", resizeVideo);
    };
  }, []);

  return (
    <div id="homevideo">
      <video src={homevideo} autoPlay loop muted></video>
      <div className="rec"> </div>
      <div className="upbeat">
        <p style={{ fontFamily: "gamefont",}}>
          upbeat
        </p>
      </div>

      <div className="planet">
        <img src={MyPlanet} />
      </div>

      <div className="home-container">
        <div className="home-login">
          <h2 style={{ fontSize: "50px", fontFamily: "Bungee" }}>PLAYER</h2>
          <div className="home-inputBox">
            <img className="user" src={user}></img>
            <input type="text" placeholder="Username" style={{ fontFamily: "Bungee" }}
              onChange={(e) => setUsername(e.target.value)} value={username}/>
          </div>
            <div class="home-inputBox" style={{fontFamily: "Bungee" }}>
              <input type="submit" value="JOIN" id="btn" onClick={() => createPlayer()}/>
            </div>
        </div>
      </div>
      {showPopup && (
        <div className="homepopup">
          <div className="homepopup-content">
            <p>{popupMessage}</p>
            <homebutton onClick={closePopup}>Close</homebutton>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}

