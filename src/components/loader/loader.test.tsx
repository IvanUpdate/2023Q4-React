import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './loader';

describe('Loader Component', () => {
  it('renders loader image', () => {
    const { getByAltText } = render(<Loader />);

    const loaderImage = getByAltText('Loading...');

    expect(loaderImage).toBeInTheDocument();
  });

});
