import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { Link } from 'react-router-dom';

interface EducationalContent {
  contentId: number;
  titulo: string;
  descricao: string;
  dataPublicacao: string;
  tipo: string;
  url: string;
}

const EducationalContentList: React.FC = () => {
  const [contents, setContents] = useState<EducationalContent[]>([]);

  useEffect(() => {
    axiosInstance.get<EducationalContent[]>('/EducationalContent')
      .then(response => {
        setContents(response.data);
        console.log('Conteúdos educacionais carregados com sucesso! --> ', response.data);
      })
      .then(() => console.log('Conteúdos educacionais carregados com sucesso! --> ', contents))
      .catch(error => console.error('Error fetching educational contents:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Conteúdos Educacionais</h1>
      <Link to="/educational-content/create" className="btn btn-primary mb-3">Criar Novo Conteúdo</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(content => (
            <tr key={content.contentId}>
              <td>{content.contentId}</td>
              <td>{content.titulo}</td>
              <td>{content.descricao}</td>
              <td>
                <Link to={`/educational-content/edit/${content.contentId}`} className="btn btn-warning btn-sm me-2">Alterar</Link>
                <Link to={`/educational-content/delete/${content.contentId}`} className="btn btn-danger btn-sm">Apagar</Link>
                <Link to={`/educational-content/view/${content.contentId}`} className="btn btn-info btn-sm">Visualizar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EducationalContentList;