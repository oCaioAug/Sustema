import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useAuth();
  const [checking, setChecking] = useState(true);

  // Adicionamos um pequeno delay para garantir que o localStorage seja checado
  useEffect(() => {
    const checkAuth = setTimeout(() => {
      setChecking(false);
    }, 100);
    
    return () => clearTimeout(checkAuth);
  }, []);
  
  // Enquanto verifica, não mostra nada
  if (checking) {
    return null;
  }
  
  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    // Salva a URL atual para redirecionar de volta após o login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Se estiver autenticado, renderiza o componente filho ou o Outlet para rotas aninhadas
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;