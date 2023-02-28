import React from "react";
import HexW from "../image/hex_white.png";
import HexB from "../image/hex_blue.png";
import HexR from "../image/hex_red.png";
import "./hexagon.css";

export default function Hexagon() {
  //get turn player array regions deposit

  //configuration file
  // const row = m;
  // const column = n;
  // const regions=[];
  // const hexagon=[m][n];

  // for(let i = 0; i < row; i++){
  //   for(let j = 0; j < column; j++){

  //   }
  // }

  // for (let i = 0; i < column; i++) {
  //   for (let j = 0; j < row; j++) {}
  // }
  // for (let i = 0; i < row; i++) {
  //   const hexagons = [];
  //   for (let j = 0; j < column; j++) {
  //     hexagons.push(
  //       <div className="column" key={`${i}-${j}`}>
  //         <img className="img-eye" src={MyImage} />
  //       </div>
  //     );
  //   }
  //   regions.push(<div className="row">{hexagons}</div>);
  // }

  return (
    <div className="container">
      <div className="column">
        <div className="column1">
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
        
        </div>
        <div className="column2">
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />

        </div>
        <div className="column1">
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
         
        </div>
        <div className="column2">
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
     
        </div>
        <div className="column1">
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
       
        </div>
        <div className="column2">
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
        
        </div>
        <div className="column1">
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
      
        </div>
        <div className="column2">
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
          <img className="img-eye" src={HexW} />
      
        </div>
      </div>
    </div>
  );
}
