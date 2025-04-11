import { adicionarConteudo } from '../api/mockDataEdu.js';


const form = document.getElementById('formConteudo');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const titulo = document.getElementById('titulo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const tipo = document.getElementById('tipo').value;
  let conteudo = "";
  
  if (tipo === "Artigo") {
    conteudo = document.getElementById('conteudoTexto').value.trim();
  } else {
    conteudo = document.getElementById('conteudoUrl').value.trim();
  }
  
  const dataPublicacao = new Date().toISOString().split('T')[0];
  const autor = "Admin";
  
  // Função para ler o arquivo e convertê-lo para Base64
  const arquivoInput = document.getElementById('imagemUpload');
  const arquivo = arquivoInput.files[0];
  
  function lerArquivoComoDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
  
  let imagemBase64 = "";
  if (arquivo) {
    try {
      imagemBase64 = await lerArquivoComoDataURL(arquivo);
    } catch (error) {
      console.error("Erro ao ler a imagem", error);
    }
  }
  
  // Novo objeto de conteúdo, incluindo a imagem
  const novoConteudo = { 
    titulo, 
    descricao, 
    tipo, 
    conteudo, 
    dataPublicacao, 
    autor, 
    imagem: imagemBase64  // pode ser vazio caso nenhum arquivo tenha sido enviado
  };

  try {
    await adicionarConteudo(novoConteudo);
    window.location.href = "conteudoEducacionalIndex.html";
  } catch (error) {
    console.error(error);
  }
});
