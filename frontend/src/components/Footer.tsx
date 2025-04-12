import { Link } from "react-router-dom";


const Footer = () => {
  return (
      //<footer className='bg-light text-center text-lg-start mt-auto'>
      <footer>
        <div className="footer-container">
          <div className="footer-section about">
            <h3>Sustema</h3>
            <p>Nossa missão é oferecer soluções inovadoras e de qualidade.</p>
          </div>
          <div className="footer-section links">
            <h3>Links Rápidos</h3>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/sobre">Sobre Nós</Link></li>
              <li><Link to="/estatisticas">Estatísticas</Link></li>
              <li><Link to="/tutoriais">Tutoriais</Link></li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h3>Contato</h3>
            <p><strong>Email:</strong> contato@exemplo.com</p>
            <p><strong>Telefone:</strong> (11) 1234-5678</p>
            <div className="social">

            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sustema. Todos os direitos reservados.</p>
        </div>
      </footer>
  );
}

export default Footer;