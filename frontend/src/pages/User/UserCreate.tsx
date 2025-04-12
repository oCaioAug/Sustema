import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate } from 'react-router-dom';

const UserCreate: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfilOptions, setPerfilOptions] = useState<string[]>([]); // Array de opções de perfil
  const [perfil, setPerfil] = useState(''); // Perfil selecionado
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      nome,
      email,
      password: senha,
      perfil: parseInt(perfil), // Adiciona o perfil ao objeto de dados do usuário
    };

    console.log('Dados do usuário:', userData); // Log dos dados do usuário
    axiosInstance.post('/User/register', userData)
      .then(() => navigate('/users'))
      .catch(error => console.error('Error creating user:', error));
  };

  useEffect(() => {
    axiosInstance.get('/User/perfil-usuarios')
      .then(response => {
        setPerfilOptions(response.data); // Mapeia a resposta para o array de opções

      })
      .catch(error => {
        console.error('Error fetching perfil usuarios:', error);
      });
    }, []); // Adicionado array de dependências vazio para evitar chamadas infinitas
    
  return (
    <div>
      <h1>Criar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Perfil</label>
          <select
            className="form-control"
            value={perfil}
            onChange={(event) => setPerfil(event.target.value)}
            required
          >
            <option value="">Selecione um perfil</option>
            {perfilOptions.map((option, index) => (
              <option key={index} value={index}>{option}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Criar</button>
      </form>
    </div>
  );
};

export default UserCreate;