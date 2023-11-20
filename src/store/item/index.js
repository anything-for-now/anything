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

// Thunk for uploading an image
export const uploadFile = createAsyncThunk('item/uploadFile', async (file, { getState }) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.post(`${SERVER_URL}/upload`, formData);
    if (response.status === 200) {
      return response.data.imageUrl;
    } else {
      throw new Error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
});

// Thunk for adding an item, with or without an image upload
export const addItem = createAsyncThunk('item/addItem', async (_, { dispatch, getState }) => {
  const state = getState().item;

  try {
    let imageUrl = state.formData.image; // Use existing image URL or placeholder

    if (state.selectedFile) {
      imageUrl = await dispatch(uploadFile(state.selectedFile)).unwrap();
    }

    const newItemData = {
      ...state.formData,
      image: imageUrl, 
    };

    // Posts the new item data to the server
    const response = await axios.post(`${SERVER_URL}/items`, newItemData);
    console.log('Item added successfully:', response.data);
    dispatch(fetchData());
  } catch (error) {
    console.error('Error adding item:', error);
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
      image: 'https://placehold.co/200x200' ,
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

export const { showModal, hideModal, fileChange, formInputChange} =
  itemSlice.actions;

export default itemSlice.reducer;
