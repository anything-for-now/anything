import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:3001';

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (userId) => {
  const response = await axios.get(`${SERVER_URL}/users/${userId}`);
  return response.data;
});

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk('user/updateProfile', async (userData) => {
  const response = await axios.put(`${SERVER_URL}/users/update`, userData);
  return response.data;
});

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profileData: {},
    loading: false,
    error: null,
    // other initial state properties...
  },
  reducers: {
    // your reducers...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profileData = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileData = { ...state.profileData, ...action.payload };
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
      // add other cases as needed...
  },
});

// export any reducer actions if needed
// export const { } = userProfileSlice.actions;

export default userProfileSlice.reducer;
