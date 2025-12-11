import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { worker } from "./api/mock/browser";

if (import.meta.env.DEV) {
  // start MSW in dev
  worker.start();
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
