import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { addInfo } from './redux/formSlice';
import './index.css';
import makeBase64 from './utils/makeBase64';
import AutoComplete from './Autocomplete';
import { FormDataSchema, validationSchema } from './utils/schema';
import { useAppDispatch, useAppSelector } from './hook';
import styles from './Controlled.module.css';

const Uncontrolled: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataSchema>({
    name: '',
    age: 1,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptTerms: false,
    picture: {},
    country: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = useAppSelector((store) => store.countries);

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLInputElement
    >
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      return;
    }
    if (name === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: '',
      }));
    }
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files : value,
    }));
  };

  const handleCountrySelect = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      country: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      country: '',
    }));
  };

  const onSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const file = Object.values(formData.picture)[0];
      if (file && file instanceof File) {
        const result = { ...formData, picture: await makeBase64(file) };
        dispatch(addInfo(result));
        navigate('/');
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className={styles.main}>
      <h2>Uncontrolled Component Form</h2>
      <form>
        <div className={styles.item}>
          <label>Name:</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {errors.name && <p className="error">{errors.name}</p>}
        <div className={styles.item}>
          <label>Age:</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        {errors.age && <p className="error">{errors.age}</p>}
        <div className={styles.item}>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className={styles.item}>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
        <div className={styles.item}>
          <label>Confirm Password:</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <div className={styles.item}>
          <label>
            <input
              type="radio"
              name="gender"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              value="male"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              value="female"
            />
            Female
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}
        <div className={styles.item}>
          <label>Accept Terms and Conditions:</label>
          <input
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
        </div>
        {errors.acceptTerms && <p className="error">{errors.acceptTerms}</p>}
        <div className={styles.item}>
          <label>Picture:</label>
          <input name="picture" type="file" onChange={handleChange} required />
        </div>
        <div className={styles.item}>
          <label>Country:</label>
          <AutoComplete options={countries} onSelect={handleCountrySelect} />
        </div>
        {errors.country && <p className="error">{errors.country}</p>}
        <button type="button" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Uncontrolled;
