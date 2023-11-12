import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './layout';
import { mockData } from '../../services/data/mockData';


vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
  Outlet: vi.fn(() => null),
  Link: vi.fn(() => null),
  Route: vi.fn(() => null),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useParams: () => ({}),
}));


beforeEach(() => {
  vi.mock('../app/AppContext', () => ({
    useAppContext: vi.fn(() => ({
      qtyPerPage: 10, 
      searchParams: new URLSearchParams('page=1'), 
      isColumn: true,
      results: mockData,
    })),
  }));
});

describe('Layout Component', () => {
  it('renders the specified number of cards', () => {
    const mockChangeCharacter = vi.fn();
    const mockExitDetails = vi.fn();

    const { getAllByRole } = render(
      <Layout changeCharacter={mockChangeCharacter} exitDetails={mockExitDetails} />
    );

    expect(getAllByRole('article')).toHaveLength(2);
  });
});

describe('Layout Component', () => {
  it('calls exitDetails when clicked', () => {
    const exitDetailsMock = vi.fn();
    const { getByTestId } = render(
        <Layout changeCharacter={() => {}} exitDetails={exitDetailsMock} />
    );
    const resultsContainer = getByTestId('results-container');

    fireEvent.click(resultsContainer);

    expect(exitDetailsMock).toHaveBeenCalled();
  });
});
