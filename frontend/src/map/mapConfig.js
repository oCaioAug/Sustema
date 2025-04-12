// Configuração inicial do mapa: limites, view e instância
export const municipioBounds = L.latLngBounds(
    L.latLng(-22.5689, -44.5469),
    L.latLng(-22.3689, -44.3469)
);

export const map = L.map('map', {
    // maxBounds: municipioBounds,
    maxBoundsViscosity: 1.0,
    minZoom: 4
}).setView([-22.4689, -44.4469], 13);
