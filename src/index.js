import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </ThemeProvider>
);
