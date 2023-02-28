import React, { useRef } from "react";
import Hexagon from "./component/Hexagon";
import "./cstPlan.css";

export default function CstPlan() {
  return (
    <div>
      <div className="container">
        <div className="hex">
          <Hexagon />
          <div className="budget">
            
          </div>
        </div>
        <div className="wrapper">
          <h2> CONSTRUCTOR PLAN</h2>
          <textarea placeholder="plan write here..." required></textarea>
          <a href="#" style={{ "--clr": "#ff1867" }}>
            <span style={{ fontFamily: "Bungee" }}>COMPLETE</span>
            <i></i>
          </a>
        </div>
      </div>
    </div>
  );
}
