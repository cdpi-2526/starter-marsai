import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/public/Home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" index element={<Home />} />

        {/* Routes privées (à venir) */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
