import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5263/api/User/${id}`)
      .then(response => {
        setNome(response.data.data.nome);
        setEmail(response.data.data.email);

        console.log('resposta ---> ', response.data.data);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`http://localhost:5263/api/User/${id}`, { nome, email }) 
      .then(() => navigate('/users'))
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h1>Alterar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Atualizar</button>
      </form>
    </div>
  );
};

export default UserEdit;