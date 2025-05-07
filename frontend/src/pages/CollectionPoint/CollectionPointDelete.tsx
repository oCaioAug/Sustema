import React from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';
import './CollectionPointDelete.css'

const CollectionPointDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = () => {
    axiosInstance.delete(`/CollectionPoint/${id}`)
      .then(() => navigate('/collection-points'))
      .catch(error => console.error('Error deleting collection point:', error));
  };

  return (
  <div className="delete-container">
    <h2>
      <span className="highlight-delete">Excluir</span> Ponto de Coleta
    </h2>
    <p>Você tem certeza que deseja <span className="highlight-delete">excluir</span> este ponto de coleta?</p>
    <div className='button-container'>
    <button className="btn-delete" onClick={handleDelete}>Excluir</button>
    <button className="btn-cancel" onClick={() => navigate('/collection-points')}>Cancelar</button>
    </div>
  </div>
  );
};

export default CollectionPointDelete;