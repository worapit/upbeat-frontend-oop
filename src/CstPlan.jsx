import React, { useRef } from "react";
import Hexagon from "./component/Hexagon";
import CountdownTimer from "./component/CountdownTimer/CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./cstPlan.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-monokai";



export default function CstPlan() {
  return (
    <div className="cst-page">
      <div className="show-cstPlan">
        <div className="cst-show-detail">
        
          <CountdownTimer 
            countdownTimestampMs={Date.now() + 5 * 60 * 1000 + 5 * 1000}
          />
          <div className="cst-show-regions">
            <Hexagon />
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
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="plan-editor"
            editorProps={{ $blockScrolling: true }}
            fontSize ="13px"
            
          />
          <a href="/map"  style={{ "--clr": "#ff1867" }}>
            <span style={{ fontFamily: "Bungee" }}>COMPLETE</span>
            <i></i>
          </a>
        </div>

      </div>
    </div>
  );
}
