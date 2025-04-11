// detalhes.js

// Converte links do YouTube para formato embed.
function getEmbedURL(url) {
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtube.com/watch?v=")) {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
  
  // Recupera o ID do conteúdo a partir da query string.
  const urlParams = new URLSearchParams(window.location.search);
  const conteudoId = urlParams.get('id');
  const conteudos = JSON.parse(localStorage.getItem("conteudosEducacionais")) || [];
  let conteudo = conteudos.find(c => String(c.id) === String(conteudoId));
  
  // Renderiza as informações do conteúdo na página.
  function renderConteudo() {
    if (conteudo) {
      document.title = conteudo.titulo || 'Detalhes do Conteúdo';
      document.querySelector('.titulo-detalhes').textContent = conteudo.titulo || '';
      document.querySelector('.categoria-detalhes').textContent = conteudo.tipo || '';
      document.querySelector('.data-detalhes').textContent = `Publicado em: ${conteudo.dataPublicacao ? new Date(conteudo.dataPublicacao).toLocaleDateString() : ''}`;
      document.querySelector('.autor-detalhes').textContent = `Autor: ${conteudo.autor || ''}`;
      document.querySelector('.descricao-detalhes').textContent = conteudo.descricao || '';
  
      const textoDiv = document.getElementById('conteudo-texto');
      const videoIframe = document.getElementById('conteudo-video');
  
      const tipoLower = (conteudo.tipo || '').toLowerCase();
      if (tipoLower === 'vídeo' || tipoLower === 'video') {
        textoDiv.style.display = 'none';
        videoIframe.src = getEmbedURL(conteudo.conteudo);
        videoIframe.style.display = 'block';
      } else {
        videoIframe.style.display = 'none';
        // A propriedade white-space: pre-wrap (definida no CSS) preserva as quebras de linha.
        textoDiv.textContent = conteudo.conteudo;
        textoDiv.style.display = 'block';
      }
    } else {
      document.querySelector('.container-detalhes').innerHTML = `
        <div class="erro-conteudo">
          <h2>Conteúdo não encontrado</h2>
          <p>O conteúdo solicitado não está disponível.</p>
          <a href="conteudoEducacionalIndex.html" class="botao-voltar">Voltar para a lista</a>
        </div>
      `;
    }
  }
  
  // Exclui o conteúdo e simula uma chamada DELETE.
  function excluirConteudo() {
    if (confirm("Tem certeza que deseja excluir este conteúdo?")) {
      const novosConteudos = conteudos.filter(c => String(c.id) !== String(conteudoId));
      localStorage.setItem("conteudosEducacionais", JSON.stringify(novosConteudos));
      console.log("DELETE (simulado):", JSON.stringify({ id: conteudoId }));
      alert("Conteúdo excluído!");
      window.location.href = "conteudoEducacionalIndex.html";
    }
  }
  
  // Abre o modal de edição e preenche os campos com os dados atuais.
  function abrirModalEdicao() {
    document.getElementById('editarTitulo').value = conteudo.titulo;
    document.getElementById('editarDescricao').value = conteudo.descricao;
    document.getElementById('editarTipo').value = conteudo.tipo;
    if ((conteudo.tipo || '').toLowerCase() === 'vídeo' || (conteudo.tipo || '').toLowerCase() === 'video') {
      document.getElementById('labelEditarConteudo').textContent = "URL do Vídeo:";
      document.getElementById('editarConteudoUrl').value = conteudo.conteudo;
      document.getElementById('editarConteudoUrl').classList.remove('hidden');
      document.getElementById('editarConteudoTexto').classList.add('hidden');
    } else {
      document.getElementById('labelEditarConteudo').textContent = "Conteúdo do Artigo:";
      document.getElementById('editarConteudoTexto').value = conteudo.conteudo;
      document.getElementById('editarConteudoTexto').classList.remove('hidden');
      document.getElementById('editarConteudoUrl').classList.add('hidden');
    }
    // A imagem não é pré-carregada para o input file nesta simulação.
    document.getElementById('modalEditar').style.display = 'flex';
  }
  
  // Fecha o modal de edição.
  function fecharModalEdicao() {
    document.getElementById('modalEditar').style.display = 'none';
  }
  
  // Altera os campos do formulário de edição de acordo com o tipo selecionado.
  document.getElementById('editarTipo').addEventListener('change', function() {
    const tipo = this.value;
    if (tipo.toLowerCase() === 'artigo') {
      document.getElementById('labelEditarConteudo').textContent = "Conteúdo do Artigo:";
      document.getElementById('editarConteudoTexto').classList.remove('hidden');
      document.getElementById('editarConteudoUrl').classList.add('hidden');
    } else {
      document.getElementById('labelEditarConteudo').textContent = "URL do Vídeo:";
      document.getElementById('editarConteudoUrl').classList.remove('hidden');
      document.getElementById('editarConteudoTexto').classList.add('hidden');
    }
  });
  
  // Processa o formulário de edição e simula uma chamada PUT.
  document.getElementById('formEditar').addEventListener('submit', function(e) {
    e.preventDefault();
    conteudo.titulo = document.getElementById('editarTitulo').value;
    conteudo.descricao = document.getElementById('editarDescricao').value;
    conteudo.tipo = document.getElementById('editarTipo').value;
    if ((conteudo.tipo || '').toLowerCase() === 'artigo') {
      conteudo.conteudo = document.getElementById('editarConteudoTexto').value;
    } else {
      conteudo.conteudo = document.getElementById('editarConteudoUrl').value;
    }
    
    // A imagem não é processada nesta simulação.
    
    const index = conteudos.findIndex(c => String(c.id) === String(conteudoId));
    conteudos[index] = conteudo;
    localStorage.setItem("conteudosEducacionais", JSON.stringify(conteudos));
    console.log("PUT (simulado):", JSON.stringify(conteudo));
    fecharModalEdicao();
    renderConteudo();
    alert("Conteúdo atualizado!");
  });
  
  // Inicializa os eventos assim que o DOM estiver carregado.
  document.addEventListener("DOMContentLoaded", () => {
    renderConteudo();
    document.querySelector(".botao-excluir-conteudo").addEventListener("click", excluirConteudo);
    document.querySelector(".botao-editar-conteudo").addEventListener("click", abrirModalEdicao);
    document.getElementById("fecharModalEditar").addEventListener("click", fecharModalEdicao);
    document.getElementById("cancelarEdicao").addEventListener("click", fecharModalEdicao);
  });
  