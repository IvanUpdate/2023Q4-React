import { createSlice } from '@reduxjs/toolkit';
import { countries } from './countries';

export const initialState: string[] = countries;

const countriesSlice = createSlice({
  name: 'countriesList',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
