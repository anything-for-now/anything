'use strict';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:3001';

export const fetchData = createAsyncThunk('item/fetchData', async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
});

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    showModal: false,
    selectedFile: null,
    items: [],
    formData: {
      type: '',
      itemName: '',
      image: null,
      location: '',
      description: '',
    },
  },
  reducers: {
    showModal: (state) => {
      state.showModal = true;
    },
    hideModal: (state) => {
      state.showModal = false;
    },
    fileChange: (state, action) => {
      state.selectedFile = action.payload;
    },
    formInputChange: (state, action) => {
      const { field, value } = action.payload;
      if (field === 'itemName') {
        state.formData.itemName = value;
      } else if (field === 'description') {
        state.formData.description = value;
      } else if (field === 'location') {
        state.formData.location = value;
      } else if (field === 'image') {
        state.formData.image = value;
      } else if (field === 'type') {
        state.formData.type = value;
      }
    },
    addItem: (state) => {
      // Send a POST request to the server
      console.log('HERES THE ITEM ', state);
      state.items.push(state.formData);
      axios
        .post(`${SERVER_URL}/items`, state.formData)
        .then((response) => {
          // Handle the successful response
          console.log('Item added successfully:', response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error('Error adding item:', error);
        });

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchData.pending, (state) => {
        // Handle pending state if needed
      })
      .addCase(fetchData.rejected, (state) => {
        // Handle rejected state if needed
      });
  },
});

export const { showModal, hideModal, fileChange, formInputChange, addItem } =
  itemSlice.actions;

export default itemSlice.reducer;
