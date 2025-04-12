

const Tutoriais = () => {
  return (<>
    <div className="titleAndText">
      <h1>Conscientização e Tutoriais</h1>
      <p>Aprenda mais sobre como reciclar e reutilizar os seus eletrônicos!</p>
    </div>

    <div className="container center bg">

      <a href="#a" className="areaimg btn-effect column around">
        <picture>
          <img src="./imgs/green.jpeg" alt="Imagem ilustrativa de um eletrônico" />
        </picture>
        <p>Celular</p>
      </a>

      <a href="#a" className="areaimg btn-effect column around">
        <picture>
          <img src="./imgs/green.jpeg" alt="Imagem ilustrativa de um computador" />
        </picture>
        <p>Computador</p>
      </a>

      <a href="#a" className="areaimg btn-effect column around">
        <picture>
          <img src="./imgs/green.jpeg" alt="Imagem ilustrativa de um notebook" />
        </picture>
        <p>Notebooks</p>
      </a>

      <a href="#a" className="areaimg btn-effect column around">
        <picture>
          <img src="./imgs/green.jpeg" alt="Imagem ilustrativa de um eletrônico" />
        </picture>
        <p>Eletrônicos</p>
      </a>
    </div>

    <noscript>You need to enable JavaScript to run this app.</noscript>
  </>);
}

export default Tutoriais;