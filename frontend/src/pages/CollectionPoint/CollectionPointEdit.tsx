// src/components/collection-point/CollectionPointEdit.tsx
import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CollectionPointEdit.css';

const CollectionPointEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [descricao, setDescricao] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [modoDetalhado, setModoDetalhado] = useState(false);
  const navigate = useNavigate();

  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Carrega dados iniciais
  useEffect(() => {
    axiosInstance.get(`/CollectionPoint/${id}`)
      .then(res => {
        const p = res.data.data;
        setNome(p.nome);
        setEndereco(p.endereco);
        setLatitude(p.latitude);
        setLongitude(p.longitude);
        setDescricao(p.descricao);

        // Pré-carrega campos detalhados se não estiver em modo popup
        if (!modoDetalhado && p.endereco) {
          const parts = p.endereco.split(',').map((s: string) => s.trim());
          setRua(parts[0] || '');
          setNumero(parts[1] || '');
          setBairro(parts[2] || '');
        }

        // Centraliza o mapa e adiciona marcador
        if (mapRef.current && p.latitude != null && p.longitude != null) {
          mapRef.current.setView([p.latitude, p.longitude], 15);
          if (markerRef.current) {
            markerRef.current.setLatLng([p.latitude, p.longitude]);
            markerRef.current
              .bindPopup(`<b>${p.nome}</b><br>${p.descricao}`)
              .openPopup();
          } else {
            markerRef.current = L.marker([p.latitude, p.longitude])
              .addTo(mapRef.current)
              .bindPopup(`<b>${p.nome}</b><br>${p.descricao}`)
              .openPopup();
          }
        }
      })
      .catch(err => console.error('Erro ao carregar ponto:', err));
  }, [id, modoDetalhado]);

  // Inicializa o mapa somente uma vez
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([-15.7801, -47.9292], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);

      mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
        // Só muda posição se segurar Ctrl
        if (!e.originalEvent.ctrlKey) return;
        const { lat, lng } = e.latlng;
        setLatitude(lat);
        setLongitude(lng);
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng]).addTo(mapRef.current!);
        }
        markerRef.current
          .bindPopup(`<b>${nome}</b><br>${descricao}`)
          .openPopup();
      });
    }
  }, [nome, descricao]);

  // Sincroniza campos detalhados quando editar manualmente
  useEffect(() => {
    if (endereco && !modoDetalhado) {
      const parts = endereco.split(',').map(s => s.trim());
      setRua(parts[0] || '');
      setNumero(parts[1] || '');
      setBairro(parts[2] || '');
    }
  }, [endereco, modoDetalhado]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (latitude == null || longitude == null) {
      alert('Selecione a posição no mapa antes de salvar.');
      return;
    }
    axiosInstance.put(`/CollectionPoint/update/${id}`, {
      Nome: nome,
      Endereco: endereco,
      Latitude: latitude,
      Longitude: longitude,
      Descricao: descricao,
    })
      .then(() => navigate('/collection-points'))
      .catch(err => console.error('Erro ao atualizar ponto:', err));
  };

  const handlePopupSubmit = () => {
    const novoEndereco = `${rua}, ${numero}, ${bairro}`;
    setEndereco(novoEndereco);
    setModoDetalhado(false);
    setShowPopup(false);
  };

  return (
    <div className="collection-container">
      {/* Formulário principal */}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="formulario">
          <h2>Editar Ponto de Coleta</h2>

          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />

          <label>Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />

          <label>
            Endereço
            {/* <span
              className="popup-toggle"
              onClick={() => { setModoDetalhado(true); setShowPopup(true); }}
            > ▶ </span> */}
          </label>
          <input
            type="text"
            value={endereco}
            onChange={e => { setEndereco(e.target.value); setModoDetalhado(false); }}
          />

          <label>Latitude</label>
          <input type="text" value={latitude ?? ''} readOnly />

          <label>Longitude</label>
          <input type="text" value={longitude ?? ''} readOnly />

            <p>(Ctrl + botão esquerdo para adicionar ponto)</p>
            <div className="buttons">
            <button type="submit" className="btn-save">Salvar</button>

            <button
              type="button"
              className="botao-cancelar-coleta"
              onClick={() => navigate('/collection-points')}>Cancelar</button>

          </div>
        </form>
      </div>

      {/* Mapa */}
      <div className="map-container">
        <div ref={mapContainerRef} className="map" />
        <small>SBPOOSTA</small>
      </div>

      {/* Popup de endereço detalhado */}
      {showPopup && modoDetalhado && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3>Alterar Endereço</h3>

            <label>CEP</label>
            <input type="text" value={cep} onChange={e => setCep(e.target.value)} />

            <label>Rua</label>
            <input type="text" value={rua} onChange={e => setRua(e.target.value)} />

            <label>Bairro</label>
            <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} />

            <label>Número</label>
            <input type="text" value={numero} onChange={e => setNumero(e.target.value)} />

            <div className="popup-buttons">
              <button
                onClick={() => setShowPopup(false)}
                className="botao-cancelar-coleta"
              >Cancelar</button>
              <button
                onClick={handlePopupSubmit}
                className="btn-save"
              >Salvar</button>
            </div>
          </div>
        </div>
      )}
  </div>
  );
};

export default CollectionPointEdit;
