import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import myLoading from "./image/setcpt.mp4";
import myCustomFontt from "./font/Space.ttf";
import "./setcompleted.css";
import Hexagon from "./component/Hexagon";

import { url } from "./constants";
import { Client } from "@stomp/stompjs";

let client;

export default function SetComplete() {
  const navigate = useNavigate();
  const [valueR, setValueR] = useState(9);
  const [valueC, setValueC] = useState(9);
  const [initPlanMin, setInitPlanMin] = useState(5);
  const [initPlanSec, setInitPlanSec] = useState(0);
  const [initBudget, setInitBudget] = useState(10000);
  const [initCenterDep, setInitCenterDep] = useState(100);
  const [planRevMin, setPlanRevMin] = useState(30);
  const [planRevSec, setPlanRevSec] = useState(0);
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
              console.log(body);
            });
            client.subscribe("/topic/getConfig", (message) => {
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
              console.log(body);
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
                    <p>time write plan: {initPlanMin}:{initPlanSec}</p>
                    <p>time change plan: {planRevMin}:{planRevSec}</p> 
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