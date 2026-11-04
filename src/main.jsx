import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { DestinosProvider } from './context/DestinosContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <DestinosProvider>
          <App />
        </DestinosProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
