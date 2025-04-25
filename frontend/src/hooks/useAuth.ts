import { useEffect, useState } from 'react';

/**
 * Hook para verificar se o usuário está autenticado
 * @returns boolean indicando se o usuário está autenticado
 */
export const useAuth = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Verifica se existe um token no localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  
  return isAuthenticated;
};