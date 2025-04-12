import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helper/axios-instance';
import { useParams } from 'react-router-dom';

const EducationalContentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axiosInstance.get(`/educationalcontent/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch(error => console.error('Error fetching educational content:', error));
  }, [id]);

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default EducationalContentView;