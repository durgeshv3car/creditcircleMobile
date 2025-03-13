// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const reportSlice = createSlice({
  name: 'report',
  initialState: {
    showFilterScreen: true,
    reportData: [],
  },
  reducers: {
    nextData: (state) => {
      console.log("Next data dispatch");
      state.showFilterScreen = false;
      state.previousData = state.reportData;
      state.reportData = [];
    },
    backData: (state) => {
      console.log("Back data dispatch");
      state.showFilterScreen = false;
      state.reportData = state.previousData;
      state.previousData = [];
    },
    clearData: (state) => {
      console.log("Clear data dispatch")
      state.showFilterScreen = true;
      state.reportData = [];
    },
    showFilter: (state, action) => {
      const { payload } = action
      state.showFilterScreen = payload;
    },
    setReportData: (state, action) => {
      const { payload } = action;
      state.reportData = payload;
      state.showFilterScreen = false;
    },
  },
});

export const { nextData, backData, clearData, showFilter, setReportData } = reportSlice.actions;

export default reportSlice.reducer;
