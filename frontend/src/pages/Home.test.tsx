import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

// Mock do useDocumentTitle
jest.mock('../../helper/useDocumentTitle', () => {
  return jest.fn();
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  test('renders main sections correctly', () => {
    renderWithRouter(<Home />);
    
    // Verifica se as seções principais estão presentes
    expect(screen.getByText('Sobre Nós')).toBeInTheDocument();
    expect(screen.getByText('Motivação')).toBeInTheDocument();
  });

  test('renders about us content', () => {
    renderWithRouter(<Home />);
    
    // Verifica se o conteúdo "Sobre Nós" está presente
    expect(screen.getByText(/Sustema é uma iniciativa/i)).toBeInTheDocument();
    expect(screen.getByText(/destinada a incentivar e orientar o descarte/i)).toBeInTheDocument();
  });

  test('renders images with correct alt text', () => {
    renderWithRouter(<Home />);
    
    // Verifica se as imagens estão presentes com alt text correto
    expect(screen.getByAltText('Imagem de uma lâmpada')).toBeInTheDocument();
  });

  test('sets correct document title', () => {
    const mockUseDocumentTitle = require('../../helper/useDocumentTitle');
    
    renderWithRouter(<Home />);
    
    expect(mockUseDocumentTitle).toHaveBeenCalledWith('Home - Sustema');
  });

  test('renders with proper structure', () => {
    renderWithRouter(<Home />);
    
    // Verifica se existe pelo menos um container
    const containers = document.querySelectorAll('.container');
    expect(containers.length).toBeGreaterThan(0);
  });
});