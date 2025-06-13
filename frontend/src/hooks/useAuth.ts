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

/**
 * Hook para verificar se o usuário é administrador
 * @returns {boolean} - true se o usuário for Admin, false caso contrário
 */
export function useIsAdmin(): boolean {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAdmin(false);
          return;
        }

        // Decodifica o JWT token para extrair o perfil
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Verifica se o perfil é Admin (assumindo que Admin = 0 ou "Admin")
        const userRole = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role;
        setIsAdmin(userRole === '0' || userRole === 'Admin' || userRole === 0);
        
      } catch (error) {
        console.error('Erro ao verificar perfil de admin:', error);
        setIsAdmin(false);
      }
    };

    // Verifica inicialmente
    checkAdminStatus();
    
    // Adiciona listener para mudanças no localStorage
    const handleStorageChange = () => {
      checkAdminStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return isAdmin;
}