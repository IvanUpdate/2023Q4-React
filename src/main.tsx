import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './index.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from './redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <Router>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Router>
  </Provider>
);
