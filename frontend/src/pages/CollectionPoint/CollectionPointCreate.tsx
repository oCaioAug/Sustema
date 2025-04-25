import React, { useState } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../../map/MapComponent';
import './CollectionPointCreate.css'; // Importar o arquivo de estilos para corrigir o layout do mapa

const CollectionPointCreate: React.FC = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const pointData = {
      Nome: nome,
      Endereco: endereco,
      Latitude: parseFloat(latitude),
      Longitude: parseFloat(longitude),
      Descricao: descricao, // Changed from 'descricao' to 'Descricao' to match the backend model
    };

    axiosInstance.post('/CollectionPoint', pointData)
      .then(response => {
        console.log('Ponto de coleta criado com sucesso:', response);
        navigate('/collection-points');
      })
      .catch(error => {
        console.error('Erro ao criar ponto de coleta:', error);
        // Optional: Add user feedback about the error
        alert('Erro ao criar ponto de coleta. Verifique os dados e tente novamente.');
      });
  };

  return (
    <div className="container mt-4">
      {/* <h2 className="text-center mb-4">Novo Ponto de Coleta</h2> */}
      
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Dados do Ponto de Coleta</h4>
        </div>
        
        <div className="card-body">
          <div className="row">
            {/* Formulário - Lado Esquerdo */}
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="px-3">
                <div className="mb-4">
                  <label className="form-label fw-bold">Nome</label>
                  <input
                    type="text"
                    className="form-control w-75"
                    placeholder="Nome do ponto de coleta"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">Endereço</label>
                  <input
                    type="text"
                    className="form-control w-75"
                    placeholder="Endereço completo"
                    value={endereco}
                    onChange={(event) => setEndereco(event.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">Descrição</label>
                  <textarea
                    className="form-control w-75"
                    placeholder="Descreva o ponto de coleta"
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="row w-75">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Latitude</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: -22.4689"
                      value={latitude}
                      onChange={(event) => setLatitude(event.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Longitude</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: -44.4469"
                      value={longitude}
                      onChange={(event) => setLongitude(event.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end w-75">
                  <button 
                    type="button" 
                    className="btn btn-secondary me-md-2" 
                    onClick={() => navigate('/collection-points')}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success">Salvar Ponto de Coleta</button>
                </div>
              </form>
            </div>
            
            {/* Mapa - Lado Direito */}
            <div className="col-md-6">
              <div className="map-wrapper" style={{ height: '450px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <MapComponent />
              </div>
              {/* <div className="mt-2 text-muted small">
                <i className="bi bi-info-circle"></i> Clique no mapa para selecionar a localização ou digite as coordenadas.
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPointCreate;