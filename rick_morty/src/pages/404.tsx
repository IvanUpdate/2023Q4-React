import React from 'react';
import styles from './notFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <p>Sorry, Not Found Results On Your Request</p>
    </div>
  );
};

export default NotFound;
