import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helper/axios-instance';
import '../styles/EducationalContent/EducationalContentCreate.css';
import { url } from 'inspector';

const EducationalContentCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'Artigo' | 'Vídeo' | ''>('');
  const [videoUrl, setVideoUrl] = useState('');
  const [content, setContent] = useState(''); // Substitui o editor por um estado simples
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Enviar string diretamente em vez de mapear para número
      const tipoString = type === 'Vídeo' ? 'Video' : type; // Converter 'Vídeo' para 'Video'

      const payload = {
        Titulo: title,
        Descricao: description,
        Tipo: tipoString,
        URL: type === 'Vídeo' ? videoUrl : null,
        TextoArtigo: type === 'Artigo' ? content : null,
        DataPublicacao: new Date().toISOString(),
      };

      console.log('Payload:', payload);
      
      await axiosInstance.post('/EducationalContent', payload);
      navigate('/educational-content');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ecc-card">
      <form className="ecc-form" onSubmit={handleSubmit}>
        {/* === esquerda: imagem === */}
        <div className="ecc-left">
          <label htmlFor="cover-upload" className="ecc-dropzone">
            {image
              ? <img src={URL.createObjectURL(image)} className="ecc-thumb" alt="Capa" />
              : <span className="ecc-drop-text">
                  insira ou arraste aqui<br/>imagem capa
                </span>
            }
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              className="ecc-file-input"
              onChange={e => setImage(e.target.files?.[0] ?? null)}
            />
          </label>
          <label htmlFor="cover-upload" className="ecc-file-btn">
            arquivo
          </label>
        </div>

        {/* === direita: campos === */}
        <div className="ecc-right">
          <div className="ecc-field">
            <label htmlFor="description">descrição</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="ecc-field">
            <label htmlFor="type">tipo</label>
            <div className="ecc-select-wrapper">
              <select
                id="type"
                value={type}
                onChange={e => setType(e.target.value as any)}
                required
              >
                <option value="">Selecione</option>
                <option value="Artigo">Artigo</option>
                <option value="Vídeo">Vídeo</option>
              </select>
              <span className="ecc-arrow">▾</span>
            </div>
          </div>

          <div className="ecc-field">
            <label htmlFor="content">
              {type === 'Artigo' ? 'conteúdo do artigo' : 'URL do vídeo'}
            </label>
            {type === 'Artigo' ? (
              <textarea
                id="content"
                className="ecc-textarea"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                rows={8}
              />
            ) : (
              <input
                id="content"
                type="url"
                placeholder="https://..."
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                required={type === 'Vídeo'}
              />
            )}
          </div>

          <div className="ecc-field">
            <label htmlFor="title">titulo</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="ecc-actions">
            <button
              type="submit"
              className="ecc-btn ecc-btn-save"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'salvar'}
            </button>
            <button
              type="button"
              className="ecc-btn ecc-btn-cancel"
              onClick={() => navigate('/educational-content')}
            >
              cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EducationalContentCreate;