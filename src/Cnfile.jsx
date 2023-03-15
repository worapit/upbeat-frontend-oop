import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

import "./cnfile.css";

export default function Cnfile() {
  const [valueR, setValueR] = useState(9);
  const [valueC, setValueC] = useState(9);

  const handleChangeR = (event) => {
    setValueR(parseInt(event.target.value));
    sliderValue.textContent = valueR;
    sliderValue.style.left = valueR / 2 + "%";
  };

  const handleChangeC = (event) => {
    setValueC(parseInt(event.target.value));
    sliderValue.textContent = valueC;
    sliderValue.style.left = valueC / 2 + "%";
  };

  return (
    <div id="bg-cnfile">
      <div className="cn-wrapper">
        <div id="star1"></div>
        <div id="star2"></div>
        <div id="star3"></div>

        <div id="cn-title">
          <p className="cn-header" style={{ fontFamily: "Bungee" }}>
            SETTING
          </p>

          <div className="cn-box">
            <div className="cn-plan">
              <div className="cn-row-column">
                <div className="cn-choice">
                  <p>row</p>

                  <div className="cn-range-container">
                    <div className="sliderValue">
                      <span>{valueR}</span>
                    </div>
                    <div className="field">
                      <div className="value left">9</div>
                      <input
                        type="range"
                        min="9"
                        max="16"
                        steps="1"
                        value={valueR}
                        onChange={handleChangeR}
                      />
                      <div className="value right">16</div>
                    </div>
                  </div>
                </div>

                <div className="cn-choice">
                  <p>column</p>

                  <div className="cn-range-container">
                    <div className="sliderValue">
                      <span>{valueC}</span>
                    </div>
                    <div className="field">
                      <div className="value left">9</div>
                      <input
                        type="range"
                        min="9"
                        max="16"
                        steps="1"
                        value={valueC}
                        onChange={handleChangeC}
                      />
                      <div className="value right">16</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cn-line"></div>

              <div className="cn-time"></div>

              <FontAwesomeIcon icon={faClock} size= "3x" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
