import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Search from './search';
import { setSearch } from '../../../redux/pageSlice';

const mockStore = configureStore();

describe('Search Component', () => {
  it('renders with initial search value', () => {
    const initialState = {
      page: {
        search: 'initialValue',
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    expect(searchInput.value).toBe('initialValue');
  });

  it('dispatches setSearch action when search button is clicked', () => {
    const initialState = {
      page: {
        search: 'initialValue',
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: 'newSearchValue' } });
    fireEvent.click(searchButton);

    const actions = store.getActions();
    expect(actions).toEqual([setSearch('newSearchValue')]);
  });

  it('updates input value when input changes', () => {
    const initialState = {
      page: {
        search: 'initialValue',
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'updatedValue' } });

    expect(searchInput.value).toBe('updatedValue');
  });
});
