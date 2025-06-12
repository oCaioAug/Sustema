import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EducationalContentCards from './EducationalContentCards';
import axiosInstance from '../../helper/axios-instance';

// Mock do axios
jest.mock('../../helper/axios-instance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const mockEducationalContent = [
  {
    contentId: 1,
    titulo: 'Tutorial de Reciclagem',
    descricao: 'Como reciclar eletrônicos corretamente',
    tipo: 'Artigo',
    imagem: 'https://example.com/image1.jpg'
  },
  {
    contentId: 2,
    titulo: 'Vídeo sobre Sustentabilidade',
    descricao: 'Aprenda sobre práticas sustentáveis',
    tipo: 'Vídeo',
    imagem: 'https://example.com/image2.jpg'
  }
];

describe('EducationalContentCards Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  test('renders loading state initially', () => {
    mockedAxios.get.mockReturnValue(new Promise(() => {})); // Promise que nunca resolve
    
    renderWithRouter(<EducationalContentCards />);
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('renders content cards when data is loaded', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockEducationalContent });
    
    renderWithRouter(<EducationalContentCards />);
    
    await waitFor(() => {
      expect(screen.getByText('Tutorial de Reciclagem')).toBeInTheDocument();
      expect(screen.getByText('Vídeo sobre Sustentabilidade')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Como reciclar eletrônicos corretamente')).toBeInTheDocument();
    expect(screen.getByText('Aprenda sobre práticas sustentáveis')).toBeInTheDocument();
  });

  test('renders error message when API call fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));
    
    renderWithRouter(<EducationalContentCards />);
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao buscar conteúdos educacionais.')).toBeInTheDocument();
    });
  });

  test('renders empty state when no content is available', async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    
    renderWithRouter(<EducationalContentCards />);
    
    await waitFor(() => {
      expect(screen.getByText('Nenhum conteúdo encontrado.')).toBeInTheDocument();
    });
  });

  test('renders "Ver Mais" links correctly', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockEducationalContent });
    
    renderWithRouter(<EducationalContentCards />);
    
    await waitFor(() => {
      const verMaisLinks = screen.getAllByText('Ver Mais');
      expect(verMaisLinks).toHaveLength(2);
      
      expect(verMaisLinks[0].closest('a')).toHaveAttribute('href', '/educational-content/view/1');
      expect(verMaisLinks[1].closest('a')).toHaveAttribute('href', '/educational-content/view/2');
    });
  });

  test('calls correct API endpoint', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockEducationalContent });
    
    renderWithRouter(<EducationalContentCards />);
    
    expect(mockedAxios.get).toHaveBeenCalledWith('/EducationalContent');
  });
});