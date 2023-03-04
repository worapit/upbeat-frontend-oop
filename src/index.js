import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./Home";
import CstPlan from "./CstPlan";
// import Map from "./Map";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Map />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
