import React, { useRef } from "react";
import Hexagon from "./component/Hexagon";
import CountdownTimer from "./component/CountdownTimer/CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./cstPlan.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools"

export const min = 2;
export const sec = 0;


export default function CstPlan() {
  return (
    <div className="cst-page">
      <div className="show-cstPlan">
        <div className="cst-show-detail">
        
        <CountdownTimer 
            countdownTimestampMs={Date.now() +  min * 60 * 1000 + sec * 1000}/>

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
