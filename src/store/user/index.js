import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
};

const SERVER_URL = import.meta.env.SERVER_URL;

// Async thunk for checking if the user exists in the database
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userData) => {
    // eslint-disable-next-line no-useless-catch
    try {
    
      // Check if the user exists
      const postResponse = await axios.post(`${SERVER_URL}/users`, userData);

      return postResponse.data; // Assuming the server responds with the user data
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    });
  },
});

// Export the action creator separately
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
