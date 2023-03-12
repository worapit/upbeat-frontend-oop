import React, { useState } from "react";
import Profile from "./image/profile.png";
import Hexagon from "./component/Hexagon";
import CstPlan from "./CstPlan";
import CountdownTimer from "./component/CountdownTimer/CountdownTimer";
import PopUp from "./component/PopUp";

import myCustomFontt from "./font/Space.ttf";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./Map.css";

export default function Map() {
  //pop up how to play
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function openPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }


  const styles = `
  @font-face {
    font-family: 'space';
    src: url(${myCustomFontt}) format('truetype');
  }
`;

  return (
    <div className="map-page">
      <div className="map-time">
        <span
          style={{
            fontFamily: "space",
          }}
        >
          YOUR TURN
        </span>
      </div>

      <img className="map-profile" src={Profile} />
      <div className="map-show-regions">
        <Hexagon />
      </div>

      <div className="map-container-plan">
        <a className="map-buttonM">
          <FontAwesomeIcon icon={faFileLines} size="2x" />
        </a>
        <div className="map-button-meaning">
          <p>CHANGE PLAN</p>
        </div>
      </div>

      <div className="map-show-budget">
        <div className="map-budget" >
          <div className="map-withIcon">
            <FontAwesomeIcon icon={faWallet} color="#b19a9a" size="2x" />
          </div>
          <span>100000</span>
        </div>
        <div className="map-budget">
          <div className="map-withIcon">
            <FontAwesomeIcon icon={faCoins} color="#b19a9a" size="2x" />
          </div>
          <span>5000</span>
        </div>
      </div>

      <div className="map-container-button">
        <a className="map-button" onClick={openPopup}>
          <FontAwesomeIcon icon={faQuestion} size="2x" />
        </a>
        <div className="map-button-meaning1">
          <p>HOW TO PLAY</p>
        </div>
        {isPopupOpen && (
          <div id="popup-container">
            <PopUp />
            <a onClick={closePopup}>
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "#fff" }}
                size="2x"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
