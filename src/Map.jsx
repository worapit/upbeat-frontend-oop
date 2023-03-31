import React, { useState } from "react";
import Profile from "./image/profile.png";
import Hexagon from "./component/Hexagon";
import CstPlan from "./CstPlan";
import CountdownTimer from "./CountdownTimer";
import PopUp from "./component/Popup";

import myCustomFontt from "./font/Space.ttf";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./Map.css";

import region from "./image/region.png";
import cityCenter from "./image/city_center.png";
import city from "./image/city.png";

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

  const rowcf = 9;
  const column = 16;

  const regions = [];
  const centerC = 2;
  const centerR = 5;
  const C = 2;
  const R = 4;

  if (rowcf > 16) rowcf = 16;
  else if (rowcf < 9) rowcf = 9;
  if (column > 16) column = 16;
  else if (column < 9) column = 9;

  for (let i = 0; i < rowcf; i++) {
    const row = [];
    for (let j = 0; j < column; j++) {
      if (j === centerC - 1 && i === centerR - 1) row.push(j);
      else if (j === C - 1 && i === R - 1) row.push(j);
      else row.push(j);
    }
    regions.push(row);
  }

  const click = (x, y) => {};

  return (
    <div className="map-page">
      <div className="map-header">
        <span
          style={{
            fontFamily: "space",
            fontSize: "70px",
          }}
        >
          YOUR TURN
        </span>
      </div>

      <div className="map-show-deposit" style={{ fontFamily: "Bungee" }}>
        <div className="map-show-type">
          <span >DEPOSIT</span>
        </div>
        <div className="text-box-deposit">
        </div>
      </div>

      {/* <img className="map-profile" src={Profile} /> */}
      <div className="map-show-regions">
        {regions.map((row, rowIndex) => (
          <div className="rowcss" key={rowIndex}>
            {row.map((col, colIndex) => (
              <Hexagon
                key={`${rowIndex}${colIndex}`}
                x={rowIndex}
                y={colIndex}
                click={click}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="map-container-plan">
        <a className="map-buttonM">
          <FontAwesomeIcon icon={faFileLines} size="2x" />
        </a>
        <div className="map-button-meaning">
          <p style={{ fontFamily: "Bungee" }}>CHANGE PLAN</p>
        </div>
      </div>

      <div className="map-show-budget" style={{ fontFamily: "Bungee" }}>
        <div className="map-show-type2">
          <span >BUDGET</span>
        </div>
        <div className="map-budget">
          <div className="map-withIcon">
            <FontAwesomeIcon icon={faCoins} color="#b19a9a" size="2x" />
          </div>
          <span>100000</span>
        </div>
      </div>

      <div className="map-container-button">
        <a className="map-button" onClick={openPopup}>
          <FontAwesomeIcon icon={faQuestion} size="2x" />
        </a>
        <div className="map-button-meaning1">
          <p style={{ fontFamily: "Bungee" }}>HOW TO PLAY</p>
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
