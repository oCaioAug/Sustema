import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import UserEdit from './UserEdit';
import axios from 'axios';

// Mock do axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock do useNavigate e useParams
const mockNavigate = jest.fn();
const mockParams = { id: '1' };
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => mockParams,
}));

const renderWithRouter = (component: React.ReactElement, route = '/users/edit/1') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {component}
    </MemoryRouter>
  );
};

const mockUserData = {
  data: {
    data: {
      nome: 'João Silva',
      email: 'joao@exemplo.com'
    }
  }
};

describe('UserEdit Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
    mockedAxios.put.mockClear();
    mockNavigate.mockClear();
  });

  test('loads and displays user data', async () => {
    mockedAxios.get.mockResolvedValue(mockUserData);
    
    renderWithRouter(<UserEdit />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
      expect(screen.getByDisplayValue('joao@exemplo.com')).toBeInTheDocument();
    });
    
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5263/api/User/1');
  });

  test('handles form submission successfully', async () => {
    mockedAxios.get.mockResolvedValue(mockUserData);
    mockedAxios.put.mockResolvedValue({});
    
    renderWithRouter(<UserEdit />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
    });
    
    const submitButton = screen.getByRole('button', { name: /atualizar/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledWith(
        'http://localhost:5263/api/User/1',
        { nome: 'João Silva', email: 'joao@exemplo.com' }
      );
      expect(mockNavigate).toHaveBeenCalledWith('/users');
    });
  });

  test('handles input changes', async () => {
    mockedAxios.get.mockResolvedValue(mockUserData);
    
    renderWithRouter(<UserEdit />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
    });
    
    const nameInput = screen.getByDisplayValue('João Silva');
    fireEvent.change(nameInput, { target: { value: 'João Santos' } });
    
    expect(screen.getByDisplayValue('João Santos')).toBeInTheDocument();
  });

  test('handles API error on load', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockedAxios.get.mockRejectedValue(new Error('API Error'));
    
    renderWithRouter(<UserEdit />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching user:', expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });

  test('handles API error on update', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockedAxios.get.mockResolvedValue(mockUserData);
    mockedAxios.put.mockRejectedValue(new Error('Update Error'));
    
    renderWithRouter(<UserEdit />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
    });
    
    const submitButton = screen.getByRole('button', { name: /atualizar/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error updating user:', expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });
});