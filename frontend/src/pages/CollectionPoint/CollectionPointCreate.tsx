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

  return (<>
    <div className='d-flex gap-2'>
      <div className='col-4'>
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

      <div className='map-container'>
        <MapComponent />
      </div>
    </div>

    {/* <div >
      <div id="overlay"></div>

      <div id="modal">
        <h2>Adicionar Ponto</h2>
        <label htmlFor="nomeEmpresa">Nome da Empresa:</label>
        <input type="text" id="nomeEmpresa" placeholder="Ex: Recicla SP" required />
        <label htmlFor="descricao">Descrição:</label>
        <input type="text" id="descricao" placeholder="Descreca o ponto" required />

        <label htmlFor="tipoColeta">Tipo de Coleta:</label>
        <select id="tipoColeta" required>
          <option value="Eletrônico">Eletrônico</option>
          <option value="Orgânico">Orgânico</option>
          <option value="Metal">Metal</option>
          <option value="Químico">Químico</option>
          <option value="Papel">Papel</option>
          <option value="Plástico">Plástico</option>
          <option value="Vidro">Vidro</option>
        </select>

        <button type="button" id="btnAdicionar">Adicionar</button>
        <button type="button" id="btnCancelar">Cancelar</button>
      </div>
    </div> */}


  </>);
};

export default CollectionPointCreate;