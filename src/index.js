import React from "react";
import ReactDOM from "react-dom";
// import CstPlan from "./CstPlan"
import Map from "./Map";
import CstPlan from "./CstPlan";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div>
      <Map />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
