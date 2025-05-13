import React from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';
import './CollectionPointDelete.css'; 

const CollectionPointDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = () => {
    axiosInstance.delete(`/CollectionPoint/${id}`)
      .then(() => navigate('/collection-points'))
      .catch(error => console.error('Error deleting collection point:', error));
  };

  return (
    <div className="container-apagar-coleta">
      <h2 className="titulo-apagar-coleta">
        <span style={{ color: 'red' }}>Apagar</span> Ponto de Coleta
      </h2>
      <p>
        Tem certeza de que deseja apagar o ponto de coleta com ID: {id}?
      </p>

      <div className="botao-container">
        <button onClick={handleDelete} className="botao-apagar-coleta">Apagar</button>
        <button onClick={() => navigate('/collection-points')} className="botao-cancelar-coleta">Cancelar</button>
      </div>
    </div>
  );
};

export default CollectionPointDelete;