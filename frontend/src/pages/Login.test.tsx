import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import axiosInstance from '../helper/axios-instance';

// Mock do axios-instance
jest.mock('../helper/axios-instance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

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
    
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/entrar/i)).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    const mockResponse = {
      data: {
        token: 'fake-token'
      }
    };
    
    mockedAxios.post.mockResolvedValue(mockResponse);
    
    renderWithRouter(<Login />);
    
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByDisplayValue(/entrar/i);
    
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
        status: 401,
        data: {
          error: 'Invalid credentials'
        }
      }
    };
    
    mockedAxios.post.mockRejectedValue(mockError);
    
    renderWithRouter(<Login />);
    
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByDisplayValue(/entrar/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/email ou senha inválidos/i)).toBeInTheDocument();
    });
  });

  test('handles network error', async () => {
    const mockError = new Error('Network Error');
    
    mockedAxios.post.mockRejectedValue(mockError);
    
    renderWithRouter(<Login />);
    
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByDisplayValue(/entrar/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao conectar ao servidor/i)).toBeInTheDocument();
    });
  });

  test('renders registration link', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByText(/ainda não tem conta/i)).toBeInTheDocument();
    expect(screen.getByText(/cadastre-se/i)).toBeInTheDocument();
  });
});