import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from './notFound';

describe('NotFound Component', () => {
  it('renders a "Not Found" message', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText('Sorry, Not Found Results On Your Request')).toBeInTheDocument();
  });
});
