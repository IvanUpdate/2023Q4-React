import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from './hook';
import './index.css';

const App = () => {
  const formData = useAppSelector((store) => store.form.formData);

  return (
    <div>
      <Link to="/controlled">Go to Controlled Form</Link>
      <br />
      <Link to="/uncontrolled">Go to Uncontrolled Form</Link>

      {formData && formData.length > 0 && (
        <div>
          <h3>Newly Entered Data</h3>
          <div className="user-list">
            {formData.map((user, index) => (
              <div key={index} className="user-item">
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <p>Email: {user.email}</p>
                <p>Gender: {user.gender}</p>
                <p>{user.picture}</p>
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
