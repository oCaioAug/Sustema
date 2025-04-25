/**
 * Verifica se o usuário está autenticado
 * @returns boolean indicando se o usuário está autenticado
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};