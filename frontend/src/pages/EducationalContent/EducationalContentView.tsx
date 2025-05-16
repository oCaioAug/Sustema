import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useParams, useNavigate } from 'react-router-dom';
import '../../style.css';

const EducationalContentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [article, setArticle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get(`/EducationalContent/${id}`)
      .then(response => {
        const data = response.data;
        setTitle(data.titulo);
        setDescription(data.descricao);
        setType(data.tipo);
        setUrl(data.url ?? '');
        setArticle(data.textoArtigo ?? '');
        setImageUrl(data.imagem ?? '');
        setPublicationDate(data.dataPublicacao ? new Date(data.dataPublicacao).toLocaleDateString() : '');
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar o conteúdo educacional.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="content-view-container"><p>Carregando...</p></div>;
  if (error) return <div className="content-view-container"><p>{error}</p></div>;

  return (
    <div className="content-view-container">
      <div className="content-view-card">
        <h1>{title}</h1>
        <p className="content-description">{description}</p>
        <p className="content-type"><b>Tipo:</b> {type}</p>
        {publicationDate && <p className="content-date"><b>Publicado em:</b> {publicationDate}</p>}

        {type === 'Artigo' && article && (
          <div className="content-article">
            <h2>Artigo</h2>
            <p>{article}</p>
          </div>
        )}
        {type === 'Imagem' && imageUrl && (
          <div className="content-image">
            <img src={imageUrl} alt="Imagem de capa" className="content-cover" />
          </div>
        )}
        {type === 'Video' && url && (
          <div className="content-video">
            <h2>Vídeo</h2>
            <iframe
              width="100%"
              height="400"
              src={url}
              title="Vídeo"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
        {type === 'Infografico' && imageUrl && (
          <div className="content-infographic">
            <h2>Infográfico</h2>
            <img src={imageUrl} alt="Infográfico" className="content-cover" />
          </div>
        )}

        <button className="botao-verde" onClick={() => navigate('/educational-content')}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default EducationalContentView;
