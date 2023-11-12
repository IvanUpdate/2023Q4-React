import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './layout';
import { mockData } from '../../services/data/mockData';

// Mocking the react-router-dom module
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
  Outlet: vi.fn(() => null),
  Link: vi.fn(() => null),
  Route: vi.fn(() => null),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useParams: () => ({}),
}));

// Mocking the useAppContext function
beforeEach(() => {
  vi.mock('../app/AppContext', () => ({
    useAppContext: vi.fn(() => ({
      qtyPerPage: 10, // Add any other properties you use in your component
      searchParams: new URLSearchParams('page=1'), // Example URLSearchParams for testing
      isColumn: true,
      results: mockData,
    })),
  }));
});

describe('Layout Component', () => {
  it('renders the specified number of cards', () => {
    const mockChangeCharacter = vi.fn();
    const mockExitDetails = vi.fn();

    // Render the component with mock data
    const { getAllByRole } = render(
      <Layout changeCharacter={mockChangeCharacter} exitDetails={mockExitDetails} />
    );

    // Check if the correct number of cards is rendered
    expect(getAllByRole('article')).toHaveLength(2); // Adjust as needed
  });
});
