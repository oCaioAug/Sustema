// Importa os dados simulados e expõe a função de busca
import { buscarPontos } from "../api/mockData.js";

export async function getPontos() {
    return await buscarPontos();
}
