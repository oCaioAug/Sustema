import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';

const CollectionPointEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [descricao, setDescricao] = useState('');
  // const [tipoMaterialAceito, setTipoMaterialAceito] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/CollectionPoint/${id}`)
      .then(response => {
        setNome(response.data.data.nome);
        setEndereco(response.data.data.endereco);
        setLatitude(response.data.data.latitude.toString());
        setLongitude(response.data.data.longitude.toString());
        setDescricao(response.data.data.descricao);
      })
      .catch(error => console.error('Error fetching collection point:', error));
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const pointData = {
      Nome: nome,
      Endereco: endereco,
      Latitude: parseFloat(latitude),
      Longitude: parseFloat(longitude),
      Descricao: descricao,
    };

    axiosInstance.put(`/CollectionPoint/update/${id}`, pointData)
      .then(() => navigate('/collection-points'))
      .catch(error => console.error('Error updating collection point:', error));
  };

  return (
    <div>
      <h1>Alterar Ponto de Coleta</h1>
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
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
};

export default CollectionPointEdit;