import React, { useEffect, useState, ChangeEvent } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { Link } from 'react-router-dom';
import '../styles/EducationalContent/EducationalContentList.css'; 

interface EducationalContent {
  contentId: number;
  titulo: string;
  descricao: string;
  dataPublicacao: string;
  tipo: string;
  url: string;
}

const EducationalContentList: React.FC = () => {
  const [allContents, setAllContents] = useState<EducationalContent[]>([]);
  const [filteredContents, setFilteredContents] = useState<EducationalContent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axiosInstance.get('/EducationalContent')
      .then(response => {
        const data = Array.isArray(response.data)
          ? response.data
          : [];
        setAllContents(data);
        setFilteredContents(data);
      })
      .catch(error => {
        console.error('Erro ao buscar conteúdos educacionais:', error);
        setAllContents([]);
        setFilteredContents([]);
      });
  }, []);

  // Atualiza lista ao mudar o termo de busca
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredContents(allContents);
    } else {
      const lower = term.toLowerCase();
      setFilteredContents(
        allContents.filter(c =>
          c.titulo.toLowerCase().includes(lower)
        )
      );
    }
  };

  return (
    <div className="card-container">
      <div className="card-header-custom">
        <h2 className="title">Gerenciamento de Conteúdos Educacionais</h2>
        <input
          type="text"
          placeholder="Pesquisar por título..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <Link to="/educational-content/create" className="btn-add">
          Novo Conteúdo
        </Link>
      </div>

      <div className="card-body-custom">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredContents.length > 0 ? (
              filteredContents.map(content => (
                <tr key={content.contentId}>
                  <td>{content.contentId}</td>
                  <td>{content.titulo}</td>
                  <td>{content.descricao}</td>
                  <td>{content.tipo}</td>
                  <td>{content.dataPublicacao}</td>
                  <td>
                    <Link
                      to={`/educational-content/edit/${content.contentId}`}
                      className="btn-action edit"
                    >
                      <img
                        src="/images/editIcon.png"
                        alt="Editar"
                        className="icon"
                      />
                    </Link>
                    <Link
                      to={`/educational-content/delete/${content.contentId}`}
                      className="btn-action delete"
                    >
                      <img
                        src="/images/deleteIcon.png"
                        alt="Apagar"
                        className="icon"
                      />
                    </Link>
                    <Link
                      to={`/educational-content/view/${content.contentId}`}
                      className="btn-action view"
                    >
                      <img
                        src="/images/viewIcon.png"
                        alt="Visualizar"
                        className="icon"
                      />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-data">
                  Nenhum conteúdo educacional encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EducationalContentList;