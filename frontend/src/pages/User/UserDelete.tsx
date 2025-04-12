import React from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';

const UserDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = () => {
    axiosInstance.delete(`/User/${id}`)
      .then(() => navigate('/users'))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h1>Apagar Usuário</h1>
      <p>Tem certeza de que deseja apagar o usuário com ID: {id}?</p>
      <button onClick={handleDelete} className="btn btn-danger">Apagar</button>
      <button onClick={() => navigate('/users')} className="btn btn-secondary ms-2">Cancelar</button>
    </div>
  );
};

export default UserDelete;