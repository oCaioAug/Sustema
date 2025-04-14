import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carregarConteudosDoLocalStorage, salvarConteudosNoLocalStorage } from '../../api/mockDataEdu';

const EducationalContentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const contents = carregarConteudosDoLocalStorage();
    const foundContent = contents.find((c: any) => String(c.id) === id);
    setContent(foundContent);
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este conteúdo?')) {
      const contents = carregarConteudosDoLocalStorage().filter((c: any) => String(c.id) !== id);
      salvarConteudosNoLocalStorage(contents);
      alert('Conteúdo excluído com sucesso!');
      navigate('/educational-content');
    }
  };

  if (!content) {
    return <div>Conteúdo não encontrado.</div>;
  }

  return (
    <div>
      <h1>{content.titulo}</h1>
      <p><strong>Tipo:</strong> {content.tipo}</p>
      <p><strong>Descrição:</strong> {content.descricao}</p>
      <p><strong>Publicado em:</strong> {new Date(content.dataPublicacao).toLocaleDateString()}</p>
      <p><strong>Autor:</strong> {content.autor}</p>
      {content.tipo.toLowerCase() === 'vídeo' ? (
        <iframe
          title={content.titulo}
          src={content.conteudo}
          style={{ width: '100%', height: '400px' }}
          allowFullScreen
        ></iframe>
      ) : (
        <p>{content.conteudo}</p>
      )}
      <button onClick={handleDelete} className="btn btn-danger">Excluir</button>
    </div>
  );
};

export default EducationalContentDetails;