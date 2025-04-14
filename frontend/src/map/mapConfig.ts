import L from 'leaflet';

export const municipioBounds = L.latLngBounds(
    L.latLng(-22.5689, -44.5469),
    L.latLng(-22.3689, -44.3469)
);

export const createMap = (containerId: string): L.Map => {
  // Criação do mapa com opções aprimoradas
  const map = L.map(containerId, {
    center: [-22.4689, -44.4469], // Centro do mapa (Brasil)
    zoom: 8,                      // Nível de zoom inicial
    zoomControl: true,            // Controles de zoom
    minZoom: 3,                   // Zoom mínimo permitido
    maxZoom: 18,                  // Zoom máximo permitido
    preferCanvas: true,           // Usar canvas para melhor performance
    renderer: L.canvas(),         // Usar renderer canvas
    fadeAnimation: false,         // Desabilita animações para melhor performance
    zoomAnimation: true,          // Mantém animação de zoom
    maxBounds: municipioBounds,   // Limites do mapa
  });
  
  return map;
};