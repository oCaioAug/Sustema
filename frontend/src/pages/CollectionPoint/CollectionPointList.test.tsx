import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CollectionPointList from './CollectionPointList';
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

const mockCollectionPoints = [
  {
    collectionPointId: 1,
    nome: 'Ponto de Coleta Centro',
    endereco: 'Rua Central, 123',
    descricao: 'Ponto de coleta no centro da cidade',
    latitude: -23.5505,
    longitude: -46.6333
  },
  {
    collectionPointId: 2,
    nome: 'Ponto de Coleta Zona Sul',
    endereco: 'Av. Paulista, 456',
    descricao: 'Ponto de coleta na zona sul',
    latitude: -23.5618,
    longitude: -46.6565
  }
];

describe('CollectionPointList Component', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  test('renders collection points when data is loaded', async () => {
    mockedAxios.get.mockResolvedValue({ 
      data: { data: mockCollectionPoints }
    });
    
    renderWithRouter(<CollectionPointList />);
    
    await waitFor(() => {
      expect(screen.getByText('Ponto de Coleta Centro')).toBeInTheDocument();
      expect(screen.getByText('Ponto de Coleta Zona Sul')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Rua Central, 123')).toBeInTheDocument();
    expect(screen.getByText('Av. Paulista, 456')).toBeInTheDocument();
  });

  test('handles search functionality', async () => {
    mockedAxios.get.mockResolvedValue({ 
      data: { data: mockCollectionPoints }
    });
    
    renderWithRouter(<CollectionPointList />);
    
    await waitFor(() => {
      expect(screen.getByText('Ponto de Coleta Centro')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/pesquisar por nome/i);
    fireEvent.change(searchInput, { target: { value: 'Centro' } });
    
    expect(searchInput).toHaveValue('Centro');
  });

  test('renders action buttons for each collection point', async () => {
    mockedAxios.get.mockResolvedValue({ 
      data: { data: mockCollectionPoints }
    });
    
    renderWithRouter(<CollectionPointList />);
    
    await waitFor(() => {
      const editButtons = screen.getAllByAltText(/editar/i);
      const deleteButtons = screen.getAllByAltText(/apagar/i);
      
      expect(editButtons).toHaveLength(2);
      expect(deleteButtons).toHaveLength(2);
    });
  });

  test('renders "Novo Ponto" link', async () => {
    mockedAxios.get.mockResolvedValue({ 
      data: { data: mockCollectionPoints }
    });
    
    renderWithRouter(<CollectionPointList />);
    
    expect(screen.getByText(/novo ponto/i)).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockedAxios.get.mockRejectedValue(new Error('API Error'));
    
    renderWithRouter(<CollectionPointList />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    
    consoleSpy.mockRestore();
  });

  test('calls correct API endpoint', async () => {
    mockedAxios.get.mockResolvedValue({ 
      data: { data: mockCollectionPoints }
    });
    
    renderWithRouter(<CollectionPointList />);
    
    expect(mockedAxios.get).toHaveBeenCalledWith('/CollectionPoint');
  });
});