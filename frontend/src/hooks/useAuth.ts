import { useState, useEffect } from 'react';

/**
 * Hook para verificar se o usuário está autenticado
 * @returns {boolean} - true se o usuário estiver autenticado, false caso contrário
 */
export function useAuth(): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Verifica se existe um token no localStorage
    const token = localStorage.getItem('token');
    
    // Se o token existir, considera o usuário como autenticado
    setIsAuthenticated(!!token);
    
    // Adicionar event listener para detectar mudanças no localStorage (login/logout)
    const handleStorageChange = () => {
      const currentToken = localStorage.getItem('token');
      setIsAuthenticated(!!currentToken);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Também verifica a cada vez que o componente é montado
    handleStorageChange();
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return isAuthenticated;
}