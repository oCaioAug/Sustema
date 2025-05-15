import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../helper/axios-instance';
import '../styles/EducationalContent/EducationalContentCreate.css';

const EducationalContentEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'Artigo' | 'Vídeo' | ''>('');
  const [videoUrl, setVideoUrl] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Carrega dados existentes
  useEffect(() => {
    if (!id) return;
    axiosInstance.get(`/EducationalContent/${id}`)
      .then(response => {
        const data = response.data.data;
        setTitle(data.titulo);
        setDescription(data.descricao);
        // Ajuste: tipo conforme string recebida do backend ("Artigo" ou "Video")
        if (data.tipo === "Artigo") {
          setType('Artigo');
          setArticleContent(data.textoArtigo || '');
          setVideoUrl('');
        } else if (data.tipo === "Video" || data.tipo === "Vídeo") {
          setType('Vídeo');
          setVideoUrl(data.url || '');
          setArticleContent('');
        } else {
          setType('');
          setArticleContent('');
          setVideoUrl('');
        }
      })
      .catch(err => {
        console.error('Erro ao carregar conteúdo educacional:', err);
        alert('Não foi possível carregar os dados.');
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ajuste: tipoNumeric conforme enum backend (Artigo = 4, Vídeo = 2)
      let tipoNumeric = 0;
      if (type === 'Artigo') tipoNumeric = 4;
      else if (type === 'Vídeo') tipoNumeric = 2;
      const payload: any = {
        Titulo: title,
        Descricao: description,
        Tipo: tipoNumeric,
        URL: type === 'Vídeo' ? videoUrl : null,
        TextoArtigo: type === 'Artigo' ? articleContent : null,
        DataPublicacao: new Date().toISOString(),
      };
      console.log('Payload:', payload);
      // Se estiver alterando também a imagem, use FormData:
      if (image) {
        const form = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          form.append(key, value as string);
        });
        form.append('Imagem', image);
        await axiosInstance.put(`/EducationalContent/${id}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axiosInstance.put(`/EducationalContent/${id}`, payload);
      }
      navigate('/educational-content');
    } catch (err) {
      console.error('Erro ao salvar alterações:', err);
      alert('Erro ao atualizar. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ecc-card">
      <h2 className="ecc-title">Editar Conteúdo Educacional</h2>
      <form className="ecc-form" onSubmit={handleSubmit}>
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
          <label htmlFor="cover-upload" className="ecc-file-btn">arquivo</label>
        </div>

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
            <label htmlFor="content">{type === 'Artigo' ? 'conteúdo do artigo' : 'URL do vídeo'}</label>
            {type === 'Artigo' ? (
              <textarea
                id="content"
                value={articleContent}
                onChange={e => setArticleContent(e.target.value)}
                rows={8}
                required
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
            <button type="submit" className="ecc-btn ecc-btn-save" disabled={loading}>
              {loading ? 'Salvando...' : 'atualizar'}
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

export default EducationalContentEdit;
