import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  test('renders footer sections correctly', () => {
    renderWithRouter(<Footer />);
    
    // Verifica seção "Sobre"
    expect(screen.getByText('Sustema')).toBeInTheDocument();
    expect(screen.getByText('Nossa missão é oferecer soluções inovadoras e de qualidade.')).toBeInTheDocument();
    
    // Verifica seção "Links Rápidos"
    expect(screen.getByText('Links Rápidos')).toBeInTheDocument();
    
    // Verifica seção "Contato"
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('contato@exemplo.com')).toBeInTheDocument();
  });

  test('renders navigation links with correct hrefs', () => {
    renderWithRouter(<Footer />);
    
    expect(screen.getByText('Início').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Sobre Nós').closest('a')).toHaveAttribute('href', '/sobre');
    expect(screen.getByText('Estatísticas').closest('a')).toHaveAttribute('href', '/estatisticas');
    expect(screen.getByText('Tutoriais').closest('a')).toHaveAttribute('href', '/tutoriais');
  });

  test('renders copyright information', () => {
    renderWithRouter(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Sustema. Todos os direitos reservados.`)).toBeInTheDocument();
  });

  test('renders social media links', () => {
    renderWithRouter(<Footer />);
    
    expect(screen.getByText('Redes Sociais')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });
});