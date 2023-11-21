'use strict';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './item';
import userProfileReducer from './user';

const reducer = combineReducers({
  item: itemReducer,
  userProfile: userProfileReducer, 
});

const store = configureStore({
  reducer,
});

export default store;
