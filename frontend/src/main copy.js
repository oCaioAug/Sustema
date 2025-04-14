import { createMap } from "./map/mapConfig.js";
import { getPontos } from "./services/apiService.js";
import { criarIcone } from "./map/mapIcons.js";
import "./map/mapLayers.js";
import { initFormEvents } from "./components/formHandler.js";
import { carregarMarcadores, initModalEvents } from "./components/modalHandler.js";

async function carregarPontos() {
    const pontos = await getPontos();
    pontos.forEach(adicionarMarcador);
}

window.addEventListener('load', () => {
    const map = createMap('map');
    carregarMarcadores(map);
    initFormEvents();
    initModalEvents(map);
});
