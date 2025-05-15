import React from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EducationalContent/EducationalContentDelete.css'; 

const CollectionPointDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = () => {
    axiosInstance.delete(`/EducationalContent/${id}`)
    .then(() => navigate('/educational-content'))
      .catch(error => console.error('Error deleting Educational Content: ', error));
  };

  return (
    <div className="container-apagar-coleta">
      <h2 className="titulo-apagar-coleta">
        <span style={{ color: 'red' }}>Apagar</span> Conteudo Educacional
      </h2>
      <p>
        Tem certeza de que deseja apagar o conteudo educacional com ID: {id}?
      </p>

      <div className="botao-container">
        <button onClick={handleDelete} className="botao-apagar-coleta">Apagar</button>
        <button onClick={() => navigate('/educational-content')} className="botao-cancelar-coleta">Cancelar</button>
      </div>
    </div>
  );
};

export default CollectionPointDelete;