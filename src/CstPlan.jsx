import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Hexagon from "./component/Hexagon";
import CountdownTimer from "./CountdownTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./cstPlan.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import { url } from "./constants";
import { Client } from "@stomp/stompjs";

let client;

export default function CstPlan() {
  const [planText, setPlanText] = useState("");
  const [errorMgs, setErrorMgs] = useState(null);
  const [nameP1, setNameP1] = useState(null);
  const [nameP2, setNameP2] = useState(null);

  const [initPlanMin, setInitPlanMin] = useState(0);
  const [initPlanSec, setInitPlanSec] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [syntaxCheckClicked, setSyntaxCheckClicked] = useState(false);
  const [startingTimestamp, setStartingTimestamp] = useState(Date.now());
  const [showPopup, setShowPopup] = useState(false);
  const [depositPosition, setDepositPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleClickComplete = () => {
    setShowPopup(true);
  };
  const handleConfirmation = (choice) => {
    if (choice) {
      // Navigate to the map
      navigate("/map");
    }
    setShowPopup(false);
  };

  useEffect(() => {
    if (!client) {

      client.activate();
    }

    if (syntaxCheckClicked && errorMgs) {
      setShowErrorPopup(true);
    }

    const storedTimestamp = localStorage.getItem("timerTimestamp");
    if (storedTimestamp && !isNaN(storedTimestamp)) {
      setStartingTimestamp(parseInt(storedTimestamp));
    }
  }, [nameP1, nameP2, errorMgs, syntaxCheckClicked]);

  useEffect(() => {
    if (initPlanMin !== 0 || initPlanSec !== 0) {
      if (!localStorage.getItem("timerTimestamp")) {
        const newTimestamp =
          Date.now() + initPlanMin * 60 * 1000 + initPlanSec * 1000;
        setStartingTimestamp(newTimestamp);
        localStorage.setItem("timerTimestamp", newTimestamp);
      }
    }
  }, [initPlanMin, initPlanSec]);

  const setPlan = () => {
    setSyntaxCheckClicked(true);
    if (client) {
      if (client.connected) {
        let username = localStorage.getItem("username");

      }
    }
  };
  

  const click = (x, y) => {
    x--;
    setDepositPosition({ x, y });
  };

  return (
    <div className="cst-page">
      
      <div className="show-cstPlan">
        <div className="cst-show-detail">
          <CountdownTimer
            countdownTimestampMs={startingTimestamp}
            minutes={initPlanMin}
            seconds={initPlanSec}
          />

          <div className="cst-show-regions">
            {territory.map((row, rowIndex) => (
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

          <div className="cst-show-budget">
            <div className="cst-budget">
              <span>BUDGET :</span>
              <span style={{ color: "#DFE658" }}>1600000</span>
            </div>
          </div>

          <div className="cst-show-deposit">
            <div className="cst-show-type">
              <p>
                row <br></br> {depositPosition.x}
              </p>
              <p>
                column <br></br> {depositPosition.y}
              </p>
              <div className="cst-line-decor"></div>
              <div className="cst-deposit">
                <p >DEPOSIT</p>
                <p style={{ color: "#DFE658"}}>1600000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cst-wrapper">
          <h2 style={{ fontFamily: "Bungee" }}>CONSTRUCTION PLAN</h2>
          <AceEditor
            className="my-editor"
            mode="java"
            theme="dracula"
            name="plan-editor"
            editorProps={{ $blockScrolling: true }}
            fontSize="13px"
            setOptions={{
              fontFamily: "'JetBrains Mono', monospace",
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              enableMultiselect: true,
            }}
            onChange={(e) => setPlanText(e)}
          />
          <div className="button-container">
            <a onClick={() => setPlan()} className="check-syntax">
              <span>CHECK SYNTAX</span>
              <i></i>
            </a>
            <button
              style={{ cursor: errorMgs != null ? "not-allowed" : "pointer" }}
              disabled={errorMgs != null}
              onClick={handleClickComplete}
              className="complete"
            >
              Confirm
            </button>
            
          </div>
        </div>

        {showPopup && (
          <div className="cstpopup">
            <div className="cstpopup-content">
              <p style={{ fontSize: "30px" }}>
                Are you sure to confirm this plan?
              </p>
              <p
                style={{
                  color: "red",
                  fontSize: "20px",
                  textDecoration: "underline",
                }}
              >
                Keep in mind that changing plans will cost your budget.
              </p>
              <button
                className="cstplanyes"
                onClick={() => handleConfirmation(true)}
              >
                Confirm
              </button>
              <button
                className="cstplanno"
                onClick={() => handleConfirmation(false)}
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
