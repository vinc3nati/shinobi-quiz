import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import { ThemeProvider } from './contexts';
import ScrollToTop from './ScrollToTop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <ScrollToTop />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);

