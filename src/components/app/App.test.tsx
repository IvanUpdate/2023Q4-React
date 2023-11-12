// app.test.ts

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppContent from './App';

beforeEach(() => {
  vi.mock('./AppContext', () => ({
    AppContextProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="app-context-provider">{children}</div>
    ),
    useAppContext: vi.fn(() => ({
      request: 'test',
      setRequest: vi.fn(),
      results: [],
      setResults: vi.fn(),
      quantityResults: 0,
      setQuantityResults: vi.fn(),
      setQtyPerPage: vi.fn(),
      loading: false,
      setLoading: vi.fn(),
      error: null,
      setError: vi.fn(),
      searchParams: new URLSearchParams(),
      setSearchParams: vi.fn(),
      character: null,
      setCharacter: vi.fn(),
      isColumn: false,
      setIsColumn: vi.fn(),
      currentPage: 1,
      setCurrentPage: vi.fn(),
    })),
  }));
});

describe('AppContent Component', () => {
  it('renders without crashing', () => {
    const { queryAllByTestId } = render(
      <div data-testid="app-context-provider">
        <AppContent />
      </div>
    );

    const appContextProvider = queryAllByTestId('app-context-provider')[0];
    expect(appContextProvider).toBeInTheDocument();
  });
});

