import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adicionarConteudo } from '../../api/mockDataEdu';

const EducationalContentCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newContent = {
      titulo: title,
      descricao: description,
      tipo: type,
      conteudo: content,
      dataPublicacao: new Date().toISOString().split('T')[0],
      autor: 'Admin',
      imagem: image ? await toBase64(image) : '',
    };

    await adicionarConteudo(newContent);
    navigate('/educational-content');
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
    <div>
      <h1>Criar Conteúdo Educacional</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Selecione um tipo</option>
            <option value="Artigo">Artigo</option>
            <option value="Vídeo">Vídeo</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Conteúdo</label>
          {type === 'Artigo' ? (
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          ) : (
            <input
              type="url"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Imagem</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Criar</button>
      </form>
    </div>
  );
};

export default EducationalContentCreate;