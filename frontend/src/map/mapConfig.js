// Configuração inicial do mapa: limites, view e instância
import L from 'leaflet';

export const municipioBounds = L.latLngBounds(
    L.latLng(-22.5689, -44.5469),
    L.latLng(-22.3689, -44.3469)
);

export function createMap(containerId) {
    return L.map(containerId, {
        maxBounds: municipioBounds,
        maxBoundsViscosity: 1.0,
        minZoom: 4
    }).setView([-22.4689, -44.4469], 13);
}
