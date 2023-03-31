import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Hexagon from "./component/Hexagon";
import CountdownTimer from "./CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./cstPlan.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools"
import { url } from "./constants";
import { Client } from "@stomp/stompjs";

let client;

export default function CstPlan() {
  const [planText, setPlanText] = useState("");
  const [nameP1, setNameP1] = useState(null);
  const [nameP2, setNameP2] = useState(null);
  const [valueR, setValueR] = useState(9);
  const [valueC, setValueC] = useState(9);
  const [initPlanMin, setInitPlanMin] = useState(0);
  const [initPlanSec, setInitPlanSec] = useState(0);
  const [startingTimestamp, setStartingTimestamp] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    if (!client) {
      client = new Client(
        {
          brokerURL: url,
          onConnect: () => {
            client.subscribe("/app/game", (message) => {
              const body = JSON.parse(message.body);
              setNameP1(body["nameP1"]);
              setNameP2(body["nameP2"]);
            });

            client.subscribe("/topic/game", (message) => {
              const body = JSON.parse(message.body);
              setNameP1(body["nameP1"]);
              setNameP2(body["nameP2"]);
            });

            client.subscribe("/app/getConfig", (message) => {
              const body = JSON.parse(message.body);
              setValueR(body["m"]);
              setValueC(body["n"]);
              setInitPlanMin(body["init_plan_min"]);
              setInitPlanSec(body["init_plan_sec"]);
            });

            client.subscribe("/topic/getConfig", (message) => {
              const body = JSON.parse(message.body);
              setValueR(body["m"]);
              setValueC(body["n"]);
              setInitPlanMin(body["init_plan_min"]);
              setInitPlanSec(body["init_plan_sec"]);
            });
          }
        });
      client.activate();
    }
    const storedTimestamp = localStorage.getItem("timerTimestamp");
    if (storedTimestamp && !isNaN(storedTimestamp)) {
      setStartingTimestamp(parseInt(storedTimestamp));
    }
  }, [nameP1, nameP2]);

  useEffect(() => {
    if (initPlanMin !== 0 || initPlanSec !== 0) {
      if (!localStorage.getItem("timerTimestamp")) {
        const newTimestamp = Date.now() + initPlanMin * 60 * 1000 + initPlanSec * 1000;
        setStartingTimestamp(newTimestamp);
        localStorage.setItem("timerTimestamp", newTimestamp);
      }
    }
  }, [initPlanMin, initPlanSec]);

  

  const setPlan = () => {
    if (client) {
      if (client.connected) {
        let username = localStorage.getItem("username");
        client.publish(
          {
            destination: "/app/setPlan",
            body: JSON.stringify(
              {
                name: username,
                plan: planText,
              }),
          });
      }
    }
  };

  return (
    <div className="cst-page">
      <div className="show-cstPlan">
        <div className="cst-show-detail">
        
        <CountdownTimer 
            countdownTimestampMs={startingTimestamp}
            minutes={initPlanMin}
            seconds={initPlanSec} />

          <div className="cst-show-regions">
            <Hexagon valueR={valueR} valueC={valueC}  />
          </div>

          <div className="cst-show-budget">
            <div className="cst-budget">
              <div className="cst-withIcon">
                <FontAwesomeIcon icon={faWallet} color="#b19a9a" size="2x" />
              </div>
              <span style={{ fontFamily: "Bungee" }} >100000</span>
            </div>

            <div className="cst-budget">
              <div className="cst-withIcon">
                <FontAwesomeIcon icon={faCoins} color="#b19a9a" size="2x" />
              </div>
              <span style={{ fontFamily: "Bungee" }} >5000</span>
            </div>
          </div>
          
        </div>

        <div className="cst-wrapper">
          <h2 style={{ fontFamily: "Bungee" }}> CONSTRUCTION PLAN</h2>
          <AceEditor className="my-editor"
            mode="java"
            theme="dracula"
            name="plan-editor"
            editorProps={{ $blockScrolling: true }}
            fontSize ="17px"
            setOptions={{
                fontFamily: "'JetBrains Mono', monospace",
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                enableMultiselect: true,
            }}
            onChange={(e)=>setPlanText(e)}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <a onClick={() => setPlan()} href="/map" style={{ "--clr": "#ff1867", marginRight: "25px" }}>
              <span style={{ fontFamily: "Bungee" }}>CHECK SYNTAX</span>
              <i></i>
            </a>
            <a onClick={() => setPlan()} href="/map" style={{ "--clr": "#ff1867" }}>
              <span style={{ fontFamily: "Bungee" }}>COMPLETE</span>
              <i></i>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}