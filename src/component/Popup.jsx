import "./popup.css";
import React, { useState } from "react";
import Center from "../image/center.png";
import Opponent from "../image/opponent.png";
import Nearby from "../image/nearby.png";
import Move from "../image/move.png";
export default function PopUp() {
  const [page, setPage] = useState("p1");

  const handleP1Click = () => {
    setPage("p1");
  };

  const handleP2Click = () => {
    setPage("p2");
  };

  const handleP3Click = () => {
    setPage("p3");
  };

  const handleP4Click = () => {
    setPage("p4");
  };

  return (
    <div className="popup">
      <h1 style={{ fontFamily: "Bungee, cursive" }}>HOW TO PLAY</h1>

      <div
        className="text-popup"
        style={{ display: page === "p1" ? "block" : "none" }}
        
        
      >
        <p>Initially, each player only has the city center</p>
        <p>
          <img className="popup-image"  style={{marginLeft: "40%"}} src={Center} />
          Before the game begins, each player. will have an to devise an initial
          construction plan After the players are done . Then, it is the first
          player's turn to start the game
        </p>
        <p>
          At the beginning of each turn, each of the regions belonging to the
          current player accrues interest, During this time, the player can
          revise their construction plan. performing tasks according to the
          construction plan until finished. Then, the next player's turn begins.
        </p>

        <p>During each turn, a number of action commands can be executed</p>
      </div>

      <div
        className="text-popup"
        style={{ display: page === "p2" ? "block" : "none" }}
      >
        <h5>opponent expression</h5>
        <p>
          The opponent command returns the location of the closest region
          belonging to an opponent in one of the six directions from the current
          region occupied by the city crew
        </p>

        <div className="show-image-popup"  style={{marginLeft: "30%"}}>
        <img className="popup-image" src={Opponent} />
        <img className="popup-image" src={Nearby} />
        </div>


        <h5>nearby function</h5>
        <p>
          The nearby function looks for the opponent's region closest to the
          current location of the city crew in a given direction.
        </p>

        <h5>relocate command</h5>
        <p>This command relocates the city center to the current region.</p>
  
      </div>

      <div
        className="text-popup"
        style={{ display: page === "p3" ? "block" : "none" }}
      >


        <h5>move command</h5>
        <p>
          The move command moves the city crew one unit in the specified
          direction.
        </p>
        <img className="popup-image-4"  style={{marginLeft: "25%"}} src={Move} />

        <h5>invest command</h5>
        <p>
          The invest command adds more deposits to the current region occupied
          by the city crew.
        </p>

        <h5>collect command</h5>
        <p>
          The collect command retrieves deposits from the current region
          occupied by the city crew.
        </p>

      </div>


      <div
        className="text-popup"
        style={{ display: page === "p4" ? "block" : "none" }}
      >
       

        <h5>shoot command</h5>
        <p>
          The shoot command attempts to attack a region located one unit away
          from the city crew in the specified direction.
        </p>

        <p>
          If the target region is unoccupied, the player still pays the cost of
          the attack, but the attack itself will have no effects otherwise.
        </p>

        <p>
          If the target region belongs to the current player (i.e., a player is
          attacking its own region), the command has the same effect as the
          normal scenario, i.e., it acts as self destruction. Be careful who you
          shoot at!
        </p>

        <p>
          Finally, if the target region is a city center, and the attack reduces
          its deposit to zero, the attacked player loses the game. The other
          regions that belong to the losing player will be ownerless, but the
          deposit will remain there for the remaining players to discover and
          claim it. Ownerless deposits will not accrue interests.
        </p>
      </div>

      <div className="popup-button-show">
        <a
          className={` ${page === "p1" ? "active" : ""}`}
          onClick={handleP1Click}
        >
          1
        </a>
        <a
          className={`${page === "p2" ? "active" : ""}`}
          onClick={handleP2Click}
        >
          2
        </a>
        <a
          className={` ${page === "p3" ? "active" : ""}`}
          onClick={handleP3Click}
        >
          3
        </a>
        <a
          className={` ${page === "p4" ? "active" : ""}`}
          onClick={handleP4Click}
        >
          4
        </a>
      </div>
    </div>
  );
}
