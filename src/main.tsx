import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./theme.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-black text-white font-circular-book h-screen">
      <App />
    </div>
  </StrictMode>
);
