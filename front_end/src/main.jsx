import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// function getCookie(name) {
//   return document.cookie
//     .split("; ")
//     .find(row => row.startsWith(name + "="))
//     ?.split("=")[1];
// }

// console.log(getCookie("isauth"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
