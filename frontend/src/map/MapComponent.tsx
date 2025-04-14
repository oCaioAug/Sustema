import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { createMap } from './mapConfig';
import { criarIcone } from './mapIcons';
import { addLayersToMap } from './mapLayers';
import './MapComponent.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifica se o contêiner já existe
    if (!mapContainerRef.current) return;

    // Cria o mapa apenas uma vez
    if (!mapRef.current) {
      // Inicializando o mapa sem tentar definir opções avançadas imediatamente
      const map = L.map('map', {
        center: [-22.4689, -44.4469],
        zoom: 8,
        attributionControl: true,
        zoomControl: true
      });
      
      mapRef.current = map;

      // Adiciona a camada base depois que o mapa for criado
      const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      });
      
      baseLayer.on('load', function() {
        // A camada base foi carregada, agora podemos adicionar outras camadas
        addLayersToMap(map);
        
        // Adiciona um marcador de exemplo
        const marker = L.marker([-22.4689, -44.4469], { icon: criarIcone('Orgânico') });
        marker.addTo(map).bindPopup('Exemplo de Ponto de Coleta');
      });
      
      baseLayer.addTo(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      id="map" 
      ref={mapContainerRef} 
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        backgroundColor: '#f8f9fa'
      }} 
    />
  );
};

export default MapComponent;