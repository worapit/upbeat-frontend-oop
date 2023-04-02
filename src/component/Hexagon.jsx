import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import region from "../image/region.png";
import cityCenter from "../image/city_center.png";
import city from "../image/city.png";
import "./hexagon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Hexagon({ x, y, deposit, isCityCenter, owner, click }) {
  function setRegion() {
    if (isCityCenter && owner) return cityCenter;
    else if (owner) return city;
    else return region;
  }

  return (
    <img
      className={y % 2 === 0 ? "low" : null}
      style={{ width: "10%" }}
      src={setRegion()}
      onClick={() => click(x, y, deposit, owner)}
    />
  );
}
