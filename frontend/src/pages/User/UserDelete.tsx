import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => navigate('/users'))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h1>Delete User</h1>
      <p>Are you sure you want to delete the user with ID: {id}?</p>
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      <button onClick={() => navigate('/users')} className="btn btn-secondary ms-2">Cancel</button>
    </div>
  );
};

export default UserDelete;