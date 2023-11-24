import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ItemCard from './ItemCard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ItemCard Component', () => {
  let store;
  let mockItem;
  const initialState = {
    item: {
      showModal: false,
      selectedFile: null,
      items: [],
      formData: {
        itemName: '',
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
    mockItem = {
      id: '1',
      type: 'Lost',
      itemName: 'Test Item',
      description: 'Test description',
      location: 'Test location',
      image: 'test.jpg',
      notes: [],
    };
    initialState.item.items = [mockItem];
    store = mockStore(initialState);
  });

  it('renders item details', () => {
    render(
      <Provider store={store}>
        <ItemCard {...mockItem} />
      </Provider>
    );

    // Check if item details are rendered
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test location')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('opens the edit form modal when "EDIT" button is clicked', () => {
    render(
      <Provider store={store}>
        <ItemCard {...mockItem} />
      </Provider>
    );

    fireEvent.click(screen.getByText('EDIT'));

    expect(screen.getByText('Edit Item Form')).toBeInTheDocument();
  });

  it('shows confirmation modal when "DELETE" button is clicked', () => {
    render(
      <Provider store={store}>
        <ItemCard {...mockItem} />
      </Provider>
    );

    fireEvent.click(screen.getByText('DELETE'));

    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
  });

  it('shows message when no alerts are available', async () => {
    render(
      <Provider store={store}>
        <ItemCard {...mockItem} />
      </Provider>
    );

    fireEvent.click(screen.getAllByText('Alerts')[0]);

    await waitFor(() => {
      expect(screen.getByText('No notes available :C')).toBeInTheDocument();
    });
  });
});
