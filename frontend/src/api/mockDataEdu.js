// mockDataEdu.js

// Funções de armazenamento
export function carregarConteudosDoLocalStorage() {
    const dados = localStorage.getItem("conteudosEducacionais");
    return dados ? JSON.parse(dados) : [];
}

export function salvarConteudosNoLocalStorage(conteudos) {
    localStorage.setItem("conteudosEducacionais", JSON.stringify(conteudos));
}

// Dados iniciais
const conteudosIniciais = [
    {
        id: 1,
        titulo: "Como Reciclar Agulhas",
        tipo: "Artigo",
        descricao: "Guia completo para descarte seguro de materiais perfurocortantes",
        conteudo: `

O descarte adequado de agulhas usadas é uma prática essencial para proteger a saúde pública e preservar o meio ambiente. Quando descartadas incorretamente, essas peças perfurocortantes representam um risco grave, pois podem causar acidentes com ferimentos a trabalhadores de coleta de lixo, catadores ou até mesmo familiares que entrem em contato acidentalmente com o material. Além disso, agulhas contaminadas com sangue ou fluidos corporais são vetores potenciais de transmissão de doenças infecciosas, como HIV, hepatite B e C, cujos vírus podem permanecer ativos por horas em superfícies. O impacto ambiental também é significativo: o descarte em lixões ou aterros inadequados contamina solos e corpos d’água, comprometendo ecossistemas e a qualidade de recursos naturais.

Para garantir um descarte seguro, é fundamental seguir protocolos específicos. Inicialmente, as agulhas devem ser armazenadas em recipientes resistentes e vedáveis, preferencialmente coletores certificados de plástico rígido, com tampa rosqueável e identificação clara de risco biológico. Caso não haja acesso a esses coletores, uma alternativa segura é utilizar garrafas PET robustas, como as de amaciante, desde que estejam limpas, secas e com a tampa fixada firmemente, reforçada com fita adesiva. É crucial evitar recipientes frágeis, como vidro ou plástico fino, que possam quebrar ou perfurar. Durante o armazenamento, as agulhas nunca devem ser recapeadas, pois essa prática aumenta o risco de acidentes. O recipiente deve ser preenchido até três quartos de sua capacidade e mantido em local inacessível a crianças e animais. Após três meses de uso ou ao atingir o limite de volume, a tampa deve ser vedada com fita reforçada e identificada com uma etiqueta contendo a expressão “PERFUROCORTANTE - RISCO BIOLÓGICO” e a data de fechamento.

O destino final desses materiais deve ser exclusivamente locais autorizados, como postos de saúde, farmácias participantes de programas de coleta, ecopontos municipais ou empresas especializadas em resíduos hospitalares. Jamais devem ser descartados no lixo comum, reciclável ou misturados a resíduos domésticos. Pacientes que utilizam agulhas em casa, como diabéticos ou indivíduos em terapia hormonal, podem solicitar coleta especializada por meio de serviços municipais, garantindo que o ciclo de descarte seja completado com segurança.

A responsabilidade pelo descarte correto é compartilhada. Legislações como a Resolução RDC 222/2018 da ANVISA e a Lei 12.305/2010 (Política Nacional de Resíduos Sólidos) estabelecem diretrizes rigorosas, e o descumprimento pode resultar em multas elevadas. Além das obrigações legais, trata-se de um compromisso ético com a coletividade: práticas adequadas reduzem custos com saúde pública, evitam contaminações e promovem sustentabilidade. Em caso de acidentes com material perfurocortante contaminado, a lavagem imediata do local com água corrente e a busca por atendimento médico em até duas horas são medidas críticas para minimizar riscos de infecção.

A conscientização individual e o acesso a informações confiáveis, como as disponibilizadas pelo Ministério da Saúde e pela ANVISA, são pilares para transformar hábitos. Reciclar agulhas da maneira correta não é apenas uma questão técnica, mas um ato de respeito à vida e ao planeta, garantindo que avanços médicos não se convertam em ameaças ambientais ou sociais.


`,
        dataPublicacao: "2024-03-15",
        autor: "Secretaria do Meio Ambiente"
    },
    {
        id: 2,
        titulo: "Otimização de Coleta",
        tipo: "Vídeo",
        descricao: "Técnicas para melhorar a eficiência da coleta seletiva",
        conteudo: "https://www.youtube.com/embed/v38wG3th6hc",
        dataPublicacao: "2024-02-28",
        autor: "Instituto de Reciclagem"
    },
    {
        id: 4,
        titulo: "Otimização de Coleta",
        tipo: "Vídeo",
        descricao: "Técnicas para melhorar a eficiência da coleta seletiva",
        conteudo: "https://youtu.be/v38wG3th6hc?si=V6x9EXZV2_r_tJXh",
        dataPublicacao: "2024-02-28",
        autor: "Instituto de Reciclagem"
    },
    {
        id: 5,
        titulo: "Otimização de Coleta",
        tipo: "Vídeo",
        descricao: "Técnicas para melhorar a eficiência da coleta seletiva",
        conteudo: "https://youtube.com/embed/...",
        dataPublicacao: "2024-02-28",
        autor: "Instituto de Reciclagem"
    },
    {
        id: 6,
        titulo: "Otimização de Coleta",
        tipo: "Vídeo",
        descricao: "Técnicas para melhorar a eficiência da coleta seletiva",
        conteudo: "https://youtube.com/embed/...",
        dataPublicacao: "2024-02-28",
        autor: "Instituto de Reciclagem"
    },
    {
        id: 7,
        titulo: "Otimização de Coleta",
        tipo: "Vídeo",
        descricao: "Técnicas para melhorar a eficiência da coleta seletiva",
        conteudo: "https://youtube.com/embed/...",
        dataPublicacao: "2024-02-28",
        autor: "Instituto de Reciclagem"
    },
    {
        id: 8,
        titulo: "Otimização de Coleta",
        tipo: "Vídeo",
        descricao: "Técnicas para melhorar a eficiência da coleta seletiva",
        conteudo: "https://youtube.com/embed/...",
        dataPublicacao: "2024-02-28",
        autor: "Instituto de Reciclagem"
    },
];

// Carregar dados
export let conteudos = carregarConteudosDoLocalStorage();

// Se não houver dados salvos, inicializa com os dados iniciais
if(conteudos.length === 0) {
    conteudos = [...conteudosIniciais];
    salvarConteudosNoLocalStorage(conteudos);
}

// Funções da API
export function buscarConteudosEducacionais() {
    return new Promise((resolve) => {
        // Sempre carrega os dados mais recentes do localStorage
        const conteudosAtualizados = carregarConteudosDoLocalStorage();
        setTimeout(() => resolve(conteudosAtualizados), 500);
    });
}

export function adicionarConteudo(novoConteudo) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const conteudos = carregarConteudosDoLocalStorage();
            novoConteudo.id = Date.now();
            const novosConteudos = [...conteudos, novoConteudo];
            salvarConteudosNoLocalStorage(novosConteudos);
            resolve(novoConteudo);
        }, 300);
    });
}