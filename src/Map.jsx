import React, { useRef } from "react";
import Profile from "./image/profile.png";
import Hexagon from "./component/Hexagon";
import "./Map.css"

export default function Map() {
  return (
    <div className="backgroundMap ">
      <img className="profile" src={Profile} />
    </div>
  );
}
