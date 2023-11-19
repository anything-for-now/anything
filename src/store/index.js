'use strict';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import lostItemReducer from './lost-item';

const reducer = combineReducers({
  lostItem: lostItemReducer,
});

const store = configureStore({
  reducer,
});

export default store;