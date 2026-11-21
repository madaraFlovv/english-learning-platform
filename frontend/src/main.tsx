import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize/modern-normalize.css";
import "./styles/globals.css";
import App from "./App.tsx";

const savedTheme = localStorage.getItem("englishly-theme");
if (savedTheme === "dark") {
  document.documentElement.dataset.theme = "dark";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
