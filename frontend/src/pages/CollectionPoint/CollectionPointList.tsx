import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { Link } from 'react-router-dom';
import './CollectionPointList.css'; // ← Importe o CSS

interface CollectionPoint {
  collectionPointId: number;
  nome: string;
  endereco: string;
  descricao: string;
  latitude: number;
  longitude: number;
}

const CollectionPointList: React.FC = () => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);

  useEffect(() => {
    axiosInstance.get('/CollectionPoint')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setPoints(response.data.data);
        } else {
          console.warn('Formato inesperado:', response.data);
          setPoints([]);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar pontos de coleta:', error);
        setPoints([]);
      });
  }, []);

  return (
    <div className="card-container">
      <div className="card-header-custom">
        <h2 className="title">Gerenciamento de Pontos de Coleta</h2>
        <Link to="/collection-points/create" className="btn-add">
          Novo Ponto
        </Link>
      </div>

      <div className="card-body-custom">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {points.length > 0 ? (
              points.map((point, index) => (
                <tr key={point.collectionPointId}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar-cell">
                      <span>{point.nome}</span>
                    </div>
                  </td>
                  <td>{point.endereco}</td>
                  <td>{point.descricao}</td>
                  <td>
                    <Link to={`/collection-points/edit/${point.collectionPointId}`} className="btn-action edit">
                      <img src="/images/editIcon.png" alt="Editar" className="icon" />
                    </Link>
                    <Link to={`/collection-points/delete/${point.collectionPointId}`} className="btn-action delete">
                      <img src="/images/deleteIcon.png" alt="Apagar" className="icon" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data">Nenhum ponto de coleta encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionPointList;
