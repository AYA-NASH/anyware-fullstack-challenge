import { render, screen, fireEvent } from '@testing-library/react';
import WelcomePage from './WelcomePage';
import { BrowserRouter as Router } from 'react-router-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('WelcomePage', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
    localStorage.clear();
  });

  test('renders the Welcome! heading', () => {
    render(
      <Router>
        <WelcomePage />
      </Router>
    );
    const headingElement = screen.getByRole('heading', { name: /welcome!/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the Sign In button', () => {
    render(
      <Router>
        <WelcomePage />
      </Router>
    );
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });

  test('handles Sign In button click: dispatches login, sets localStorage, starts logout timer, and navigates', () => {
    render(
      <Router>
        <WelcomePage />
      </Router>
    );
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem('auth')).toBe('true');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});