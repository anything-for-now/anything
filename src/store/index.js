'use strict';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './item';
import userProfileReducer from './user-profile';
import userReducer from './user';

const reducer = combineReducers({
  item: itemReducer,
  userProfile: userProfileReducer,
  user: userReducer,
});

const store = configureStore({
  reducer,
});

export default store;
