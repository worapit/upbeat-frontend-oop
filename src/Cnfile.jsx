import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef, useEffect } from "react";

import "./cnfile.css";

export default function Cnfile() {
  const [valueR, setValueR] = useState(9);
  const [valueC, setValueC] = useState(9);
  const [selectedOption, setSelectedOption] = useState("NORMAL");
  const [initBudget, setInitBudget] = useState(10000);
  const [initCenterDep, setInitCenterDep] = useState(100);
  const [revCost, setRevCost] = useState(100);
  const [maxDep, setMaxDep] = useState(1000000);
  const [interestPct, setInterestPct] = useState(5);

  const handleChangeR = (event) => {
    setValueR(parseInt(event.target.value));
  };

  const handleChangeC = (event) => {
    setValueC(parseInt(event.target.value));
  };

  const setBudgetValues = (value) => {
    switch (value) {
      case "EASY":
        setInitBudget(15000);
        setInitCenterDep(60);
        setRevCost(80);
        setMaxDep(400000);
        setInterestPct(8);
        break;
      case "NORMAL":
        setInitBudget(10000);
        setInitCenterDep(100);
        setRevCost(100);
        setMaxDep(1000000);
        setInterestPct(5);
        break;
      case "HARD":
        setInitBudget(500);
        setInitCenterDep(160);
        setRevCost(200);
        setMaxDep(1600000);
        setInterestPct(2);
        break;
    }
  };

  const handleOptionClick = (e) => {
    setSelectedOption(e.target.value);
    setBudgetValues(e.target.value);
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

              <div className="cn-time">
                <div className="cn-time-show">
                  <h3>init_plan</h3>
                  <div class="cn-time-picker">
                    <input
                      type="number"
                      id="minute"
                      min="5"
                      max="55"
                      step="5"
                    />

                    <p>:</p>

                    <input
                      type="number"
                      id="seconds"
                      min="0"
                      max="55"
                      step="5"
                    />
                  </div>
                </div>

                <div className="cn-time-icon">
                  <FontAwesomeIcon icon={faClock} size="4x" />
                  <p>MIN : SEC</p>
                </div>

                <div className="cn-time-show">
                  <h3>plan_rev</h3>
                  <div class="cn-time-picker">
                    <input
                      type="number"
                      id="minute"
                      min="5"
                      max="55"
                      step="5"
                    />

                    <p>:</p>

                    <input
                      type="number"
                      id="seconds"
                      min="0"
                      max="55"
                      step="5"
                    />
                  </div>
                </div>
              </div>

              <div className="cn-line"></div>

              <div className="cn-radio">
                <label for="group1-option1">
                  <input
                    type="radio"
                    id="group1-option1"
                    name="radio-group1"
                    value="EASY"
                    onClick={handleOptionClick}
                  />
                  <span class="custom-radio"></span>
                  EASY
                </label>

                <label for="group1-option2">
                  <input
                    type="radio"
                    id="group1-option2"
                    name="radio-group1"
                    value="NORMAL"
                    onClick={handleOptionClick}
                  />
                  <span class="custom-radio"></span>
                  NORMAL
                </label>

                <label for="group1-option3">
                  <input
                    type="radio"
                    id="group1-option3"
                    name="radio-group1"
                    value="HARD"
                    onClick={handleOptionClick}
                  />
                  <span class="custom-radio"></span>
                  HARD
                </label>
              </div>

              <div className="cn-setting-budget">
                <div className="decor-span">
                  <div>
                    <span>budget = </span>
                    <span
                      style={{
                        color: "#fff",
                        textShadow: "0.08em 0.1em 0 #000",
                      }}
                    >
                      {initBudget}
                    </span>
                  </div>
                  <div>
                    <span>center_dep = </span>
                    <span
                      style={{
                        color: "#fff",
                        textShadow: "0.08em 0.1em 0 #000",
                      }}
                    >
                      {initCenterDep}
                    </span>
                  </div>
                  <div>
                    <span>rev_cost = </span>{" "}
                    <span
                      style={{
                        color: "#fff",
                        textShadow: "0.08em 0.1em 0 #000",
                      }}
                    >
                      {revCost}
                    </span>
                  </div>
                </div>

                <div className="decor-span">
                  <div>
                    <span>max_dep = </span>{" "}
                    <span
                      style={{
                        color: "#fff",
                        textShadow: "0.08em 0.1em 0 #000",
                      }}
                    >
                      {maxDep}
                    </span>
                  </div>

                  <div>
                    <span>interest_pct = </span>
                    <span
                      style={{
                        color: "#fff",
                        textShadow: "0.08em 0.1em 0 #000",
                      }}
                    >
                      {interestPct}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cn-container-button">
            <a className="cn-button">
              <FontAwesomeIcon icon={faCheck} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
