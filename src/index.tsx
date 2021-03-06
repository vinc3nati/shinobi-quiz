import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider, DataProvider, ThemeProvider } from "./contexts";
import { LoaderProvider } from "./contexts/loader-context";
import ScrollToTop from "./ScrollToTop";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <LoaderProvider>
          <AuthProvider>
            <DataProvider>
              <ScrollToTop />
              <App />
            </DataProvider>
          </AuthProvider>
        </LoaderProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
