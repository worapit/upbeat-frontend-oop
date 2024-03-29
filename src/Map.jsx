import React, { useState, useEffect } from "react";
import Hexagon from "./component/Hexagon";
import PopUp from "./component/Popup";
import myCustomFontt from "./font/Space.ttf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./Map.css";
import { url } from "./constants";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";

let client;

export default function Map() {
  const [territory, setTerritory] = useState([[]]);
  const [nameP1, setNameP1] = useState(null);
  const [p1Ready, setP1Ready] = useState(false);
  const [p2Ready, setP2Ready] = useState(false);
  const [budgetP1, setBudgetP1] = useState(0);
  const [budgetP2, setBudgetP2] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [winner, setWinner] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [depositPosition, setDepositPosition] = useState({ x: 0, y: 0, deposit: 0, owner: null });
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const navigate = useNavigate();

  const handleConfirm = (choice) => {
    if (choice) {
      if (client) {
        if (client.connected) {
          let username = localStorage.getItem("username");
          client.publish(
            {
              destination: "/app/changPlan",
              body: JSON.stringify(
                {
                  name: username,
                }),
              replyTo: "/topic/game",
            });
        }
      }
      navigate('/cstPlan');
    }
    setIsConfirmPopupOpen(false);
  };

  const showConfirmPopup = () => {
    setIsConfirmPopupOpen(true);
  };
  
  useEffect(() => {
    if (!client) {
      client = new Client(
        {
          brokerURL: url,
          onConnect: () => {
            client.subscribe("/app/game", (message) => {
              const body = JSON.parse(message.body);
              setNameP1(body["player1"]["name"]);
              setP1Ready(body["p1Ready"]);
              setP2Ready(body["p2Ready"]);
              setBudgetP1(body["player1"]["budget"]);
              setBudgetP2(body["player2"]["budget"]);
              setCurrentTurn(body["currentTurn"]["name"]);
              setWinner(body["winner"]);
            });
            client.subscribe("/topic/game", (message) => {
              const body = JSON.parse(message.body);
              setP1Ready(body["p1Ready"]);
              setP2Ready(body["p2Ready"]);
              setBudgetP1(body["player1"]["budget"]);
              setBudgetP2(body["player2"]["budget"]);
              setCurrentTurn(body["currentTurn"]["name"]);
              setWinner(body["winner"]);
            });
            client.subscribe("/app/territory", (message) => {
              const body = JSON.parse(message.body);
              setTerritory(body);
            });
            client.subscribe("/topic/territory", (message) => {
              const body = JSON.parse(message.body);
              setTerritory(body);
            });
            client.publish({
              destination: "/app/doPlan",
              replyTo: "/app/game",
            });
          }
        });
      client.activate();

      localStorage.removeItem("timerTimestamp");
      localStorage.removeItem("timeOut");
      localStorage.setItem("setPlan", true);
    }
  }, [p1Ready, p2Ready, budgetP1, budgetP2, currentTurn, winner]);

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

  const click = (x, y, deposit, owner) => {
    x++;
    y++;
    setDepositPosition({ x, y, deposit, owner });
  };

  if (winner != null) {
    if (winner["name"] === localStorage.getItem("username")) {
      navigate("/youwin");
    }
    else {
      navigate("/youlose");
    }
  }


  return (
    <div className="map-page">
      <div className="map-header">
        <span
          style={{
            fontFamily: "space",
          }}
        >
          {currentTurn === localStorage.getItem("username") ? "YOUR TURN" : "OPPONENT TURN"}
        </span>
      </div>

      <div className="map-show-deposit" >
        <div className="map-show-type">
          <span >DEPOSIT</span>
        </div>
        <div className="text-box-deposit">
           <div>
            <div className="display-deposit-box">
              <p>row   <br></br> {depositPosition.x}</p>
              <p>column   <br></br> {depositPosition.y}</p>
            </div>
            <div className="deposit-border-decor">
              <span style={{color: "#b19a9a"}}>deposit</span>
              <p>{depositPosition.owner == null ? "-" : depositPosition.owner["name"] === localStorage.getItem("username") ? depositPosition.deposit : "-"}</p>
            </div>
           </div>
        </div>
      </div>

       {/* <img className="map-profile" src={Profile} /> */}
       <div className="map-show-regions">
        {territory.map((row, rowIndex) => (
          <div className="rowcss" key={rowIndex}>
            {row.map((col, colIndex) => (
              <Hexagon
                key={`${rowIndex}${colIndex}`}
                x={territory[rowIndex][colIndex]["row"]}
                y={territory[rowIndex][colIndex]["col"]}
                deposit={territory[rowIndex][colIndex]["deposit"]}
                isCityCenter={territory[rowIndex][colIndex]["cityCenter"]}
                owner={territory[rowIndex][colIndex]["owner"]}
                click={click}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="map-container-plan">
        <a className="map-buttonM" onClick={showConfirmPopup}>
          <FontAwesomeIcon icon={faFileLines} size="2x" />
        </a>
        <div className="map-button-meaning">
          <p style={{ fontFamily: "Bungee" }}>CHANGE PLAN</p>
        </div>
      </div>

      <div className="map-show-budget">
        <div className="map-show-type2">
          <span>BUDGET</span>
        </div>
        <div className="map-budget">
          <div className="map-withIcon">
            <FontAwesomeIcon icon={faCoins} color="#b19a9a" size="2x" />
          </div>
          <span>{localStorage.getItem("username") === nameP1 ? budgetP1 : budgetP2}</span>
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

      {isConfirmPopupOpen && (
        <div id="mapconfirm-popup-container">
          <div className="mapconfirm-popup1">
            <div className="red-flag-map">
              <p>!</p>
            </div>
            <p>Are you sure to change plan?</p>
            <p
              style={{
                color: "red",
                fontSize: "26px",
                textDecoration: "underline",
                marginTop: "-2%",
              }}
            >
              keep in mind that changing plans will cost your budget and if
              plans aren't confirmed in time, the system will submit only one
              word "done" automatically.
            </p>
            <div className="mapconfirm-popup-buttons">
            <button className="map-yes" onClick={() => handleConfirm(true)}>confirm</button>
              <button className="map-no" onClick={() => handleConfirm(false)}>cancel</button>
            </div>
          </div>
        </div>
      )}
      {(!p1Ready || !p2Ready) && (
      <div id="mapconfirm-popup-container">
        <div className="mapconfirm-popup">
        <div className="load-circle-box">
            <span className="s1"></span>
            <span className="s2"></span>
            <span className="s3"></span>
          </div>
          <p>Waiting for another player</p>
          <p> to finish writing the construction plan</p>
        </div>
      </div>
      )}
    </div>
  );
}
