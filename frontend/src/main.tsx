import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { showTheme } from "./store/theme/toggleColor.ts";

import "./index.css";
import "./style/animation.css";
import App from "./App.tsx";

showTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
