'use strict';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const lostItemSlice = createSlice({
  name: 'lostItem',
  initialState: {
    showModal: false,
    tags: [],
    tagInput: '',
    selectedFile: null,
    formData: {
      itemName: '',
      image: null,
      location: '',
      keywords: [],
    },
  },
  reducers: {
    showModal: (state) => {
      state.showModal = true;
    },
    hideModal: (state) => {
      state.showModal = false;
    },
    addTag: (state, action) => {
      // Implement tag addition logic here
      state.tags.push(action.payload);
    },
    removeTag: (state, action) => {
      // Implement tag removal logic here
      state.tags.splice(action.payload, 1);
    },
    fileChange: (state, action) => {
      // Implement file change logic here
      state.selectedFile = action.payload;
    },
    formInputChange: (state, action) => {
      const { field, value } = action.payload;
      // Update the state based on the field
      if (field === 'itemName') {
        state.formData.itemName = value;
      } else if (field === 'tagInput') {
        state.tagInput = value;
      }
    },
  },
});

// Export actions for easy use in components
export const {
  showModal,
  hideModal,
  addTag,
  removeTag,
  fileChange,
  formInputChange,
} = lostItemSlice.actions;

export default lostItemSlice.reducer;
