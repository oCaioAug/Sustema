// Dados simulados da API utilizando localStorage
function carregarPontosDoLocalStorage() {
    const dados = localStorage.getItem("pontosReciclagem");
    return dados ? JSON.parse(dados) : [];
}

function salvarPontosNoLocalStorage(pontos) {
    localStorage.setItem("pontosReciclagem", JSON.stringify(pontos));
}

function carregarPontos() {
    let pontosIniciais = [
        {
            id: 1,
            nome: "Ponto de Reciclagem Centro",
            tipo: "Eletrônico",
            lat: -22.4689,
            lng: -44.4469,
            descricao: "teste1",
            endereco: "teste1",
        },
        {
            id: 2,
            nome: "Ponto de Reciclagem Jardim Jalisco",
            tipo: "Orgânico",
            lat: -22.4735,
            lng: -44.4523,
            descricao: "teste2",
            endereco: "teste2",
        },
        {
            id: 3,
            nome: "Ponto de Reciclagem Vila Moderna",
            tipo: "Metal",
            lat: -22.4667,
            lng: -44.4384,
            descricao: "teste3",
            endereco: "teste3",
        },
        {
            id: 4,
            nome: "Ponto de Reciclagem Parque das Águas",
            tipo: "Químico",
            lat: -22.4702,
            lng: -44.4418,
            descricao: "teste4",
            endereco: "teste4",
        },
        {
            id: 5,
            nome: "Ponto de Reciclagem Nova Liberdade",
            tipo: "Eletrônico",
            lat: -22.4758,
            lng: -44.4476,
            descricao: "teste5",
            endereco: "teste5",
        }
    ];
    
    const pontosSalvos = carregarPontosDoLocalStorage();
    return pontosSalvos.length > 0 ? pontosSalvos : pontosIniciais;
}

let pontos = carregarPontos();

function buscarPontos() {
    return Promise.resolve([...pontos]);
}

function adicionarPonto(novoPonto) {
    novoPonto.id = pontos.length ? Math.max(...pontos.map(p => p.id)) + 1 : 1;
    pontos.push(novoPonto);
    salvarPontosNoLocalStorage(pontos);
    return novoPonto;
}

function prepararDados(pontos) {
    return pontos.map((ponto, index) => ({
        ...ponto,
        id: ponto.id || index + 1
    }));
}

export { pontos, buscarPontos, adicionarPonto, prepararDados, carregarPontosDoLocalStorage, salvarPontosNoLocalStorage };