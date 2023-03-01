import React from "react";
import ReactDOM from "react-dom";
import CstPlan from "./CstPlan"

import "bootstrap/dist/css/bootstrap.min.css";
// import CstPlan from "./CstPlan";

export default function App() {
  return (
    <div>
      <CstPlan />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
