import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hook';
import { addInfo } from './redux/formSlice';
import './index.css';
import makeBase64 from './utils/makeBase64';
import AutoComplete from './Autocomplete';
import { FormDataSchema, validationSchema } from './utils/schema';

const Controlled: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const countries = useAppSelector((store) => store.countries);

  const onSubmit = async (data: FormDataSchema) => {
    await validationSchema.validate(data, { abortEarly: false });
    const file = Object.values(data.picture)[0];
    if (file && file instanceof File) {
      const result = { ...data, picture: await makeBase64(file) };
      dispatch(addInfo(result));
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h2>Controlled Component Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input {...register('name')} type="text" required />
          {errors.name && <p className="error">{errors.name?.message}</p>}
        </div>
        <div>
          <label>Age:</label>
          <input {...register('age')} type="number" required />
          {errors.age && <p className="error">{errors.age?.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            {...register('email')}
            placeholder="email"
            type="email"
            required
          />
          {errors.email && <p className="error">{errors.email?.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            {...register('password')}
            placeholder="password"
            type="password"
            required
          />
          {errors.password && (
            <p className="error">{errors.password?.message}</p>
          )}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            {...register('confirmPassword')}
            placeholder="password"
            type="password"
            required
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword?.message}</p>
          )}
        </div>
        <div>
          <label>
            <input
              type="radio"
              {...register('gender', { required: 'Gender is required' })}
              value="male"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              {...register('gender', { required: 'Gender is required' })}
              value="female"
            />
            Female
          </label>
          {errors.gender && <p className="error">{errors.gender?.message}</p>}
        </div>
        <div>
          <label>Accept Terms and Conditions:</label>
          <input {...register('acceptTerms')} type="checkbox" required />
          {errors.acceptTerms && (
            <p className="error">{errors.acceptTerms?.message}</p>
          )}
        </div>
        <div>
          <label>Picture:</label>
          <input {...register('picture')} type="file" required />
        </div>
        <div>
          <label>Country:</label>
          <AutoComplete
            options={countries}
            onSelect={(value) => setValue('country', value)}
          />
          {errors.country && <p className="error">{errors.country.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Controlled;
