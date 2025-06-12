import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import EducationalContentList from './EducationalContentList';
import axiosInstance from '../../helper/axios-instance';

jest.mock('../../helper/axios-instance');

const mockContents = [
  {
    contentId: 1,
    titulo: 'Primeiro Conteúdo',
    descricao: 'Descrição 1',
    dataPublicacao: '2024-06-01T00:00:00Z',
    tipo: 'Artigo',
    url: ''
  },
  {
    contentId: 2,
    titulo: 'Segundo Conteúdo',
    descricao: 'Descrição 2',
    dataPublicacao: '2024-06-02T00:00:00Z',
    tipo: 'Vídeo',
    url: 'https://youtube.com/'
  }
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('EducationalContentList', () => {
  beforeEach(() => {
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockContents });
  });

  it('renderiza a lista de conteúdos', async () => {
    renderWithRouter(<EducationalContentList />);
    expect(screen.getByPlaceholderText(/Pesquisar por título/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Primeiro Conteúdo')).toBeInTheDocument();
      expect(screen.getByText('Segundo Conteúdo')).toBeInTheDocument();
    });
  });

  it('filtra conteúdos pelo título', async () => {
    renderWithRouter(<EducationalContentList />);
    await waitFor(() => screen.getByText('Primeiro Conteúdo'));
    const input = screen.getByPlaceholderText(/Pesquisar por título/i);
    fireEvent.change(input, { target: { value: 'Segundo' } });
    expect(screen.queryByText('Primeiro Conteúdo')).not.toBeInTheDocument();
    expect(screen.getByText('Segundo Conteúdo')).toBeInTheDocument();
  });
});