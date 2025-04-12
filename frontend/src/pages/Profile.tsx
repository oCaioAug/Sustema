import './styles/Profile.css'; // Atualizando o caminho para o arquivo CSS no diretório correto

const Profile = () => {
  return (<>
    <div className="wrapper">
      <div className="container column bg">
        <div className="profile-header">
          <picture className="areaimg">
            <img src="./imgs/user.png" alt="Foto de Perfil" className="profile-pic" />
          </picture>
          <div className="profile-info">
            <h2>Nome do Usuário</h2>
            <p>Localização: Cidade, Estado</p>
            <p>Sobre: Uma breve descrição sobre o usuário.</p>
          </div>
          <div className="profile-badges">
            <div className="badgeSlot">
              <div className="badge">
                <picture>
                  <img src="./favicon.ico" alt="" />
                </picture>
              </div>
            </div>
          </div>
        </div>
        <div className="posts">
          <h3>Postagens</h3>
          <div className="post">
            <p>Postagem</p>
          </div>
          <div className="post">
            <p>Postagem</p>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default Profile;