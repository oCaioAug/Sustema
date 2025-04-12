import { Link } from 'react-router-dom';

const Header = () => {
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
            <li>
              <Link to={'/users'} className="btn">Usuários</Link>
            </li>
            <li>
              <Link to={'/collection-points'} className="btn">Pontos de Coleta</Link>
            </li>
            <li>
              <Link to={'/educational-content'} className="btn">Conteúdo Educacional</Link>
            </li>
            <li>
              {/* <button className="btn" onClick={() => window.location.href='index.html'}>
                Início
              </button> */}
              <Link to={'/'} className="btn">Início</Link>
            </li>
            <li>
              {/* <button className="btn" onClick={() => window.location.href='tutorials.html'}>
                Conscientização
              </button> */}
              <Link to={'/tutoriais'} className="btn">Tutorials</Link>
            </li>
            <li>
              {/* <button className="btn" onClick={() => window.location.href='estatisticas.html'}>
                Estatísticas
              </button> */}
              <Link to={'/estatisticas'} className="btn">Estatísticas</Link>
            </li>
            <li>
              <Link to={'/profile'} className="btn green">Perfil</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>);
};

export default Header;