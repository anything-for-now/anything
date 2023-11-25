import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FormModal from './FormModal';
import { showModal } from '../store/item';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('FormModal Component', () => {
  let store;
  const initialState = {
    item: {
      showModal: true,
      selectedFile: null,
      items: [],
      formData: {
        type: '',
        itemName: '',
        image: '',
        location: '',
        description: '',
        notes: [],
      },
    },
    user: {
      user: {
        email: 'test@example.com',
      },
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch(showModal());
  });

  afterEach(() => {
    store.clearActions();
  });

  it('renders form modal correctly', async () => {
    render(
      <Provider store={store}>
        <FormModal formType="Add" />
      </Provider>
    );

    expect(await screen.findByText('Add Item Form')).toBeInTheDocument();
  });

  it('handles form input change', async () => {

    store.getState().item.formData.itemName = 'New Item Name';
    

    render(
      <Provider store={store}>
        <FormModal formType="Add" />
      </Provider>
    );

    const itemNameInput = await screen.findByTestId('itemNameInput');
    expect(itemNameInput.value).toBe('New Item Name');
  });


});
