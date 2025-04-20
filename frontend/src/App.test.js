import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders navbar with correct links', () => {
  render(<App />);

  // Check if the Navbar is rendered correctly
  const uploadLink = screen.getByText(/upload/i);
  const downloadLink = screen.getByText(/download/i);

  expect(uploadLink).toBeInTheDocument();
  expect(downloadLink).toBeInTheDocument();
});

test('navigates to the Upload Page when the Upload link is clicked', () => {
  render(<App />);

  const uploadLink = screen.getByText(/upload/i);
  fireEvent.click(uploadLink);

  // Check that the Upload page is rendered (by checking for Upload Page heading or something specific in the page)
  const uploadPageHeader = screen.getByText(/upload a file/i); // You can change this to any text that's unique to the Upload page
  expect(uploadPageHeader).toBeInTheDocument();
});

test('navigates to the Download Page when the Download link is clicked', () => {
  render(<App />);

  const downloadLink = screen.getByText(/download/i);
  fireEvent.click(downloadLink);

  // Check that the Download page is rendered (by checking for Download Page heading or something specific in the page)
  const downloadPageHeader = screen.getByText(/download your files/i); // You can change this to any text that's unique to the Download page
  expect(downloadPageHeader).toBeInTheDocument();
});
