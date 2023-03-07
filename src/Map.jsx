import React, { useRef } from "react";
import Profile from "./image/profile.png";
import Hexagon from "./component/Hexagon";
import CountdownTimer from "./component/CountdownTimer/CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./Map.css";

export default function Map() {
  return (
    <div>
      <div className="time">
        <span>YOUR TURN</span>
      </div>

      <div className="show-regions">
        <Hexagon />
      </div>

      <div className="container-plan">
        <a className="buttonM">
          <FontAwesomeIcon icon={faFileLines} size="2x" />
        </a>
        <div className="button-meaning">
          <p>CHANGE PLAN</p>
        </div>
      </div>

      <div className="container-button">
        <a className="button">
          <FontAwesomeIcon icon={faQuestion} size="2x" />
        </a>
        <div className="card">
          <h3>HOW TO PLAY?</h3>
          <FontAwesomeIcon icon={faWallet} color="#b19a9a" size="2x" />
          <p>BUDGET </p>
          <FontAwesomeIcon icon={faCoins} color="#b19a9a" size="2x" />
          <p>DEPOSIT </p>
          
          <p>Card content goes here. </p>
          <p>Card content goes here. </p>
          <p>Card content goes here. </p>
          <p>Card content goes here. </p>
          <p>Card content goes here. </p>
          <p>Card content goes here. </p>
          <p>Card content goes here. </p>
        </div>
      </div>

      <div className="show-budget">
        <div className="budget">
          <div className="withIcon">
            <FontAwesomeIcon icon={faWallet} color="#b19a9a" size="2x" />
          </div>
          <span>100000</span>
        </div>
        <div className="budget">
          <div className="withIcon">
            <FontAwesomeIcon icon={faCoins} color="#b19a9a" size="2x" />
          </div>
          <span>5000</span>
        </div>
      </div>
      <img className="profile" src={Profile} />
    </div>
  );
}
