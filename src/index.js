import React from "react";
import ReactDOM from "react-dom";
// import CstPlan from "./CstPlan"
import Map from "./Map";
import CstPlan from "./CstPlan";
import Home from "./Home";

import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
