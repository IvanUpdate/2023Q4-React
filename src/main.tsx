import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import Controlled from './Controlled';
import Uncontrolled from './Uncontrolled';
import { Provider } from 'react-redux';
import store from './redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/controlled',
    element: <Controlled />,
  },
  {
    path: '/uncontrolled',
    element: <Uncontrolled />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
