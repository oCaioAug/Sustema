import { map, municipioBounds } from "./mapConfig.js";

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
}).addTo(map);

// map.on('drag', () => {
//     map.panInsideBounds(municipioBounds, { animate: false });
// });

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    // opacity: 0.3,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team'
}).addTo(map);

export const baseLayers = {
    "Mapa Claro": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }),
    "Modo Escuro": L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
        // minZoom: 10, // Mantido um mínimo para evitar falhas
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    })
};

L.control.layers(baseLayers, null, {position: 'topright'}).addTo(map);

// const legend = L.control({position: 'bottomright'});
// legend.onAdd = function() {
//     const div = L.DomUtil.create('div', 'info legend');
//     div.style.backgroundColor = '#f8f9fa';
//     div.style.padding = '10px';
//     div.style.borderRadius = '5px';
//     div.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
//     div.innerHTML = '<strong>Tipos de Reciclagem</strong>';
//     return div;
// };
// legend.addTo(map);
