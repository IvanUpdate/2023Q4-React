import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import countriesSlice from './countriesSlice';

export const rootReducer = combineReducers({
  form: formReducer,
  countries: countriesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
