import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('renders the Footer component correctly', () => {
    render(<Footer />);
    expect(screen.queryByText('Jonur')).toBeInTheDocument();
  });
});
