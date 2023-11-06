import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App';
import './index.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
);
