'use strict';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './item';
import userReducer from './user';

const reducer = combineReducers({
  item: itemReducer,
  user: userReducer,
});

const store = configureStore({
  reducer,
});

export default store;
