import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css"; // 새로 만든 CSS 파일 임포트
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
