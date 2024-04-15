import React from 'react';
import { render } from '@testing-library/react';
import Header from '../src/components/header'; // Adjust the import path as necessary

describe('Header', () => {
  it('renders and returns HTML', () => {
    const { container } = render(<Header />);

    expect(container.innerHTML).toBeTruthy();

  });
});
