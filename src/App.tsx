import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from './hook';
import styles from './App.module.css';

const App = () => {
  const formData = useAppSelector((store) => store.form.formData);

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <Link className={styles.link} to="/controlled">
          Go to Controlled Form
        </Link>
        <Link className={styles.link} to="/uncontrolled">
          Go to Uncontrolled Form
        </Link>
      </div>

      {formData && formData.length > 0 && (
        <div className={styles.content}>
          <h3>Newly Entered Data:</h3>
          <div className={styles.userList}>
            {formData.map((user, index) => (
              <div key={index} className={styles.userItem}>
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <p>Email: {user.email}</p>
                <p>Gender: {user.gender}</p>
                <img src={user.picture} alt="user" />
                <p>Country: {user.country}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
