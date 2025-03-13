import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import reportReducer from './reportReducer';
import filterReducer from './filterReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  report: reportReducer,
  filter: filterReducer,
  loading: loadingReducer,
});

export default rootReducer;
