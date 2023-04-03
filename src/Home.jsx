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
  `;
  
  useEffect(() => {
    if (!client) {
      client = new Client(
        {
          brokerURL: url,
          onConnect: () => {
            client.subscribe("/app/game", (message) => {
              const body = JSON.parse(message.body);
              if (body["winner"]) {
                client.publish({
                  destination: "/app/newGame",
                  replyTo: "/app/game",
                });
              }
              if (body["player1"])
                setNameP1(body["player1"]["name"]);
              if (body["player2"])
                setNameP2(body["player2"]["name"]);
              console.log("app/game", body);
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
          replyTo: "/app/game",
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
          <div className="red-flag-home">
            <p>!</p>
          </div>
            <p>{popupMessage}</p>
            <homebutton onClick={closePopup}>Close</homebutton>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}

