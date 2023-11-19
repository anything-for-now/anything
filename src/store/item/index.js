'use strict';
import { configureStore, createSlice } from '@reduxjs/toolkit';

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
        state.formData.iamge = value;
      }
    },
    saveFormData: (state) => {
      state.items.push(state.formData);
      state.formData = {
        type: '',
        itemName: '',
        image: null,
        location: '',
        description: '',
      };
    },
  },
});

export const {
  showModal,
  hideModal,
  fileChange,
  formInputChange,
  saveFormData,
} = itemSlice.actions;

export default itemSlice.reducer;
