import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './search';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value.toString()),
    clear: () => (store = {}),
  };
})();



beforeEach(() => {
  localStorageMock.clear();
  vi.mock('../AppContext', () => ({
    useAppContext: vi.fn(() => ({
      input: 'test',
      setInput: vi.fn(),
    })),
  }));
});

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockHandleSearch = (request: string) => {
  localStorage.setItem('request', request);
};

describe('Search Component', () => {
  it('saves entered value to local storage when Search button is clicked', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Search handleSearch={mockHandleSearch} />
    );

    const searchInput =  getByPlaceholderText('test');
    fireEvent.change(searchInput, { target: { value: 'Test Search' } });

    const searchButton = getByTestId('search-button');
    fireEvent.click(searchButton);

    console.log(window.localStorage)
    expect(localStorageMock.getItem('request')).toBe('test');
  });

  it('retrieves value from local storage upon mounting', () => {
    localStorageMock.setItem('request', 'Saved Value');

    const { getByPlaceholderText } = render(
      <Search handleSearch={mockHandleSearch} />
    );

    const searchInput = getByPlaceholderText('test');
    expect(searchInput).toHaveValue('test');
  });
});
