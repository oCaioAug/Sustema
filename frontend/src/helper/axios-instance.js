import axios from 'axios';

const token = localStorage.getItem('token') || '';
const header = token ? { Authorization: `Bearer ${token}` } : {};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5263/api/',
  headers: {
    'Content-Type': 'application/json', // Garante que o conteúdo seja enviado como JSON
    ...header,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login page)
      console.error('Seu acesso expirou, por favor faça login novamente');
      window.location.href = '/login'; // Redirect to login page
    } else if (error.response && error.response.status === 403) {
      // Handle forbidden access (e.g., show a message)
      console.error('Acesso negado - você não tem permissão para visualizar este recurso');
    } else {
      // Handle other errors
      console.error('Ocorreu um erro:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;