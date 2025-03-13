// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    show: (state) => {
        return true
    },
    hide: (state) => {
        return false;
    },
  },
});

export const { show, hide } = loadingSlice.actions;

export default loadingSlice.reducer;
