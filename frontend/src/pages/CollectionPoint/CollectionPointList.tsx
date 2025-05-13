// src/components/collection-point/CollectionPointList.tsx
import React, { useEffect, useState, ChangeEvent } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { Link } from 'react-router-dom';
import './CollectionPointList.css';

interface CollectionPoint {
  collectionPointId: number;
  nome: string;
  endereco: string;
  descricao: string;
  latitude: number;
  longitude: number;
}

const CollectionPointList: React.FC = () => {
  const [allPoints, setAllPoints] = useState<CollectionPoint[]>([]);
  const [filteredPoints, setFilteredPoints] = useState<CollectionPoint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // busca inicial
  useEffect(() => {
    axiosInstance.get('/CollectionPoint')
      .then(response => {
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setAllPoints(data);
        setFilteredPoints(data);
      })
      .catch(error => {
        console.error('Erro ao buscar pontos de coleta:', error);
        setAllPoints([]);
        setFilteredPoints([]);
      });
  }, []);

  // atualiza lista ao mudar o termo de busca
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredPoints(allPoints);
    } else {
      const lower = term.toLowerCase();
      setFilteredPoints(
        allPoints.filter(p =>
          p.nome.toLowerCase().includes(lower)
        )
      );
    }
  };

  return (
    <div className="card-container">
      <div className="card-header-custom">
        <h2 className="title">Gerenciamento de Pontos de Coleta</h2>

        {/* campo de pesquisa no canto superior direito */}
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

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
            {filteredPoints.length > 0 ? (
              filteredPoints.map(point => (
                <tr key={point.collectionPointId}>
                  <td>{point.collectionPointId}</td>
                  <td>
                    <div className="avatar-cell">
                      <span>{point.nome}</span>
                    </div>
                  </td>
                  <td>{point.endereco}</td>
                  <td>{point.descricao}</td>
                  <td>
                    <Link
                      to={`/collection-points/edit/${point.collectionPointId}`}
                      className="btn-action edit"
                    >
                      <img
                        src="/images/editIcon.png"
                        alt="Editar"
                        className="icon"
                      />
                    </Link>
                    <Link
                      to={`/collection-points/delete/${point.collectionPointId}`}
                      className="btn-action delete"
                    >
                      <img
                        src="/images/deleteIcon.png"
                        alt="Apagar"
                        className="icon"
                      />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data">
                  Nenhum ponto de coleta encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionPointList;
