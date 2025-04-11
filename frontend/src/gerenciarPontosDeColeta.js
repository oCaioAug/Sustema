import { buscarPontos, prepararDados, carregarPontosDoLocalStorage, salvarPontosNoLocalStorage } from "./api/mockData.js";

let pontosColeta = [];

async function carregarPontos() {
    try {
        document.getElementById("lista-pontos-container").innerHTML = '<div class="carregando">Carregando pontos de coleta...</div>';
        
        const dadosLocalStorage = carregarPontosDoLocalStorage();
        if (dadosLocalStorage.length > 0) {
            pontosColeta = prepararDados(dadosLocalStorage);
        } else {
            const dados = await buscarPontos();
            pontosColeta = prepararDados(dados);
            salvarPontosNoLocalStorage(pontosColeta);
        }
        
        renderizarPontos();
    } catch (error) {
        console.error("Erro ao carregar pontos:", error);
        document.getElementById("lista-pontos-container").innerHTML = '<div class="erro">Erro ao carregar pontos de coleta.</div>';
    }
}

function renderizarPontos() {
    const container = document.getElementById("lista-pontos-container");
    
    if (pontosColeta.length === 0) {
        container.innerHTML = '<div class="nenhum-ponto">Nenhum ponto de coleta cadastrado.</div>';
        return;
    }
    
    container.innerHTML = "";
    
    pontosColeta.forEach(ponto => {
        const item = document.createElement("div");
        item.className = "ponto-item";
        item.innerHTML = `
            <span>${ponto.nome}</span>
            <span>${ponto.endereco}</span>
            <span>${ponto.tipo}</span>
            <div class="acoes-item">
                <button class="botao-acao botao-editar" data-id="${ponto.id}">Editar</button>
                <button class="botao-acao botao-excluir" data-id="${ponto.id}">Excluir</button>
            </div>
        `;
        container.appendChild(item);
    });
    
    adicionarEventosBotoes();
}

function adicionarEventosBotoes() {


    document.querySelectorAll(".botao-editar").forEach(btn => {
        btn.addEventListener("click", function() {
            editarPonto(parseInt(this.getAttribute("data-id")));
        });
    });
    
    document.querySelectorAll(".botao-excluir").forEach(btn => {
        btn.addEventListener("click", function() {
            excluirPonto(parseInt(this.getAttribute("data-id")));
        });
    });
}

document.addEventListener("DOMContentLoaded", carregarPontos);
function editarPonto(id) {
    const formEdicao = document.getElementById("form-edicao");
    const btnCancelar = document.getElementById("btnCancelar");
    const formEditar = document.getElementById("formEditarPonto");

    // Clona o formulário para remover listeners antigos
    const novoFormEditar = formEditar.cloneNode(true);
    formEditar.replaceWith(novoFormEditar);

    // Reatribui o evento ao botão "Cancelar"
    document.getElementById("btnCancelar").onclick = function() {
        formEdicao.style.display = "none";
    };

    const ponto = pontosColeta.find(p => p.id === id);
    
    if (ponto) {
        document.getElementById("editar-id").value = ponto.id;
        document.getElementById("editar-nome").value = ponto.nome;
        document.getElementById("editar-endereco").value = ponto.endereco;
        document.getElementById("editar-tipo").value = ponto.tipo;
        
        formEdicao.style.display = "block";

        novoFormEditar.addEventListener("submit", function(e) {
            e.preventDefault();
            
            ponto.nome = document.getElementById("editar-nome").value;
            ponto.endereco = document.getElementById("editar-endereco").value;
            ponto.tipo = document.getElementById("editar-tipo").value;
            
            salvarPontosNoLocalStorage(pontosColeta);
            
            console.log("POST /api/pontos/editar", JSON.stringify(ponto, null, 2));
            
            renderizarPontos();
            formEdicao.style.display = "none";
            alert("Ponto atualizado com sucesso!");
        });
    }
}



function excluirPonto(id) {
    if (confirm("Tem certeza que deseja excluir este ponto?")) {
        pontosColeta = pontosColeta.filter(p => p.id !== id);
        salvarPontosNoLocalStorage(pontosColeta);
        renderizarPontos();
    }
}
