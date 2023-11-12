import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './index.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
);
