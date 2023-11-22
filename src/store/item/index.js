'use strict';
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import placeholderImage from '../../../public/images/placeholder3.png';

const SERVER_URL = import.meta.env.SERVER_URL;

export const fetchData = createAsyncThunk(
  'item/fetchData',
  async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/items`);
      console.log('HERES THE FETCH DATA RESPONSE', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
);

export const editItem = createAsyncThunk(
  'item/editItem',
  async (updatedItem) => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/items/${updatedItem.id}`,
        updatedItem
      );
      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  }
);

export const deleteItem = createAsyncThunk(
  'item/deleteItem',
  async (itemId) => {
    try {
      await axios.delete(`${SERVER_URL}/items/${itemId}`);
      return itemId;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }
);

// Thunk for uploading an image
export const uploadFile = createAsyncThunk(
  'item/uploadFile',
  async (file, { getState }) => {
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
  }
);

// Thunk for adding an item, with or without an image upload
export const addItem = createAsyncThunk(
  'item/addItem',
  async (_, { dispatch, getState }) => {
    const state = getState().item;
    const email = getState().user.user.email;

    try {
      let imageUrl = state.formData.image; // Use existing image URL or placeholder

      if (state.selectedFile) {
        imageUrl = await dispatch(uploadFile(state.selectedFile)).unwrap();
      }

      const newItemData = {
        ...state.formData,
        image: imageUrl,
        email: email,
      };

      // Posts the new item data to the server
      const response = await axios.post(`${SERVER_URL}/items`, newItemData);
      console.log('Item added successfully:', response.data);
      dispatch(fetchData());
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }
);

export const addNote = createAsyncThunk(
  'item/addNote',
  async ({ itemId, user, text, notes }, { getState, dispatch }) => {
    const state = getState().item;

    // Find the item in the current state
    const currentItem = state.items.find((item) => item._id === itemId);

    if (currentItem) {
      // Create a copy of the item with the updated notes
      const updatedItem = {
        ...currentItem,
        notes: [
          ...currentItem.notes,
          {
            user,
            text,
          },
        ],
      };

      // Dispatch an action to update the item in the Redux store
      dispatch(updateItem(updatedItem));

      // Modify the 'user' variable if needed
      const newUser = user.split('@');
      const updatedUser = newUser[0];
      user = updatedUser;

      try {
        // Send the modified data to the server
        const response = await axios.post(
          `${SERVER_URL}/items/${itemId}/notes`,
          {
            user,
            text,
          }
        );

        // Return the updated notes data
        return { itemId, notes, response: response.data };
      } catch (error) {
        console.error('Error adding note:', error);
        throw error;
      }
    } else {
      console.error(`Item with ID ${itemId} not found in the current state.`);
      throw new Error('Item not found');
    }
  }
);


export const setEditItemData = createAction('item/setEditItemData');

export const updateItem = createAction('item/updateItem');

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    showModal: false,
    selectedFile: null,
    items: [],
    formData: {
      type: '',
      itemName: '',
      image: placeholderImage,
      location: '',
      description: '',
      notes: [],
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
      } else if (field === 'email') {
        state.formData.email = value;
      }
    },
    setEditItemData: (state, action) => {
      // Set the item data in the state for pre-populating the form
      const { id, itemName, description, location, image } = action.payload;
      state.formData = {
        type: '', // Add type if needed
        itemName,
        image,
        location,
        description,
      };
    },
    updateItem: (state, action) => {
      const updatedItem = action.payload;
      // Find the index of the item in the state and replace it
      const index = state.items.findIndex(
        (item) => item._id === updatedItem._id
      );
      if (index !== -1) {
        state.items[index] = updatedItem;
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
      })
      .addCase(editItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        console.log('HERES THE UPDATE ITEM', updatedItem);
        // Use map to update or add the item
        state.items = state.items.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const itemIdToDelete = action.payload;
        state.items = state.items.filter((item) => item.id !== itemIdToDelete);
      })
      .addCase(addNote.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        // Use map to update the item with the new note
        state.items = state.items.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        );
      });
  },
});

export const { showModal, hideModal, fileChange, formInputChange } =
  itemSlice.actions;

export default itemSlice.reducer;
