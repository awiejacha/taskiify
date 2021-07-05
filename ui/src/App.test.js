import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tasks table caption on main screen', () => {
  render(<App />);
  const captionElement = screen.getByText(/Tasks/i);
  expect(captionElement).toBeInTheDocument();
});
