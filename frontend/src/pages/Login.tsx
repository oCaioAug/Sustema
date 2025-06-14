import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style.css';
import axiosInstance from '../helper/axios-instance'; // Importando instância do axios configurada

interface LocationState {
  from?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Obtém a rota de onde o usuário veio (se disponível)
  const { from } = (location.state as LocationState) || { from: '/' };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Chamando a rota de login do backend conforme definido no UserController.cs
      const response = await axiosInstance.post('/User/login', {
        Email: email,
        Password: password
      });

      // Armazenando o token JWT recebido no localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirecionando para a página que o usuário tentou acessar
      // ou para a página inicial se ele veio direto para o login
      navigate(from || '/');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      
      if (error.response) {
        // Tratando erros específicos retornados pela API
        if (error.response.status === 401) {
          setError('Email ou senha inválidos.');
        } else {
          setError(error.response.data.error || 'Erro ao fazer login. Tente novamente.');
        }
      } else {
        setError('Erro ao conectar ao servidor. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div id="login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            {/* <button
              type="button"
              className="botao-voltar"
              onClick={() => navigate('/')}
            >
              Voltar
            </button> */}

            {from && from !== '/' && (
              <div className="info-message" style={{ color: 'blue', marginBottom: '15px' }}>
                Você precisa fazer login para acessar essa página.
              </div>
            )}

            {error && (
              <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
                {error}
              </div>
            )}

            <p>
              <label htmlFor="email_login">E-mail</label>
              <input 
                id="email_login" 
                name="email_login" 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>

            <p>
              <label htmlFor="password_login">Senha</label>
              <input 
                id="password_login" 
                name="password_login" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>

            <p>
              <input 
                type="submit" 
                value={loading ? "Entrando..." : "Entrar"} 
                className="botao-verde" 
                disabled={loading}
              />
            </p>

            <p className="link">
              Ainda não tem conta?{' '}
              <a href="/users/create">Cadastre-se</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
