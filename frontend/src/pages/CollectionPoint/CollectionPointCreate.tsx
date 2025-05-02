import React, { useState, useRef, useMemo, useEffect } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../../map/MapComponent';
import './CollectionPointCreate.css';
import axios from 'axios'; // Para fazer a requisição à API de CEP
import L from 'leaflet'; // Para manipular o mapa diretamente

const CollectionPointCreate: React.FC = () => {
  const [cep, setCep] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false); // Controla a exibição do pop-up
  const [popupData, setPopupData] = useState({ nome: '', descricao: '' }); // Dados do pop-up
  const [popupCoords, setPopupCoords] = useState<{ lat: number; lng: number } | null>(null); // Coordenadas do clique
  const [collectionPoints, setCollectionPoints] = useState([]); // Estado para armazenar os pontos de coleta
  const navigate = useNavigate();
  const mapRef = useRef<L.Map | null>(null); // Referência para o mapa

  const handleCepBlur = async () => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;

        if (data.erro) {
          alert('CEP não encontrado. Verifique e tente novamente.');
          return;
        }

        // Preenche os campos automaticamente com os dados retornados pela API
        setEstado(data.uf || '');
        setCidade(data.localidade || '');
        setBairro(data.bairro || '');
        setRua(data.logradouro || '');
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        alert('Erro ao buscar o CEP. Verifique sua conexão e tente novamente.');
      }
    } else {
      alert('Digite um CEP válido com 8 dígitos.');
    }
  };

  const handleSearch = async () => {
    const address = `${rua}, ${cidade}, ${estado}`;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lon));

        // Centraliza o mapa nas coordenadas encontradas
        if (mapRef.current) {
          mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 18);
        }
      } else {
        alert('Endereço não encontrado. Verifique os campos e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      alert('Erro ao buscar o endereço. Verifique sua conexão e tente novamente.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const pointData = {
      Cep: cep,
      Estado: estado,
      Cidade: cidade,
      Bairro: bairro,
      Rua: rua,
      Numero: numero,
      Latitude: latitude,
      Longitude: longitude,
    };

    try {
      await axiosInstance.post('/CollectionPoint', pointData);
      navigate('/collection-points');
    } catch (error) {
      console.error('Erro ao criar ponto de coleta:', error);
      alert('Erro ao criar ponto de coleta. Verifique os dados e tente novamente.');
    }
  };

  const handleAddPoint = async () => {
    if (!popupData.nome.trim() || !popupData.descricao.trim() || !popupCoords) {
      alert('Preencha todos os campos antes de adicionar o ponto.');
      return;
    }

    const enderecoCompleto = `${cep}, ${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}`;

    const pointData = {
      nome: popupData.nome,
      descricao: popupData.descricao,
      endereco: enderecoCompleto,
      latitude: popupCoords.lat,
      longitude: popupCoords.lng,
    };

    try {
      // Chamada à API para criar o ponto de coleta
      const response = await axiosInstance.post('/CollectionPoint', pointData);
      console.log('Ponto de coleta criado com sucesso:', response.data);

      // Adiciona o marcador no mapa
      if (mapRef.current) {
        const marker = L.marker([popupCoords.lat, popupCoords.lng], {
          icon: L.icon({
            iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
        });

        marker
          .addTo(mapRef.current!)
          .bindPopup(`<b>${popupData.nome}</b><br>${popupData.descricao}`)
          .openPopup();
      }

      // Limpa os dados do pop-up
      setPopupData({ nome: '', descricao: '' });
      setShowPopup(false);

      alert('Ponto de coleta criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar ponto de coleta:', error);
      alert('Erro ao criar ponto de coleta. Verifique os dados e tente novamente.');
    }
  };

  // Função para buscar todos os pontos de coleta
  const fetchCollectionPoints = async () => {
    try {
      const response = await axiosInstance.get('/CollectionPoint');
      const points = response.data.data; // Supondo que os dados estão no campo `data`
      setCollectionPoints(points);

      // Adiciona os pontos no mapa
      if (mapRef.current) {
        points.forEach((point: any) => {
          const marker = L.marker([point.latitude, point.longitude], {
            icon: L.icon({
              iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
          });

          marker
            .addTo(mapRef.current!)
            .bindPopup(`<b>${point.nome}</b><br>${point.descricao}`);
        });
      }
    } catch (error) {
      console.error('Erro ao buscar pontos de coleta:', error);
      alert('Erro ao carregar os pontos de coleta. Tente novamente mais tarde.');
    }
  };

  // UseEffect para carregar os pontos de coleta ao montar o componente
  useEffect(() => {
    fetchCollectionPoints();
  }, []);

  // Memoriza o componente MapComponent para evitar recriação
  const memoizedMapComponent = useMemo(
    () => (
      <MapComponent
        onMapClick={(lat, lng, event) => {
          if (event.originalEvent.ctrlKey) {
            setPopupCoords({ lat, lng });
            setShowPopup(true);
          } else {
            setLatitude(lat);
            setLongitude(lng);
          }
        }}
        mapRef={mapRef}
      />
    ),
    [] // O mapa será criado apenas uma vez
  );

  return (
    <div className="collection-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="formulario">
          <div className="mb-3">
            <label className="form-label">CEP:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: 27515000"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={handleCepBlur}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Estado:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: SP"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cidade:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: São Paulo"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rua:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Avenida Paulista"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Número:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: 1000"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="button" className="btn-pesquisar" onClick={handleSearch}>
              Pesquisar
            </button>
            <h3 className="description-text">(Clique ctrl + botão esquerdo para adicionar ponto)</h3>
            <button
              type="button"
              className="btn-gerenciar"
              onClick={() => navigate('/collection-points')}
            >
              Gerenciar Pontos de Coleta
            </button>
          </div>
        </form>
      </div>

      {/* Mapa à direita */}
      <div className="map-container">{memoizedMapComponent}</div>

      {/* Pop-up para adicionar ponto */}
      {showPopup && (
        <div className="popup-form">
          <h3>Adicionar Ponto</h3>
          <div className="mb-3">
            <label>Nome:</label>
            <input
              type="text"
              className="form-control"
              value={popupData.nome}
              onChange={(e) => setPopupData({ ...popupData, nome: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Descrição:</label>
            <input
              type="text"
              className="form-control"
              value={popupData.descricao}
              onChange={(e) => setPopupData({ ...popupData, descricao: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={() => setShowPopup(false)}>
              Cancelar
            </button>
            <button className="btn btn-success" onClick={handleAddPoint}>
              Adicionar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPointCreate;