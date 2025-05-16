import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../helper/axios-instance';
import '../styles/EducationalContent/EducationalContentCards.css';


interface EducationalContent {
  contentId: number;
  titulo: string;
  descricao: string;
  tipo: string;
  url?: string;
  imagem?: string;
}

const EducationalContentCards: React.FC = () => {
  const [contents, setContents] = useState<EducationalContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get('/EducationalContent')
      .then(({ data }) => {
        setContents(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erro ao buscar conteúdos educacionais.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="cards-container">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cards-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="cards-container">
      {contents.length === 0 ? (
        <p>Nenhum conteúdo encontrado.</p>
      ) : (
        contents.map(item => (
          <div key={item.contentId} className="card">
            {item.imagem && (
              <img src={item.imagem} alt={item.titulo} className="card-image" />
            )}
            <div className="card-body">
              <h3 className="card-title">{item.titulo}</h3>
              <p className="card-description">{item.descricao}</p>
              <p className="card-type">Tipo: {item.tipo}</p>
              <Link to={`/educational-content/view/${item.contentId}`} className="card-button">
                Ver Mais
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EducationalContentCards;
