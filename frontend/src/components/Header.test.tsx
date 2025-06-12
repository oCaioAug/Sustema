import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

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

describe('Header Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.removeItem.mockClear();
    mockNavigate.mockClear();
  });

  test('renders logo and navigation links', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    renderWithRouter(<Header />);
    
    // Verifica se o logo está presente
    expect(screen.getByAltText('Sustema Logo')).toBeInTheDocument();
    // Verifica se os links de navegação estão presentes
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Estatísticas')).toBeInTheDocument();
    expect(screen.getByText('Tutoriais')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo Educacional')).toBeInTheDocument();
    expect(screen.getByText('Pontos de Coleta')).toBeInTheDocument();
  });

  test('shows login button when not authenticated', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    expect(screen.queryByText('Perfil')).not.toBeInTheDocument();
  });

  test('shows user menu when authenticated', () => {
    localStorageMock.getItem.mockReturnValue('fake-token');
    
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  test('handles logout correctly', () => {
    localStorageMock.getItem.mockReturnValue('fake-token');
    
    renderWithRouter(<Header />);
    
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('renders correct navigation links with proper hrefs', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Início').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Estatísticas').closest('a')).toHaveAttribute('href', '/estatisticas');
    expect(screen.getByText('Tutoriais').closest('a')).toHaveAttribute('href', '/tutoriais');
    expect(screen.getByText('Login').closest('a')).toHaveAttribute('href', '/login');
  });

  test('renders logo link correctly', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    renderWithRouter(<Header />);
    
    const logoLink = screen.getByAltText('Sustema Logo').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});