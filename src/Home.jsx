import React, { useRef, useState, useEffect } from "react";
import myCustomFont from "./font/Space.ttf";
import "./home.css";
import homevideo from "./image/homevideo.mp4";
import MyPlanet from "./image/neptune.png";
import user from "./image/user.png";
import { Client } from "@stomp/stompjs"

const url = 'ws://localhost:8080/project';
let client;

export default function Home() {
  const [username, setUsername] = useState("");
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

  useEffect(() =>
  {
    if (!client)
    {
      client = new Client(
      {
        brokerURL: url,
        onConnect: () => {
          client.subscribe("/app/game");
          client.subscribe("/topic/game");
        }
      });

      client.activate();
    }
  }, []);

  const createPlayer = () =>
  {
    if (client) {
      if (client.connected)
      {
        client.publish(
          {
            destination: "/app/newPlayer",
            body: JSON.stringify(
              {
                name: username,
              }),
          });
      }
    }
  };

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
          <form action="/start" onClick={() => createPlayer()}>
            <div class="home-inputBox" style={{fontFamily: "Bungee" }}>
              <input type="submit" value="JOIN" id="btn"/>
            </div>
          </form>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </div>
  );
}
