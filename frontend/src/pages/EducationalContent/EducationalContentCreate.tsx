import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate } from 'react-router-dom';

const EducationalContentCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('');
  const [contentTypeOptions, setContentTypeOptions] = useState<string[]>([]);
  const [publicationDate, setPublicationDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/EducationalContent/tipos')
      .then(response => { setContentTypeOptions(response.data);  })
      .catch(error => console.error('Error fetching content types:', error));
  }, [0]);

  console.log(contentTypeOptions);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const contentData = {
      Titulo: title,
      Descricao: description,
      Tipo: parseInt(contentType), // Envia o valor correto do tipo como string
      DataPublicacao: publicationDate,
    };

    console.log('Dados do conteúdo educacional:', contentData);

    axiosInstance.post('/EducationalContent', contentData)
      .then(() => navigate('/educational-content'))
      .catch(error => console.error('Error creating educational content:', error));
  };

  return (
    <div>
      <h1>Criar Conteúdo Educacional</h1>
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
        <div className="mb-3">
          <label className="form-label">Data de Publicação</label>
          <input
            type="date"
            className="form-control"
            value={publicationDate}
            onChange={(event) => setPublicationDate(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Criar</button>
      </form>
    </div>
  );
};

export default EducationalContentCreate;