import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import UserList from './pages/User/UserList';
import UserCreate from './pages/User/UserCreate';
import UserEdit from './pages/User/UserEdit';
import UserDelete from './pages/User/UserDelete';
import EducationalContentList from './pages/EducationalContent/EducationalContentList';
import EducationalContentCreate from './pages/EducationalContent/EducationalContentCreate';
import EducationalContentEdit from './pages/EducationalContent/EducationalContentEdit';
import EducationalContentDelete from './pages/EducationalContent/EducationalContentDelete';
import EducationalContentView from './pages/EducationalContent/EducationalContentView';
import CollectionPointList from './pages/CollectionPoint/CollectionPointList';
import CollectionPointCreate from './pages/CollectionPoint/CollectionPointCreate';
import CollectionPointEdit from './pages/CollectionPoint/CollectionPointEdit';
import CollectionPointDelete from './pages/CollectionPoint/CollectionPointDelete';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return <>
    <Header />

    <div className="d-flex flex-column min-vh-100">
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Sustema</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/users">Usuário</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/collection-points">Pontos de Coleta</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/educational-content">Conteúdo Educacional</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      {/* <div className="container mt-5 flex-grow-1 bg-light"> */}
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
        <Route path="/users/delete/:id" element={<UserDelete />} />
        <Route path="/educational-content" element={<EducationalContentList />} />
        <Route path="/educational-content/create" element={<EducationalContentCreate />} />
        <Route path="/educational-content/edit/:id" element={<EducationalContentEdit />} />
        <Route path="/educational-content/delete/:id" element={<EducationalContentDelete />} />
        <Route path="/educational-content/view/:id" element={<EducationalContentView />} />
        <Route path="/collection-points" element={<CollectionPointList />} />
        <Route path="/collection-points/create" element={<CollectionPointCreate />} />
        <Route path="/collection-points/edit/:id" element={<CollectionPointEdit />} />
        <Route path="/collection-points/delete/:id" element={<CollectionPointDelete />} />
      </Routes>
      {/* </div> */}

      <div className="container around">
      <div className="tituloTexto">
        <h2>Sobre Nós</h2>
        <p className="texto">
          Sustema é uma iniciativa destinada a incentivar e orientar o descarte
        e a reciclagem adequada de equipamentos eletrônicos. Ao incentivar práticas de consumo consciente e o reaproveitamento de materiais, a iniciativa contribui significativamente para a redução do impacto ambiental e a promoção de uma economia mais sustentável e responsável.
        </p>
      </div>

      <picture className="showImg">
        <img src="./imgs/lamp.jpg" alt="Imagem de uma lâmpada"/>
      </picture>
    </div>

    <div className="container around">
      <div className="tituloTexto">
        <h2>Motivação</h2>
        <p className="texto">
          Com o avanço contínuo da tecnologia e sua crescente utilização, 
          observamos um aumento significativo na geração de resíduos eletrônicos, 
          o que impõe desafios cada vez maiores à gestão ambiental e à sustentabilidade.
        </p>
      </div>

      <picture className="showImg">
        <img src="./imgs/pessoas.jpg" alt="Imagem de pessoas"/>
      </picture>
    </div>

    <div className="container around">
      <div className="tituloTexto">
        <h2>Estatísticas</h2>
        <p className="texto">
          Estatísticas revelam a importância de cuidarmos da nossa terra.
          Confira os dados referentes à coleta de cada material.
        </p>
        <br/>
          {/* <button className="btn" onClick={() => window.location.href = 'tutorials.html'}>Estatísticas</button> */}
          <Link to="/estatisticas" className="btn">Estatísticas</Link>
      </div>

      <picture className="showImg">
        <img src="./imgs/graphic.jpg" alt="Gráfico ilustrativo"/>
      </picture>
    </div>

    <div className="container around">
      <div className="tituloTexto">
        <h2>Aprenda e Ensine</h2>
        <p>
          A cada dia descartamos diversos residuos.
          Cada um de nós é responsavel pelo seu próprio material,
          sabe como descartá-lo ou até mesmo reaproveitá-lo? Aprenda conosco!
        </p>
        <br/>
          {/* <button className="btn" onClick={() => window.location.href = 'tutorials.html'}>Conscientização</button> */}
          <Link to="/conscientizacao" className="btn">Conscientização</Link>
          
      </div>

      <picture className="showImg">
        <img src="./imgs/aula.jpg" alt="Aula sobre conscientização"/>
      </picture>
    </div>


    <noscript>Habilite o JavaScript para acessar essa página.</noscript>

      {/* <footer className="bg-light text-center text-lg-start mt-auto">
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © {new Date().getFullYear()} Sustema. Todos os direitos reservados.
        </div>
      </footer> */}
    </div>

    <Footer />
  </>;
}

export default App;
