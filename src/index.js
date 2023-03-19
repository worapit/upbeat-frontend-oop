import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./Map";
import CstPlan from "./CstPlan";
import Home from "./Home";
import Start from "./Start";
import Loading from "./Loading";
import Cnfile from "./Cnfile";
import Youlose from "./Youlose";
import "./index.css";
import Waiting from "./Waiting"
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";

function App() {
  return (
     <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
           <Route path="/cnfile" element={<Cnfile />}/>
          <Route path="/start" element={<Start />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/cstplan" element={<CstPlan />} />
          <Route path="/map" element={<Map />} />
          <Route path="/waiting" element={<Waiting />} />
          <Route path="/youlose" element={<Youlose />} />
        </Routes>
      </div>
     </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
