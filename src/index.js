import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./Map";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
   <Map/>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));