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
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Novo Conteúdo Educacional</h4>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Título</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Descrição</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Tipo</label>
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
              <label className="form-label fw-bold">
                {type === 'Artigo' ? 'Conteúdo do Artigo' : 'URL do Vídeo'}
              </label>
              {type === 'Artigo' ? (
                <textarea
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  required
                />
              ) : (
                <input
                  type="url"
                  className="form-control"
                  placeholder="Ex: https://www.youtube.com/watch?v=..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required={type === 'Vídeo'}
                />
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Imagem de Capa</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              />
              <small className="text-muted">Opcional. Imagem para ilustrar o conteúdo.</small>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button 
                type="button" 
                className="btn btn-secondary me-md-2" 
                onClick={() => navigate('/educational-content')}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-success" 
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Conteúdo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationalContentCreate;