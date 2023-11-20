import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:3001';

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (userId, { getState }) => {
  const response = await axios.get(`${SERVER_URL}/user/${userId}`);
  return response.data;
});

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk('user/updateProfile', async (userData, { getState }) => {
  const response = await axios.put(`${SERVER_URL}/user/update`, userData);
  return response.data;
});

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profileData: {},
    // other initial state properties...
  },
  reducers: {
    // your reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profileData = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileData = action.payload;
      });
      // add other cases as needed...
  },
});

export const { /* export any reducer actions if needed */ } = userProfileSlice.actions;

export default userProfileSlice.reducer;
