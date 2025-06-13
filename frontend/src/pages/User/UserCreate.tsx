import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate } from 'react-router-dom';
import { useIsAdmin } from '../../hooks/useAuth';

const UserCreate: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfilOptions, setPerfilOptions] = useState<string[]>([]);
  const [perfil, setPerfil] = useState('');
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Se não for admin, força o perfil como Cidadão (valor 0)
    const perfilValue = isAdmin ? parseInt(perfil) : 0;

    const userData = {
      nome,
      email,
      password: senha,
      perfil: perfilValue,
    };

    console.log('Dados do usuário:', userData);
    axiosInstance.post('/User/register', userData)
      .then(() => navigate('/users'))
      .catch(error => console.error('Error creating user:', error));
  };

  useEffect(() => {
    axiosInstance.get('/User/perfil-usuarios')
      .then(response => {
        let availableProfiles = response.data;
        
        // Se não for admin, mostrar apenas opção "Cidadão"
        if (!isAdmin) {
          availableProfiles = ['Cidadao']; // Apenas perfil de cidadão
          setPerfil('0'); // Define automaticamente como Cidadão
        }
        
        setPerfilOptions(availableProfiles);
      })
      .catch(error => {
        console.error('Error fetching perfil usuarios:', error);
        // Fallback: se não conseguir buscar perfis e não for admin, define como Cidadão
        if (!isAdmin) {
          setPerfilOptions(['Cidadao']);
          setPerfil('0');
        }
      });
  }, [isAdmin]);
    
  return (
    <div>
      <h1>Criar Usuário</h1>
      {!isAdmin && (
        <div className="alert alert-info mb-3">
          <strong>Nota:</strong> Novos usuários são cadastrados automaticamente como Cidadão.
        </div>
      )}
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

        {isAdmin && (
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
        )}

        {!isAdmin && (
          <div className="mb-3">
            <label className="form-label">Perfil</label>
            <input
              type="text"
              className="form-control"
              value="Cidadão"
              disabled
              style={{ backgroundColor: '#f8f9fa' }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">Criar</button>
      </form>
    </div>
  );
};

export default UserCreate;