import React, { useRef } from "react";
import Hexagon from "./component/Hexagon";
import CountdownTimer from "./component/CountdownTimer/CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import "./cstPlan.css";

export default function CstPlan() {
  return (
    <div>
      <div className="container">
        <div className="hex">
          <CountdownTimer countdownTimestampMs={Date.now() + 5 * 60 * 1000} />
          <Hexagon />
          <div>
            <div className="question">
              <a
                href="#"
                style={{ "--clr": "#ff1867", borderRadius: "5000px" }}
              >
                <span>?</span>
                <i></i>
              </a>
              <div className="budget">
                <div className="withIcon">
                  <FontAwesomeIcon icon={faWallet} color="#b19a9a" size="2x" />
                </div>
                <span>100000000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <h2> CONSTRUCTOR PLAN</h2>
          <textarea placeholder="plan write here..." required></textarea>
          <a href="#" style={{ "--clr": "#ff1867" }}>
            <span style={{ fontFamily: "Bungee" }}>COMPLETE</span>
            <i></i>
          </a>
        </div>
      </div>
    </div>
  );
}
