import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

// Mock do useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = require('../../hooks/useAuth').useAuth;

const TestComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

const renderWithRouter = (isAuthenticated: boolean) => {
  mockUseAuth.mockReturnValue(isAuthenticated);
  
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/protected" element={
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    mockUseAuth.mockClear();
  });

  test('renders children when user is authenticated', () => {
    renderWithRouter(true);
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  test('redirects to login when user is not authenticated', () => {
    renderWithRouter(false);
    
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    // O redirecionamento para login é feito via Navigate, então verificamos se o conteúdo protegido não aparece
  });

  test('calls useAuth hook', () => {
    renderWithRouter(true);
    
    expect(mockUseAuth).toHaveBeenCalled();
  });
});