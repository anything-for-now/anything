const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:3001';

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (auth0Id, { getState }) => {
  const response = await axios.get(`${SERVER_URL}/user/${auth0Id}`);
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
  },
  reducers: {
    // Reducer methods, if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profileData = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileData = { ...state.profileData, ...action.payload };
      });
  },
});

export const { /* reducer actions */ } = userProfileSlice.actions;
export default userProfileSlice.reducer;