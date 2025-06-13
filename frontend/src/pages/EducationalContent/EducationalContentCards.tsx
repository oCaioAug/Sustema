import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axios-instance';
import '../styles/EducationalContent/EducationalContentCards.css';


interface EducationalContent {
  contentId: number;
  titulo: string;
  descricao: string;
  tipo: string;
  url?: string;
  imagem?: string;
  dataPublicacao?: string;
  autor?: string;
}

const EducationalContentCards = () => {
  const [contents, setContents] = useState<EducationalContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get('/EducationalContent')
      .then(({ data }) => {
        setContents(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao buscar conteúdos educacionais.');
        setLoading(false);
      });
  }, []);

  function formatarData(dataString?: string) {
    if (!dataString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
  }

  if (loading) {
    return (
      <div className="ecc-cards-container">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ecc-cards-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="ecc-container-conteudo">
      <button
        className="ecc-botao-adicionar"
        onClick={() => { window.location.href = '/educational-content/create'; }}
      >
        + adicionar
      </button>
      <div className="ecc-grade-conteudos">
        {contents.length === 0 ? (
          <div className="ecc-sem-conteudo">
            <p>Nenhum conteúdo educacional encontrado</p>
          </div>
        ) : (
          contents.map(item => (
            <div key={item.contentId} className="ecc-card-conteudo">
              <div className="ecc-categoria">{item.tipo}</div>
              <h3 className="ecc-titulo-conteudo">{item.titulo}</h3>
              {item.imagem && (
                <img src={item.imagem} alt={item.titulo} className="ecc-imagem-card" />
              )}
              <p className="ecc-descricao-conteudo">{item.descricao}</p>
              <div className="ecc-metadados">
                <span className="ecc-data">{formatarData((item as any).dataPublicacao)}</span>
                <span className="ecc-autor">{(item as any).autor}</span>
              </div>
              <button className="ecc-botao-ver-mais" onClick={() => window.location.href = `/educational-content/view/${item.contentId}`}>Ver Conteúdo</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EducationalContentCards;
