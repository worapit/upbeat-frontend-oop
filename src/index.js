import React from "react";
import ReactDOM from "react-dom";
import CstPlan from "./CstPlan";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return <CstPlan />;
}

ReactDOM.render(<App />, document.getElementById("root"));
