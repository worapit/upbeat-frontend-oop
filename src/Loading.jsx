import React, { useRef, useEffect, useState } from "react";
import myLoading from "./image/loading.mp4";
import myCustomFontt from "./font/Space.ttf";
import "./loading.css";


import { url } from "./constants";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";

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
  }, [p1Ready, p2Ready]);

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

  useEffect(() => {
    const videoElement = document.getElementById("bg-video");

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
