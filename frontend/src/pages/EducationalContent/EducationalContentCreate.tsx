import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helper/axios-instance';

const EducationalContentCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert type string to numeric enum value if needed
      const tipoNumeric = type === 'Artigo' ? 0 : type === 'Vídeo' ? 1 : 0;

      const newContent = {
        Titulo: title,
        Descricao: description,
        Tipo: tipoNumeric, // Assuming the API expects a number for the type
        // URL: type === 'Vídeo' ? content : null, // URL only for video type
        Conteudo: type == 'Artigo' ? 0 : 1, // Content text only for article type
        DataPublicacao: new Date().toISOString() // ISO format for backend datetime
      };

      // Use axiosInstance to call the API
      const response = await axiosInstance.post('/EducationalContent', newContent);
      console.log('Conteúdo educacional criado com sucesso:', response.data);
      navigate('/educational-content');
    } catch (error) {
      console.error('Erro ao criar conteúdo educacional:', error);
      alert('Erro ao criar conteúdo educacional. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="educational-content-create-layout">
      <div className="cover-section">
        <div className="cover-image-preview">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Capa" className="cover-image" />
          ) : (
            <span className="cover-placeholder">capa</span>
          )}
        </div>
        <div className="cover-file-input">
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
            id="cover-upload"
          />
          <label htmlFor="cover-upload" className="cover-upload-label">
            (arquivo da capa)
          </label>
        </div>
      </div>
      <form className="content-section" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="field-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="field-group">
          <label htmlFor="type">Tipo</label>
          <select
            id="type"
            value={type}
            onChange={e => setType(e.target.value)}
            required
          >
            <option value="">Selecione um tipo</option>
            <option value="Artigo">Artigo</option>
            <option value="Vídeo">Vídeo</option>
          </select>
        </div>
        <div className="field-group">
          <label htmlFor="content">{type === 'Artigo' ? 'Conteúdo do Artigo' : 'URL do Vídeo'}</label>
          {type === 'Artigo' ? (
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={5}
              required
            />
          ) : (
            <input
              id="content"
              type="url"
              placeholder="Ex: https://www.youtube.com/watch?v=..."
              value={content}
              onChange={e => setContent(e.target.value)}
              required={type === 'Vídeo'}
            />
          )}
        </div>
        <div className="actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/educational-content')}>Cancelar</button>
          <button type="submit" className="btn-save" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Conteúdo'}</button>
        </div>
      </form>
    </div>
  );
};

export default EducationalContentCreate;