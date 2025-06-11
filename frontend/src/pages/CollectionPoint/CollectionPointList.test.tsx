// src/components/collection-point/CollectionPointList.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CollectionPointList from './CollectionPointList';
import axiosInstance from '../../helper/axios-instance';

// Mock do axios
jest.mock('../../helper/axios-instance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('CollectionPointList', () => {
  const mockData = [
    {
      collectionPointId: 1,
      nome: 'Ponto A',
      endereco: 'Rua A, 123',
      descricao: 'Ponto de coleta de pilhas',
      latitude: -23.55,
      longitude: -46.63,
    },
    {
      collectionPointId: 2,
      nome: 'Ponto B',
      endereco: 'Rua B, 456',
      descricao: 'Coleta de eletrônicos',
      latitude: -23.56,
      longitude: -46.64,
    },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: { data: mockData } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza título, campo de busca e botão de novo ponto', async () => {
    render(
      <MemoryRouter>
        <CollectionPointList />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Gerenciamento de Pontos de Coleta/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Pesquisar por nome/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Novo Ponto/i })
    ).toHaveAttribute('href', '/collection-points/create');

    await waitFor(() => {
      expect(screen.getByText('Ponto A')).toBeInTheDocument();
      expect(screen.getByText('Ponto B')).toBeInTheDocument();
    });
  });

  test('filtra pontos com base na pesquisa', async () => {
    render(
      <MemoryRouter>
        <CollectionPointList />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Ponto A'));

    const input = screen.getByPlaceholderText(/Pesquisar por nome/i);
    fireEvent.change(input, { target: { value: 'B' } });

    expect(screen.queryByText('Ponto A')).not.toBeInTheDocument();
    expect(screen.getByText('Ponto B')).toBeInTheDocument();
  });

  test('exibe mensagem quando nenhum ponto é encontrado', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });

    render(
      <MemoryRouter>
        <CollectionPointList />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/Nenhum ponto de coleta encontrado/i)
    ).toBeInTheDocument();
  });

  test('exibe links de edição e exclusão para cada ponto', async () => {
    render(
      <MemoryRouter>
        <CollectionPointList />
      </MemoryRouter>
    );

    // retorna um array com todos os links “Editar” e “Apagar”
    const editLinks = await screen.findAllByRole('link', { name: /Editar/i });
    const deleteLinks = await screen.findAllByRole('link', { name: /Apagar/i });

    // verifica o primeiro ponto (ID = 1)
    expect(editLinks[0]).toHaveAttribute('href', '/collection-points/edit/1');
    expect(deleteLinks[0]).toHaveAttribute('href', '/collection-points/delete/1');

    // verifica o segundo ponto (ID = 2)
    expect(editLinks[1]).toHaveAttribute('href', '/collection-points/edit/2');
    expect(deleteLinks[1]).toHaveAttribute('href', '/collection-points/delete/2');
  });
});
