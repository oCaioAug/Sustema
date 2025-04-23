import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css'; // caminho relativo ao CSS

const Login = () => {
  const navigate = useNavigate(); // para navegação programática

  const handleSubmit = (e) => {
    e.preventDefault(); // impede o reload da página
    // Aqui você trataria a autenticação e redirecionamento
    navigate('/index'); // simula redirecionamento após login
  };

  return (
    <div className="container">
      <div className="content">
        <div id="login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <button
              type="button"
              className="botao-voltar"
              onClick={() => navigate('/')}
            >
              Voltar
            </button>

            <p>
              <label htmlFor="email_login">E-mail</label>
              <input id="email_login" name="email_login" required type="email" />
            </p>

            <p>
              <label htmlFor="nome_login">Senha</label>
              <input id="nome_login" name="nome_login" required type="password" />
            </p>

            <p>
              <input type="checkbox" name="manterlogado" id="manterlogado" />
              <label htmlFor="manterlogado">Manter-me logado</label>
            </p>

            <p>
              <input type="submit" value="Entrar" className="botao-verde" />
            </p>

            <p className="link">
              Ainda não tem conta?{' '}
              <a href="/sing-in">Cadastre-se</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
