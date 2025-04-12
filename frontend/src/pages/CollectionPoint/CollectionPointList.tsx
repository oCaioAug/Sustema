import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { Link } from 'react-router-dom';

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
          setPoints(response.data.data); // Acessa o array dentro da propriedade `data`
        } else {
          console.warn('API returned an unexpected format:', response.data);
          setPoints([]); // Garante que o estado seja um array vazio
        }
      })
      .catch(error => {
        console.error('Error fetching collection points:', error);
        setPoints([]); // Garante que o estado seja um array vazio em caso de erro
      });
  }, []);

  return (
    <div>
      <h1>Lista de Pontos de Coleta</h1>
      <Link to="/collection-points/create" className="btn btn-primary mb-3">Criar Novo Ponto de Coleta</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          { points ? (
            points.map(point => (
              <tr key={point.collectionPointId}>
                <td>{point.collectionPointId}</td>
                <td>{point.nome}</td>
                <td>{point.endereco}</td>
                <td>{point.descricao}</td>
                <td>
                  <Link to={`/collection-points/edit/${point.collectionPointId}`} className="btn btn-warning btn-sm me-2">Alterar</Link>
                  <Link to={`/collection-points/delete/${point.collectionPointId}`} className="btn btn-danger btn-sm">Apagar</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">Nenhum ponto de coleta encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CollectionPointList;