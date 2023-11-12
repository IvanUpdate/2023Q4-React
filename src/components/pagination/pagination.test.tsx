import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './pagination';
import { BrowserRouter } from 'react-router-dom';

describe('Pagination Component', () => {
  it('updates URL query parameter when page changes', () => {
    vi.mock('../app/AppContext.tsx', () => ({
      useAppContext: vi.fn(() => ({
        currentPage: 1,
        qtyPerPage: 10,
        quantityResults: 30,
        searchParams: new URLSearchParams('?search=test&page=1'),
        setCurrentPage: vi.fn(),
      })),
    }));

    const { getByText } = render(
      <BrowserRouter>
        <Pagination changePage={vi.fn()} changeQtyPerPage={vi.fn()} />
      </BrowserRouter>
    );

    fireEvent.click(getByText('2'));
    expect(window.location.search).toBe('?search=test&page=2');
  });

  it('displays all page numbers', () => {
    vi.mock('../app/AppContext.tsx', () => ({
      useAppContext: vi.fn(() => ({
        currentPage: 1,
        qtyPerPage: 10,
        quantityResults: 100,
        searchParams: new URLSearchParams('?search=test&page=1'),
        setCurrentPage: vi.fn(),
      })),
    }));

    const { getAllByTestId } = render(
      <BrowserRouter>
        <Pagination changePage={vi.fn()} changeQtyPerPage={vi.fn()} />
      </BrowserRouter>
    );

    const pageSizeOptions = getAllByTestId('pagination-link');
    expect(pageSizeOptions).toHaveLength(10);
    expect(pageSizeOptions.map((el) => el.textContent)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });

  
});

describe('handlePageChange testing', () => {
  it('after click next make next page', () => {

    const changePageMock = vi.fn();

    const { getByTestId } = render(
      <BrowserRouter>
        <Pagination changePage={changePageMock} changeQtyPerPage={vi.fn()} />
      </BrowserRouter>
    );
    const resultsContainer = getByTestId('next');

    fireEvent.click(resultsContainer);

    expect(changePageMock).toHaveBeenCalled();
  });
});


