import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createApp } from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { config } from './config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = createApp({
  useScheduleService: () => config.services.schedule,
});

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
reportWebVitals();
