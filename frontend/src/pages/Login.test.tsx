import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// Mock the axios-instance before any imports that might use it
jest.mock('../helper/axios-instance', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }
}));

// Mock do axios
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    mockedAxios.post.mockClear();
    mockNavigate.mockClear();
    localStorageMock.setItem.mockClear();
  });

  test('renders login form correctly', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    const mockResponse = {
      data: {
        success: true,
        token: 'fake-token',
        user: { id: 1, email: 'test@example.com' }
      }
    };
    
    mockedAxios.post.mockResolvedValue(mockResponse);
    
    renderWithRouter(<Login />);
    
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'fake-token');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('handles login failure', async () => {
    const mockError = {
      response: {
        data: {
          success: false,
          message: 'Invalid credentials'
        }
      }
    };
    
    mockedAxios.post.mockRejectedValue(mockError);
    
    renderWithRouter(<Login />);
    
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('renders registration link', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByText(/não tem uma conta/i)).toBeInTheDocument();
    expect(screen.getByText(/registre-se/i)).toBeInTheDocument();
  });
});