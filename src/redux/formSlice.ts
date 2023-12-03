import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Information } from './types';

type FormData = Information[];

const initialState: { formData: FormData } = {
  formData: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addInfo(state, action: PayloadAction<Information>) {
      return {
        ...state,
        formData: [...state.formData, action.payload],
      };
    },
  },
});

export const { addInfo } = formSlice.actions;
export default formSlice.reducer;
