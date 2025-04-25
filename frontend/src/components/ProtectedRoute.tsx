import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useAuth();
  
  if (!isAuthenticated) {
    // Redireciona para a página de login se não estiver autenticado
    // Salva a URL atual para redirecionar de volta após o login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Se estiver autenticado, renderiza o componente filho ou o Outlet para rotas aninhadas
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;