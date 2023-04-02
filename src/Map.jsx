import React, { useState, useEffect } from "react";
import Hexagon from "./component/Hexagon";
import PopUp from "./component/Popup";
import myCustomFontt from "./font/Space.ttf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import "./Map.css";
import { url } from "./constants";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";

let client;

export default function Map() {
  const [territory, setTerritory] = useState([[]]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [depositPosition, setDepositPosition] = useState({ x: 0, y: 0 });
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [waitingForOtherPlayer, setWaitingForOtherPlayer] = useState(false);
  const [otherPlayerConfirmed, setOtherPlayerConfirmed] = useState(false);
  const [bothPlayersConfirmed, setBothPlayersConfirmed] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState(false);


  const navigate = useNavigate();

  const navigateToCstPlan = () => {
    setIsConfirmPopupOpen(false);
    client.publish({ destination: "/app/changePlan", body: JSON.stringify({ status: "changing" }) });
    navigate('/cstPlan');
    setIsPopupOpen(false);
    if (!localStorage.getItem("firstPlayer")) {
      localStorage.setItem("firstPlayer", true);
    }
  };
  
  
  
  
  const showConfirmPopup = () => {
    setIsConfirmPopupOpen(true);
  };

  const cancelChangePlan = () => {
    setIsConfirmPopupOpen(false);
  };

  localStorage.removeItem("timerTimestamp");
  localStorage.removeItem("timeOut");
  localStorage.setItem("setPlan", true);
  
  useEffect(() => {
    if (!client) {
      client = new Client(
        {
          brokerURL: url,
          onConnect: () => {
            client.subscribe("/app/game");
            client.subscribe("/topic/game");
            client.subscribe("/app/territory", (message) => {
              const body = JSON.parse(message.body);
              setTerritory(body);
            });

            client.subscribe("/topic/territory", (message) => {
              const body = JSON.parse(message.body);
              setTerritory(body);
            });

            client.subscribe("/topic/changePlan", (message) => {
              const body = JSON.parse(message.body);
              if (body.status === "changing") {
                setWaitingForOtherPlayer(true);
              } else if (body.status === "done") {
                setWaitingForOtherPlayer(false);
              }
            });

            client.subscribe("/topic/planConfirmation", (message) => {
              const body = JSON.parse(message.body);
              setBothPlayersConfirmed(body.confirmed);
            });

          }
        });
      client.activate();
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "firstPlayer" && e.newValue === "true") {
        setIsPopupOpen(false);
        setFirstPlayer(true);
        localStorage.removeItem("firstPlayer");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  
  

  useEffect(() => {
    setWaitingForOtherPlayer(!bothPlayersConfirmed);
  }, [bothPlayersConfirmed]);
  
  

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

  const click = (x, y) => {
    setDepositPosition({x,y})
  };

  return (
    <div className="map-page">
      <div className="map-header">
        <span
          style={{
            fontFamily: "space",
          }}
        >
          YOUR TURN
        </span>
      </div>

      <div className="map-show-deposit" >
        <div className="map-show-type">
          <span >DEPOSIT</span>
        </div>
        <div className="text-box-deposit">
           <div className="text-box-row">
            <div className="display-deposit-box">
              <p>row   <br></br> {depositPosition.x}</p>
              <p>column   <br></br> {depositPosition.y}</p>
            </div>
            <div className="deposit-border-decor">
              <span style={{color: "#b19a9a"}}>deposit</span>
              <p>16000000</p>
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
                x={rowIndex}
                y={colIndex}
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

      <div className="map-show-budget" >
        <div className="map-show-type2">
          <span >BUDGET</span>
        </div>
        <div className="map-budget">
          <div className="map-withIcon">
            <FontAwesomeIcon icon={faCoins} color="#b19a9a" size="2x" />
          </div>
          <span>10000000</span>
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
      {waitingForOtherPlayer && (
        <div id="mapconfirm-popup-container">
          <div className="mapconfirm-popup">
            <p>Waiting for another player is changing plan...</p>
          </div>
        </div>
      )}
      {isConfirmPopupOpen && (
        <div id="mapconfirm-popup-container">
          <div className="mapconfirm-popup">
            <p>Are you sure to change plan?</p>
            <p style={{color: "red", fontSize: "26px", textDecoration: "underline", marginTop: "-2%"}}>keep in mind that changing plans will cost your budget and if plans aren't confirmed in time, the system will submit only one word "done" automatically.</p>
            <div className="mapconfirm-popup-buttons">
              <button className="map-yes" onClick={navigateToCstPlan}>confirm</button>
              <button className="map-no" onClick={cancelChangePlan}>cancel</button>
            </div>
          </div>
        </div>
      )}
      {waitingForOtherPlayer && !otherPlayerConfirmed && (
      <div id="mapconfirm-popup-container">
        <div className="mapconfirm-popup">
          <p>Waiting for another player to finish writing the construction plan...</p>
        </div>
      </div>
      )}
    </div>
  );
}

