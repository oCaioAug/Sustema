import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Mock do useAuth hook
jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = require('../hooks/useAuth').useAuth;

const TestComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

const renderWithRouter = (isAuthenticated: boolean, initialRoute = '/protected') => {
  mockUseAuth.mockReturnValue(isAuthenticated);
  
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/protected" element={
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        } />
      </Routes>
    </MemoryRouter>
  );
};

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    mockUseAuth.mockClear();
  });

  test('renders children when user is authenticated', async () => {
    renderWithRouter(true);
    
    // Aguarda o delay de verificação do componente
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  test('redirects to login when user is not authenticated', async () => {
    renderWithRouter(false);
    
    // Aguarda o redirecionamento
    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  test('calls useAuth hook', async () => {
    renderWithRouter(true);
    
    // Aguarda a verificação
    await waitFor(() => {
      expect(mockUseAuth).toHaveBeenCalled();
    });
  });

  test('shows nothing during checking phase', () => {
    renderWithRouter(true);
    
    // Durante a fase de verificação (primeiros 100ms), não deve mostrar nada
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});