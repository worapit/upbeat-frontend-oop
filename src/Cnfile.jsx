import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef, useEffect } from "react";

import "./cnfile.css";

import { url } from "./constants";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";

let client;

export default function Cnfile() {
  const [valueR, setValueR] = useState(9);
  const [valueC, setValueC] = useState(9);
  const [selectedOption, setSelectedOption] = useState("NORMAL");
  const [initPlanMin, setInitPlanMin] = useState('02');
  const [initPlanSec, setInitPlanSec] = useState('00');
  const [planRevMin, setPlanRevMin] = useState('02');
  const [planRevSec, setPlanRevSec] = useState('00');
  const [initBudget, setInitBudget] = useState(10000);
  const [initCenterDep, setInitCenterDep] = useState(100);
  const [revCost, setRevCost] = useState(100);
  const [maxDep, setMaxDep] = useState(1000000);
  const [interestPct, setInterestPct] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  
  
  const handleIncrease = (e, isMinute, planType) => {
    const step = isMinute ? 1 : 5;
    const max = isMinute ? 59 : 55;
    const input = e.target.nextElementSibling;
    const value = parseInt(input.value);
    const newValue = value + step <= max ? value + step : max;
    input.value = newValue;
  
    if (planType === "write") {
      isMinute ? handleChangeInitPlanMin({ target: input }) : handleChangeInitPlanSec({ target: input });
    } else {
      isMinute ? handleChangePlanRevMin({ target: input }) : handleChangePlanRevSec({ target: input });
    }
  };
  
  const handleDecrease = (e, isMinute, planType) => {
    const step = isMinute ? 1 : 5;
    const min = isMinute ? 2 : 0;
    const input = e.target.previousElementSibling;
    const value = parseInt(input.value);
    const newValue = value - step >= min ? value - step : min;
    input.value = newValue.toString().padStart(2, '0');
  
    if (planType === "write") {
      isMinute ? handleChangeInitPlanMin({ target: input }) : handleChangeInitPlanSec({ target: input });
    } else {
      isMinute ? handleChangePlanRevMin({ target: input }) : handleChangePlanRevSec({ target: input });
    }
  };
  
  

  useEffect(() => {
    if (!client) {
      client = new Client(
        {
          brokerURL: url,
          onConnect: () => {
            client.subscribe("/app/game");
            client.subscribe("/topic/game");
          }
        });

      client.activate();
    }
  }, []);

  const [hasSliderChangedR, setHasSliderChangedR] = useState(false);
  const handleChangeRSlide = (event) => {
    setValueR(event.target.value);
    setHasSliderChangedR(true);
  };

  const [hasSliderChangedC, setHasSliderChangedC] = useState(false);
  const handleChangeCSlide = (event) => {
    setValueC(event.target.value);
    setHasSliderChangedC(true);
  };

  const handleChangeInitPlanMin = (event) => {
    setInitPlanMin(parseInt(event.target.value));
  };

  const handleChangeInitPlanSec = (event) => {
    setInitPlanSec(parseInt(event.target.value));
  };

  const handleChangePlanRevMin = (event) => {
    setPlanRevMin(parseInt(event.target.value));
  };

  const handleChangePlanRevSec = (event) => {
    setPlanRevSec(parseInt(event.target.value));
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
        setInitBudget(5000);
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

  const setConfig = () => {
    setShowPopup(true);
  };
  
  const handleConfirm = () => {
    setShowPopup(false);
    if (client) {
      if (client.connected) {
        client.publish({
          destination: "/app/config",
          body: JSON.stringify({
            m: valueR,
            n: valueC,
            init_plan_min: initPlanMin,
            init_plan_sec: initPlanSec,
            init_budget: initBudget,
            init_center_dep: initCenterDep,
            plan_rev_min: planRevMin,
            plan_rev_sec: planRevSec,
            rev_cost: revCost,
            max_dep: maxDep,
            interest_pct: interestPct,
          }),
        });
      }
      navigate("/setcomplete");
    }
  };

  return (
    <div id="bg-cnfile">
      <div className="cn-wrapper">
        <div id="star1"></div>
        <div id="star2"></div>
        <div id="star3"></div>

        <div id="cn-title">
          <p className="cn-header" style={{ fontFamily: "Bungee", fontSize: "72px" }}>
            CONFIGURATION
          </p>

          <div className="cn-box">
            <div className="cn-plan">
              <div className="cn-row-column">
                <div className="cn-choice">
                  <p>row</p>

                  <div className="cn-range-container">
                    <div className="sliderValue">
                      <span>{hasSliderChangedR ? valueR : "9"}</span>
                    </div>
                    <div className="field">
                      <div className="value left">9</div>
                      <input
                        type="range"
                        min="9"
                        max="16"
                        steps="1"
                        value={valueR}
                        onChange={handleChangeRSlide}
                      />
                      <div className="value right">16</div>
                    </div>
                  </div>
                </div>

                <div className="cn-choice">
                  <p>column</p>
                  <div className="cn-range-container">
                    <div className="sliderValue">
                      <span>{hasSliderChangedC ? valueC : "9"}</span>
                    </div>
                    <div className="field">
                      <div className="value left">9</div>
                      <input
                        type="range"
                        min="9"
                        max="16"
                        steps="1"
                        value={valueC}
                        onChange={handleChangeCSlide}
                      />
                      <div className="value right">16</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cn-line"></div>

              <div className="cn-time">
              <div className="cn-time-show">
                <h3>time write plan</h3>
                <div className="cn-time-picker">
                  <div className="input-container">
                    <input
                      type="button"
                      value="▲"
                      className="increase"
                      onClick={(e) => handleIncrease(e, true, "write")}
                      
                    />
                    <input
                      type="number"
                      id="minute"
                      min="5"
                      max="55"
                      step="5"
                      value={initPlanMin.toString().padStart(2, '0')}
                      onChange={handleChangeInitPlanMin}
                      readOnly
                    />
                    <input
                      type="button"
                      value="▼"
                      className="decrease"
                      onClick={(e) => handleDecrease(e, true, "write")}
                    />
                  </div>
                  <p>:</p>
                  <div className="input-container">
                    <input
                      type="button"
                      value="▲"
                      className="increase"
                      onClick={(e) => handleIncrease(e, false, "write")}
                    />
                    <input
                      type="number"
                      id="seconds"
                      min="0"
                      max="55"
                      step="5"
                      value={initPlanSec.toString().padStart(2, '0')}
                      onChange={handleChangeInitPlanSec}
                      readOnly
                    />
                    <input
                      type="button"
                      value="▼"
                      className="decrease"
                      onClick={(e) => handleDecrease(e, false, "write")}
                    />
                  </div>
                </div>
              </div>

              <div className="cn-time-icon">
                <FontAwesomeIcon icon={faClock} size="4x" />
                <p style={{color: "white"}}>MIN : SEC</p>
              </div>

              <div className="cn-time-show">
                <h3>time change plan</h3>
                <div className="cn-time-picker">
                  <div className="input-container">
                    <input
                      type="button"
                      value="▲"
                      className="increase"
                      onClick={(e) => handleIncrease(e, true, "change")}
                    />
                    <input
                      type="number"
                      id="minute"
                      min="3"
                      max="55"
                      step="1"
                      value={planRevMin.toString().padStart(2, '0')}
                      onChange={handleChangePlanRevMin}
                      readOnly
                    />
                    <input
                      type="button"
                      value="▼"
                      className="decrease"
                      onClick={(e) => handleDecrease(e, true, "change")}
                    />
                  </div>
                  <p>:</p>
                  <div className="input-container">
                    <input
                      type="button"
                      value="▲"
                      className="increase"
                      onClick={(e) => handleIncrease(e, false, "change")}
                    />
                    <input
                      type="number"
                      id="seconds"
                      min="0"
                      max="55"
                      step="5"
                      value={planRevSec.toString().padStart(2, '0')}
                      onChange={handleChangePlanRevSec}
                      readOnly
                    />
                    <input
                      type="button"
                      value="▼"
                      className="decrease"
                      onClick={(e) => handleDecrease(e, false, "change")}

                    />
                  </div>
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

                <label htmlFor="group1-option2">
                <input
                  type="radio"
                  id="group1-option2"
                  name="radio-group1"
                  value="NORMAL"
                  onClick={handleOptionClick}
                  checked
                />
                <span className="custom-radio"></span>
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
                    <span>center deposit = </span>
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
                    <span>cost of changing plan = </span>{" "}
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
                    <span>max deposit = </span>{" "}
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
                    <span>interest percent = </span>
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


          </div>
          <div className="cn-container-button">
            <a className="cn-button" onClick={() => setConfig()}>
              <FontAwesomeIcon icon={faCheck} size="2x" />
            </a>
        </div>
        {showPopup && (
            <div className="modepopup">
              <div className="modepopup-inner">
                <h2 style={{fontSize: "28px"}}>Are you sure to confirm configuration?</h2>
                <h2 style={{color: "crimson", fontSize: "20px", textDecoration: "underline"}}>keep in mind your configuration may give you an advantage.</h2>
                <button
                  className="modepopup-confirm-button"
                  onClick={() => handleConfirm()}
                >
                  Confirm
                </button>
                <button
                  className="modepopup-close-button"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
