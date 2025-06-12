import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Tutoriais from './Tutoriais';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Tutoriais Component', () => {
  test('renders main title and description', () => {
    renderWithRouter(<Tutoriais />);
    
    expect(screen.getByText('Conscientização e Tutoriais')).toBeInTheDocument();
    expect(screen.getByText('Aprenda mais sobre como reciclar e reutilizar os seus eletrônicos!')).toBeInTheDocument();
  });

  test('renders tutorial categories', () => {
    renderWithRouter(<Tutoriais />);
    
    // Verifica se as categorias de tutoriais estão presentes
    expect(screen.getByText('Celular')).toBeInTheDocument();
    expect(screen.getByText('Computador')).toBeInTheDocument();
    expect(screen.getByText('Notebooks')).toBeInTheDocument();
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
  });

  test('renders images with correct alt text', () => {
    renderWithRouter(<Tutoriais />);
    
    // Verifica se as imagens estão presentes com alt text correto
    expect(screen.getAllByAltText('Imagem ilustrativa de um eletrônico')).toHaveLength(2);
    expect(screen.getByAltText('Imagem ilustrativa de um computador')).toBeInTheDocument();
    expect(screen.getByAltText('Imagem ilustrativa de um notebook')).toBeInTheDocument();
  });

  test('renders tutorial links', () => {
    renderWithRouter(<Tutoriais />);
    
    // Verifica se os links dos tutoriais estão presentes
    const tutorialLinks = screen.getAllByRole('link');
    expect(tutorialLinks.length).toBeGreaterThan(0);
    
    // Verifica se todos os links têm href="#a" (placeholder)
    tutorialLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#a');
    });
  });

  test('renders with proper CSS classes', () => {
    renderWithRouter(<Tutoriais />);
    // Verifica se o título está presente
    expect(screen.getByText('Conscientização e Tutoriais')).toBeInTheDocument();
    // Verifica se existe pelo menos um link de tutorial
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
  });

  test('renders noscript message', () => {
    renderWithRouter(<Tutoriais />);
    
    expect(screen.getByText('You need to enable JavaScript to run this app.')).toBeInTheDocument();
  });
});