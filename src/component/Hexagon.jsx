import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import region from "../image/region.png";
import cityCenter from "../image/city_center.png";
import city from "../image/city.png";
import "./hexagon.css";

export default function Hexagon({ valueR, valueC }) { // Receive valueR and valueC as props
  const navigate = useNavigate();
  const location = useLocation();
  

  const rowcf = localStorage.getItem("valueR");
  const column = localStorage.getItem("valueC");

  const regions = [];
  const centerC = 2;
  const centerR = 5;
  const C = 2;
  const R = 4;

  if (rowcf > 16) rowcf = 16;
  else if (rowcf < 9) rowcf = 9;
  if (column > 16) column = 16;
  else if (column < 9) column = 9;

  for (let i = 0; i < rowcf; i++) {
    const row = [];
    for (let j = 0; j < column; j++) {
      if (j === centerC-1 && i === centerR-1 ) row.push(cityCenter);
      else if (j === C-1 && i === R-1) row.push(city);
      else row.push(region);
    }
    regions.push(row);
  }

  return (
    <div>
      {regions.map((row, rowIndex) => (
        <div className="rowcss" key={rowIndex}>
          {row.map((img, colIndex) =>
            colIndex % 2 === 0 ? (
              <img
                key={`${rowIndex}-${colIndex}`}
                src={img}
                className="low"
                style={{ width: "10%" }}
              />
            ) : (
              <img
                key={`${rowIndex}-${colIndex}`}
                src={img}
                style={{ width: "10%" }}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}
