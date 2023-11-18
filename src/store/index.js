'use strict';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import lostReducer from './lost-item';

const reducer = combineReducers({
  lost: lostReducer,
});

const store = configureStore({
  reducer,
});

export default store;