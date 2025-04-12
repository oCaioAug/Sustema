
import { map } from "./map/mapConfig.js";
import { getPontos } from "./services/apiService.js";
import { criarIcone } from "./map/mapIcons.js";
import "./map/mapLayers.js";
import { initFormEvents } from "./components/formHandler.js";
import { initModalEvents, adicionarMarcador } from "./components/modalHandler.js";

async function carregarPontos() {
    const pontos = await getPontos();
    pontos.forEach(adicionarMarcador);
}

window.addEventListener('load', () => {
    carregarPontos();
    initFormEvents();
    initModalEvents();
});
