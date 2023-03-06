import React from "react";
import HexW from "../image/hex_white.png";
import "./hexagon.css";

export default function Hexagon() {
  //max 16*16
  //min 9*9
  const rowcf = 9;
  const column = 9;
  const regions = [];

  for (let i = 0; i < rowcf; i++) {
    const row = [];
    for (let j = 0; j < column; j++) {
      row.push(HexW);
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
