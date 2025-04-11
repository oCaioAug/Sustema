// Serviços geográficos: busca de endereço via CEP e geocodificação com Nominatim

export async function buscarEnderecoPorCEP(cep) {
    if (cep.length !== 8) return null;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.erro) return null;
        return {
            estado: data.uf,
            cidade: data.localidade,
            bairro: data.bairro,
            rua: data.logradouro,
            cep: data.cep
        };
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        return null;
    }
}

export async function obterCoordenadas(endereco) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
        return null;
    } catch (error) {
        console.error('Erro ao obter coordenadas:', error);
        return null;
    }
}
