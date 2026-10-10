import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { AuthProvider } from "./authContext.jsx";
import ProjectRoutes from "./Routes.jsx";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <BrowserRouter>
    <AuthProvider>
      <ProjectRoutes />
    </AuthProvider>
  </BrowserRouter>
);