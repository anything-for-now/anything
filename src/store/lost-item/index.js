'use strict';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const lostItemSlice = createSlice({
  name: 'lostItem',
  initialState: {
    showModal: false,
    selectedFile: null,
    lostItems: [],
    formData: {
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
      // Implement file change logic here
      state.selectedFile = action.payload;
    },
    formInputChange: (state, action) => {
      const { field, value } = action.payload;
      if (field === 'itemName') {
        state.formData.itemName = value;
      } else if (field === 'description') {
        // Replace 'tagInput' with 'description'
        state.formData.description = value;
      } else if (field === 'location') {
        // Replace 'tagInput' with 'description'
        state.formData.location = value;
      }
    },
    saveFormData: (state) => {
      // Assuming lostItems is an array, you can push the current formData to it
      state.lostItems.push(state.formData);
      // Optionally, you can reset formData to clear the form
      state.formData = {
        itemName: '',
        image: null,
        location: '',
        description: '',
      };
    },
  },
});

// Export actions for easy use in components
export const {
  showModal,
  hideModal,
  fileChange,
  formInputChange,
  saveFormData,
} = lostItemSlice.actions;

export default lostItemSlice.reducer;
