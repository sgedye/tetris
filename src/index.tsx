import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./assets/styles/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <h1 className="text-center my-4">TETRIS APP</h1>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
