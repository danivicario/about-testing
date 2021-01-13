import React from "react";
import "../../scss/main.scss";
import Flag, { FlagModes } from "../Flag/Flag";

function App() {
  return (
    <div className="App">
      {Array(500)
        .fill(0)
        .map((_: any, idx: number) => (
          <Flag country={idx % 2 === 0 ? "EN" : "ES"} mode={FlagModes.countryNameAfter} />
        ))}
    </div>
  );
}

export default App;
