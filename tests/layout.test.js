import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../src/components/layout';

describe('Layout', () => {
  it('renders and returns HTML', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(container.innerHTML).toBeTruthy(); // Checks if there's any HTML
  });
});
