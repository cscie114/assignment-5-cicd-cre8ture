import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../src/components/Navbar.js'; 

describe('Navbar', () => {
  it('renders and returns HTML', () => {
    const { container } = render(<Navbar />);

    expect(container.innerHTML).toBeTruthy();

  });
});
