import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const props = {
    euCovidData: {},
    lastUpdate: '23 May 2020',
  };

  test('renders the App component correctly', () => {
    const { container } = render(<App {...props} />);
    expect(container).toMatchSnapshot();
  });
});
