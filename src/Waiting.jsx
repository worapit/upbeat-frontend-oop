import React, { useRef, useState, useEffect } from "react";
import myWaiting from "./image/Waiting.mp4";
import myCustomFontt from "./font/Space.ttf";
import "./waiting.css";

import { url } from "./constants";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";

let client;

export default function Waiting() {
  
const styles = `
  @font-face {
    font-family: 'space';
    src: url(${myCustomFontt}) format('truetype');
  }
`;
  
  const [completeSet, setCompleteSet] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!client) {
      client = new Client(
        {
          brokerURL: url,
          onConnect: () => {
            client.subscribe("/app/game", (message) => {
              const body = JSON.parse(message.body);
              setCompleteSet(body["completeSet"]);
            });

            client.subscribe("/topic/game", (message) => {
              const body = JSON.parse(message.body);
              setCompleteSet(body["completeSet"]);
            });
          }
        });

      client.activate();
    }
  }, [completeSet]);

  if (completeSet)
  {
    navigate("/cstplan");
  }
  
  return (
    <div>

      <video
        src={myWaiting}
        autoPlay
        loop
        muted
        play-inline
        id="bg-video"
        
      ></video>

      
      {/* <img src={waitwall}></img> */}
    
      <div className="waiting-text">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      <h2
           style={{
            fontFamily: "space"
          }}
        >
          WAITING...</h2>
          <h2
           style={{
            fontFamily: "space"
          }}
        > Another player is setting game.</h2>
      </div>
    </div>
  );
}
