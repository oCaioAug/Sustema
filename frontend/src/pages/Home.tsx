import { Link } from "react-router-dom";
import useDocumentTitle from '../helper/useDocumentTitle';

const Home = () => {

  useDocumentTitle("Home - Sustema");

  return (<>
    <div className="container around">
      <div className="tituloTexto">
        <h2>Sobre Nós</h2>
        <p className="texto">
          Sustema é uma iniciativa destinada a incentivar e orientar o descarte
          e a reciclagem adequada de equipamentos eletrônicos. Ao incentivar práticas de consumo consciente e o reaproveitamento de materiais, a iniciativa contribui significativamente para a redução do impacto ambiental e a promoção de uma economia mais sustentável e responsável.
        </p>
      </div>

      <picture className="showImg">
        <img src="./imgs/lamp.jpg" alt="Imagem de uma lâmpada" />
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
        <img src="./imgs/pessoas.jpg" alt="Imagem de pessoas" />
      </picture>
    </div>

    <div className="container around">
      <div className="tituloTexto">
        <h2>Estatísticas</h2>
        <p className="texto">
          Estatísticas revelam a importância de cuidarmos da nossa terra.
          Confira os dados referentes à coleta de cada material.
        </p>
        <br />
        {/* <button className="btn" onClick={() => window.location.href = 'tutorials.html'}>Estatísticas</button> */}
        <Link to="/estatisticas" className="btn">Estatísticas</Link>
      </div>

      <picture className="showImg">
        <img src="./imgs/graphic.jpg" alt="Gráfico ilustrativo" />
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
        <br />
        {/* <button className="btn" onClick={() => window.location.href = 'tutorials.html'}>Conscientização</button> */}
        <Link to="/conscientizacao" className="btn">Conscientização</Link>

      </div>

      <picture className="showImg">
        <img src="./imgs/aula.jpg" alt="Aula sobre conscientização" />
      </picture>
    </div>
    <noscript>Habilite o JavaScript para acessar essa página.</noscript>
  </>);
}

export default Home;