import React, { useRef } from "react";
import Profile from "./image/profile.png";
import Hexagon from "./component/Hexagon";
import CountdownTimer from "./component/CountdownTimer/CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faCoins} from "@fortawesome/free-solid-svg-icons";
import "./Map.css";

export default function Map() {
  return (
    <div>
      <div className="time">
        <span>YOUR TURN</span>
      </div>
      <div className="container">
        <Hexagon />
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
          <FontAwesomeIcon icon={faCoins} color="#b19a9a" size="2x"/>
          </div>
          <span>5000</span>
        </div>
      </div>
      <img className="profile" src={Profile} />
    </div>
  );
}
