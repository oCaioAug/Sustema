import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EducationalContent/EducationalContentView.css';

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

  const getEmbeddedVideoUrl = (originalUrl: string): string => {
    // Suporte para YouTube
    const youtubeMatch = originalUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^\s&?]+)/);
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    // Se não for YouTube, retornar o próprio link como fallback (pode não funcionar com todos players)
    return originalUrl;
  };

  return (
    <div className="content-view-container">
      <div className="titulo-container">
        <h1>{title}</h1>
      </div>
      <p><strong>Data de Publicação:</strong> {publicationDate}</p>

      {imageUrl && type !== 'Video' && (
        <img src={imageUrl} alt={title} className="content-image" />
      )}

      <p>{description}</p>

      {type === 'Video' && url && (
        <div className="video-container">
          <iframe
            src={getEmbeddedVideoUrl(url)}
            title="Vídeo Educacional"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {type === 'Artigo' && article && (
        <div className="article-container">
          <p>{article}</p>
        </div>
      )}

      {type === 'Link' && url && (
        <div>
          <h2>Link Externo</h2>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </div>
      )}

      <div className="button-container">
        <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
      </div>
    </div>
  );
};

export default EducationalContentView;
