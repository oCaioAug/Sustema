import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';
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
        <picture className="header-logo-img">
          <Link to={'/'}>
            <img src="./imgs/logo-sustema.png" alt="Sustema Logo" />
          </Link>
        </picture>
        <nav>
          <ul className="header-nav-list">
            {isAuthenticated && (
              <li>
                <Link to={'/users'} className="header-btn">Usuários</Link>
              </li>
            )}
            <li>
              <Link to={'/collection-points2'} className="header-btn">Pontos de Coleta</Link>
            </li>
            <li>
              <Link to={'/educational-content'} className="header-btn">Conteúdo Educacional</Link>
            </li>
            <li>
              <Link to={'/'} className="header-btn">Início</Link>
            </li>
            <li>
              <Link to={'/tutoriais'} className="header-btn">Tutoriais</Link>
            </li>
            {/* <li>
              <Link to={'/estatisticas'} className="header-btn">Estatísticas</Link>
            </li> */}
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={'/profile'} className="header-btn header-btn-green">Perfil</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="header-btn header-btn-red">Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to={'/login'} className="header-btn header-btn-green">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>);
};

export default Header;