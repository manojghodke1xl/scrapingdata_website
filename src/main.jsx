import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './routes/App';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/bootstrap.css';
import './index.css';
import './country.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
