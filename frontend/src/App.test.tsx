import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the axios-instance before App import
jest.mock('./helper/axios-instance', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }
}));

// Mock do axios para evitar chamadas reais
jest.mock('axios');

// Mock do componente MapComponent para evitar problemas com Leaflet
jest.mock('./map/MapComponent', () => {
  return function MockMapComponent() {
    return <div data-testid="mock-map">Mapa Mock</div>;
  };
});

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  test('renders without crashing', () => {
    renderWithRouter(<App />);
  });

  test('renders header and footer', () => {
    renderWithRouter(<App />);
    
    // Verifica se o header está presente (logo do Sustema)
    expect(screen.getByAltText('Sustema Logo')).toBeInTheDocument();
    
    // Verifica se o footer está presente
    expect(screen.getByText('Sustema')).toBeInTheDocument();
    expect(screen.getByText('Nossa missão é oferecer soluções inovadoras e de qualidade.')).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    renderWithRouter(<App />);
    
    // Verifica se está na página inicial - usar getAllByText para elementos duplicados
    expect(screen.getAllByText('Sobre Nós')).toHaveLength(2); // One in content, one in footer
    expect(screen.getByText(/Sustema é uma iniciativa/i)).toBeInTheDocument();
  });
});
