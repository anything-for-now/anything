import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

test('Header renders without crashing', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Check that the logo is rendered
  const logoElement = screen.getByTestId('logo');
  expect(logoElement).toBeInTheDocument();

  // Check that the "Lost" and "Found" links are rendered
  const lostLink = screen.getByTestId('lost-link');
  expect(lostLink).toBeInTheDocument();

  const foundLink = screen.getByTestId('found-link');
  expect(foundLink).toBeInTheDocument();
});
