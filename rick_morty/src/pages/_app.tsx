import * as React from 'react';
import './globals.css';

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
