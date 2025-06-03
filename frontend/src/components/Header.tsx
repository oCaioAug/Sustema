import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Verificar se o token existe no localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    // Adicionar um listener para atualizar o estado quando o localStorage mudar
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    // Remover o token do localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Redirecionar para a página inicial
    navigate('/');
  };

  return (
    <>
      <header>
        <picture className="logoImg">
          <Link to={'/'}>
            <img src="./imgs/logo-sustema.png" alt="Sustema Logo" />
          </Link>
        </picture>
        <nav>
          <ul>
            {isAuthenticated && (
              <li>
                <Link to={'/users'} className="btn">Usuários</Link>
              </li>
            )}
            <li>
              <Link to={'/collection-points2'} className="btn">Pontos de Coleta</Link>
            </li>
            <li>
              <Link to={'/educational-content'} className="btn">Conteúdo Educacional</Link>
            </li>
            <li>
              <Link to={'/'} className="btn">Início</Link>
            </li>
            <li>
              <Link to={'/tutoriais'} className="btn">Tutoriais</Link>
            </li>
            {/* <li>
              <Link to={'/estatisticas'} className="btn">Estatísticas</Link>
            </li> */}
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={'/profile'} className="btn green">Perfil</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn red">Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to={'/login'} className="btn green">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>);
};

export default Header;