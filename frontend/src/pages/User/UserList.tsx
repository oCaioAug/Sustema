import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  nome: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>('http://localhost:5263/api/User/all')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <Link to="/users/create" className="btn btn-primary mb-3">Criar Novo Usuário</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/users/edit/${user.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <Link to={`/users/delete/${user.id}`} className="btn btn-danger btn-sm">Apagar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;