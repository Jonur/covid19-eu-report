import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  const props = { lastUpdate: '23 May 2020' };

  test('renders the Header component correctly', () => {
    const { container } = render(<Header {...props} />);
    expect(container).toMatchSnapshot();
  });
});
