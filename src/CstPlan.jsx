import React, { useRef } from "react";
import Hexagon from "./component/Hexagon";
import CountdownTimer from "./component/CountdownTimer/CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./cstPlan.css";

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
              <span>100000</span>
            </div>

            <div className="cst-budget">
              <div className="cst-withIcon">
                <FontAwesomeIcon icon={faCoins} color="#b19a9a" size="2x" />
              </div>
              <span>5000</span>
            </div>
          </div>
        </div>

        <div className="cst-wrapper">
          <h2> CONSTRUCTOR PLAN</h2>
          <textarea placeholder="plan write here..." required></textarea>
          <a href="/map"  style={{ "--clr": "#ff1867" }}>
            <span style={{ fontFamily: "Bungee" }}>COMPLETE</span>
            <i></i>
          </a>
        </div>
      </div>
    </div>
  );
}
