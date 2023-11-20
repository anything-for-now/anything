'use strict';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './item';

const reducer = combineReducers({
  item: itemReducer,
});

const store = configureStore({
  reducer,
});

export default store;