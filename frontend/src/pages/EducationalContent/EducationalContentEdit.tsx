import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';

const EducationalContentEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('');
  const [contentTypeOptions, setContentTypeOptions] = useState<string[]>([]);
  const [publicationDate, setPublicationDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/EducationalContent/tipos')
      .then(response => setContentTypeOptions(response.data))
      .catch(error => console.error('Error fetching content types:', error));

    axiosInstance.get(`/EducationalContent/${id}`)
      .then(response => {
        setTitle(response.data.data.titulo);
        setDescription(response.data.data.descricao);
        setContentType(response.data.data.tipo);
        setPublicationDate(response.data.data.dataPublicacao);
        console.log('resposta2 ---> ', response.data.data.descricao);
        console.log('resposta ---> ', response.data.data);
      })
      .catch(error => console.error('Error fetching educational content:', error));
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const contentData = {
      Titulo: title,
      Descricao: description,
      Tipo: parseInt(contentType),
      DataPublicacao: publicationDate || null,
    };

    axiosInstance.put(`/EducationalContent/${id}`, contentData)
      .then(() => navigate('/educational-content'))
      .catch(error => console.error('Error updating educational content:', error));
  };

  return (
    <>
      <h1>Alterar Conteúdo Educacional</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select
            className="form-control"
            value={contentType}
            onChange={(event) => setContentType(event.target.value)}
            required
          >
            <option value="">Selecione um tipo</option>
            {contentTypeOptions.map((type, index) => (
              <option key={index} value={index}>{type}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </>
  );
};

export default EducationalContentEdit;