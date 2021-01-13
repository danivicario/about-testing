import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import "../../scss/main.scss";
import Flag from "../Flag/Flag";

function App() {
  return (
    <div className="App">
      <Flag />
    </div>
  );
}

export default App;
