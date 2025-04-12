import React from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';

const CollectionPointDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = () => {
    axiosInstance.delete(`/CollectionPoint/${id}`)
      .then(() => navigate('/collection-points'))
      .catch(error => console.error('Error deleting collection point:', error));
  };

  return (
    <div>
      <h1>Apagar Ponto de Coleta</h1>
      <p>Tem certeza de que deseja apagar o ponto de coleta com ID: {id}?</p>
      <button onClick={handleDelete} className="btn btn-danger">Apagar</button>
      <button onClick={() => navigate('/collection-points')} className="btn btn-secondary ms-2">Cancelar</button>
    </div>
  );
};

export default CollectionPointDelete;