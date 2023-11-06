import React from 'react';
import loader from '../../assets/loader.gif';

const Loader: React.FC = () => {
  return (
    <div>
      <img src={loader} alt="Loading..." />
    </div>
  );
};

export default Loader;
