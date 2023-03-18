import React, { useRef, useEffect, useState } from "react";
import myLoading from "./image/loading.mp4";
import myCustomFontt from "./font/Space.ttf";
import "./loading.css";
import { color } from "@mui/system";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";

const url = 'ws://192.168.1.51:8080/project';
let client;

export default function Loading() {
  
const styles = `
  @font-face {
    font-family: 'space';
    src: url(${myCustomFontt}) format('truetype');
  }
`;
  
  const navigate = useNavigate();
  const [nameP1, setNameP1] = useState("");
  const [p1Ready, setP1Ready] = useState(false);
  const [p2Ready, setP2Ready] = useState(false);

  useEffect(() => {
    if (!client) {
      client = new Client(
        {
          brokerURL: url,
          onConnect: () => {
            client.subscribe("/app/game", (message) => {
              const body = JSON.parse(message.body);
              setNameP1(body["nameP1"]);
              setP1Ready(body["p1Ready"]);
              setP2Ready(body["p2Ready"]);
            });

            client.subscribe("/topic/game", (message) => {
              const body = JSON.parse(message.body);
              setNameP1(body["nameP1"]);
              setP1Ready(body["p1Ready"]);
              setP2Ready(body["p2Ready"]);
            });
          }
        });

      client.activate();
    }
  }, []);

  console.log(p1Ready);
  console.log(p2Ready);

  if (p1Ready && p2Ready)
  {
    let username = localStorage.getItem("username");
    if (username === nameP1) {
      navigate("/cnfile");
    }
    else {
      navigate("/waiting");
    }
  }

  return (
    <div>
      <video
        src={myLoading}
        autoPlay
        loop
        muted
        play-inline
        id="bg-video"
      ></video>
      <div className="load-text">
      <span></span>
        <span></span>
        <span></span>
        <span></span>
        <h1
           style={{
            fontFamily: "space"
          }}
        >LOADING...</h1>
        <h1
           style={{
            fontFamily: "space"
          }}
        >WAITING FOR ANOTHER PLAYER.</h1>
      </div>
    </div>
  );
}
