import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import myLoading from "./image/setcpt.mp4";
import myCustomFontt from "./font/Space.ttf";
import "./setcompleted.css";

import { url } from "./constants";
import { Client } from "@stomp/stompjs";

let client;

export default function SetComplete() {
  const navigate = useNavigate();
  const [valueR, setValueR] = useState(9);
  const [valueC, setValueC] = useState(9);
  const [initPlanMin, setInitPlanMin] = useState('02');
  const [initPlanSec, setInitPlanSec] = useState('00');
  const [planRevMin, setPlanRevMin] = useState('02');
  const [planRevSec, setPlanRevSec] = useState('00');
  const [initBudget, setInitBudget] = useState(10000);
  const [initCenterDep, setInitCenterDep] = useState(100);
  const [revCost, setRevCost] = useState(100);
  const [maxDep, setMaxDep] = useState(1000000);
  const [interestPct, setInterestPct] = useState(5);
  const [countdown, setCountdown] = useState(11);

  useEffect(() => {
    if (!client) {
      client = new Client(
        {
          brokerURL: url,
          onConnect: () => {
            client.subscribe("/app/game");
            client.subscribe("/topic/game");
            client.subscribe("/app/getConfig", (message) => {
              const body = JSON.parse(message.body);
              setValueR(body["m"]);
              setValueC(body["n"]);
              setInitPlanMin(body["init_plan_min"]);
              setInitPlanSec(body["init_plan_sec"]);
              setInitBudget(body["init_budget"]);
              setInitCenterDep(body["init_center_dep"]);
              setPlanRevMin(body["plan_rev_min"]);
              setPlanRevSec(body["plan_rev_sec"]);
              setRevCost(body["rev_cost"]);
              setMaxDep(body["max_dep"]);
              setInterestPct(body["interest_pct"]);
            });
            client.subscribe("/topic/getConfig", (message) => {
              const body = JSON.parse(message.body);
            });
          }
        });
      client.activate();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/cstPlan");
    }
  }, [countdown, navigate]);

  useEffect(() => {
    const videoElement = document.getElementById("setcpt-video");

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

  const styles = `
    @font-face {
      font-family: 'space';
      src: url(${myCustomFontt}) format('truetype');
    }
  `;

  localStorage.removeItem("timerTimestamp");

  return (
    <div>
      <video
        src={myLoading}
        autoPlay
        loop
        muted
        play-inline
        id="setcpt-video"
      ></video>
      
        <div id="setcpt-title">
            <p className="setcpt-header" style={{ fontFamily: "space", fontSize: "60px" }}>
                Setting is complete
            </p>
            <p className="setcpt-header" style={{ fontFamily: "space" , fontSize: "60px" }}>
                Game starting in {" "}
            <span id="countdown">{countdown}</span>
            </p>
            <div id="box-container">
                <div className="box">
                    <p style={{fontSize: "50px", fontFamily: "space"}}>Map size</p>
                    <p>row:  {valueR}</p>
                    <p>column:  {valueC}</p>
                    
                </div>
                <div className="box">
                    <p style={{fontSize: "50px", fontFamily: "space"}}>Time</p>
                    <p>time write plan: {initPlanMin.toString().padStart(2, '0')}:{initPlanSec.toString().padStart(2, '0')}</p>
                    <p>time change plan: {planRevMin.toString().padStart(2, '0')}:{planRevSec.toString().padStart(2, '0')}</p> 
                </div>
                <div className="box">
                    <p style={{fontSize: "50px", fontFamily: "space"}}>Properties</p>
                    <p>budget: {initBudget}</p>
                    <p>center deposit: {initCenterDep}</p>
                    <p>cost of changing plan: {revCost}</p>
                    <p>max deposit: {maxDep}</p>
                    <p>interest percent: {interestPct}</p>
                </div>
            </div>
        </div>
    </div>
  );
}
