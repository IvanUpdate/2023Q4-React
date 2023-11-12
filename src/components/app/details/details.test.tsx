import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Details from './details';

// Mocking the useAppContext function
beforeEach(() => {
  vi.mock('../AppContext', () => ({
    useAppContext: vi.fn(() => ({
      character: {
        name: 'Test Character',
        status: 'Alive',
        gender: 'Male',
        species: 'Human',
        type: 'Test Type',
        origin: { name: 'Test Origin' },
        location: { name: 'Test Location' },
        image: 'test_image_url',
        episode: ['episode1', 'episode2'],
      },
    })),
  }));
});

describe('Details Component', () => {

  it('displays detailed card data', async () => {
    // Render the component
    const { getByText, queryByText } = render(<Details exitDetails={() => {}} />);
    
    // Wait for data to be loaded
    await waitFor(() => expect(queryByText('Loading...')).toBeNull());

    // Check if detailed card data is displayed
    expect(getByText('Test Character from Test Location')).toBeInTheDocument();
    expect(getByText('Status: Alive')).toBeInTheDocument();
    expect(getByText('Gender: Male')).toBeInTheDocument();
    expect(getByText('Type: Test Type')).toBeInTheDocument();
    expect(getByText('Character\'s origin location: Test Origin')).toBeInTheDocument();
    expect(getByText('Species: Human')).toBeInTheDocument();
  });

  it('hides the component on close button click', async () => {
    // Mock exitDetails function
    const mockExitDetails = vi.fn();

    // Render the component
    const { container, getByTestId } = render(<Details exitDetails={mockExitDetails} />);
    
    // Wait for data to be loaded
    await waitFor(() => expect(getByTestId('icon')).toBeInTheDocument());

    // Click the close button
    fireEvent.click(getByTestId('icon'));

    // Check if exitDetails function is called
    expect(mockExitDetails).toHaveBeenCalled();
  });
});

// Cleanup after each test
afterEach(cleanup);
