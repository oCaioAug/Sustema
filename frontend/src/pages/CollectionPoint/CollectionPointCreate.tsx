import React, { useState } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate } from 'react-router-dom';

const CollectionPointCreate: React.FC = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  // const [tipoMaterialAceito, setTipoMaterialAceito] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const pointData = {
      Nome: nome,
      Endereco: endereco,
      Latitude: parseFloat(latitude),
      Longitude: parseFloat(longitude),
      descricao: descricao,
    };

    axiosInstance.post('/CollectionPoint', pointData)
      .then(() => navigate('/collection-points'))
      .catch(error => console.error('Error creating collection point:', error));
  };

  return (
    <div>
      <h1>Criar Ponto de Coleta</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Endereço</label>
          <input
            type="text"
            className="form-control"
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input
            type="text"
            className="form-control"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Latitude</label>
          <input
            type="text"
            className="form-control"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Longitude</label>
          <input
            type="text"
            className="form-control"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
            required
          />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Tipo de Material Aceito</label>
          <input
            type="text"
            className="form-control"
            value={tipoMaterialAceito}
            onChange={(event) => setTipoMaterialAceito(event.target.value)}
            required
          />
        </div> */}
        <button type="submit" className="btn btn-primary">Criar</button>
      </form>
    </div>
  );
};

export default CollectionPointCreate;