import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./Map";
import CstPlan from "./CstPlan";
import Home from "./Home";
import Start from "./Start";
import Loading from "./Loading";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
     <Router>
      <div>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/cstplan" element={<CstPlan />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
     </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
