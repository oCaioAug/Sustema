import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import axiosInstance from '../helper/axios-instance'; // Importando instância do axios configurada

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      
      // Redirecionando para a página inicial após login bem-sucedido
      navigate('/');
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

            <button
              type="button"
              className="botao-voltar"
              onClick={() => navigate('/')}
            >
              Voltar
            </button>

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
              <a href="/signin">Cadastre-se</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
