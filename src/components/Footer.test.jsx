// Footer.test.jsx
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Footer displays the current year and copyright information', () => {
  render(<Footer />);

  // Replace 'YYYY' with the expected current year
  const expectedYear = new Date().getFullYear().toString();
  const copyrightText = screen.getByText(
    `© ${expectedYear} LostHub. All rights reserved.`
  );

  expect(copyrightText).toBeInTheDocument();
});
