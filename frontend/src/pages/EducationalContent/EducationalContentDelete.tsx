import React from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';

const EducationalContentDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = () => {
    axiosInstance.delete(`/EducationalContent/${id}`)
      .then(() => navigate('/educational-content'))
      .catch(error => console.error('Error deleting educational content:', error));
  };

  return (
    <div>
      <h1>Apagar Conteúdo Educacional</h1>
      <p>Tem certeza de que deseja apagar o conteúdo educacional com ID: {id}?</p>
      <button onClick={handleDelete} className="btn btn-danger">Apagar</button>
      <button onClick={() => navigate('/educational-content')} className="btn btn-secondary ms-2">Cancelar</button>
    </div>
  );
};

export default EducationalContentDelete;