// src/pages/Cadastro.tsx
import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom'; // Se estiver usando React Router
import '../styles/style.css';

const Cadastro: React.FC = () => {
  // 1. Estados para cada campo
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  // 2. Função de submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sua-api.com/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }
      const data = await response.json();
      console.log('Usuário cadastrado:', data);
      // redirecionar para login ou outra página:
      // history.push('/login')  // se usar React Router v5
      // navigate('/login')      // se usar useNavigate (v6)
      window.location.href = '/login'; // fallback simples
    } catch (err) {
      console.error(err);
      alert('Não foi possível concluir o cadastro.');
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div id="cadastro">
          <form onSubmit={handleSubmit}>
            <h1>Cadastro</h1>

            <p>
              <label htmlFor="nome_cad">Nome</label>
              <input
                id="nome_cad"
                name="nome_cad"
                required
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </p>

            <p>
              <label htmlFor="email_cad">E-mail</label>
              <input
                id="email_cad"
                name="email_cad"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>

            <p>
              <label htmlFor="senha_cad">Senha</label>
              <input
                id="senha_cad"
                name="senha_cad"
                required
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </p>

            <p>
              <button type="submit" className="botao-verde">
                Cadastrar
              </button>
            </p>

            <p className="link">
              Já tem conta?{' '}
              {/*
                Se usar React Router:
                <Link to="/login">Entrar</Link>
              */}
              <a href="/login">Entrar</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
