import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { createMap } from './mapConfig';
import { criarIcone } from './mapIcons';
import { addLayersToMap } from './mapLayers';
import './MapComponent.css';
import 'leaflet/dist/leaflet.css'; // Importar estilos do Leaflet

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    // Esta função inicializa o mapa
    const initMap = () => {
      // Certifique-se de que o elemento DOM existe
      const mapElement = document.getElementById('map');
      if (!mapElement) return;

      try {
        // Configurando o mapa com as opções básicas
        const map = L.map('map', {
          center: [-22.4689, -44.4469],
          zoom: 8
        });

        // Adicionando a camada de tiles do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        // Adicionando um marcador de exemplo
        const marker = L.marker([-22.4689, -44.4469], { icon: criarIcone('Orgânico') });
        marker.addTo(map).bindPopup('Exemplo de Ponto de Coleta');

        // Adicionando outras camadas configuradas
        addLayersToMap(map);

        // Armazenando a referência do mapa para uso posterior
        mapRef.current = map;
        mapInitializedRef.current = true;

        // Forçar um recálculo de tamanho do mapa quando a janela for redimensionada
        const handleResize = () => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        };

        window.addEventListener('resize', handleResize);
        
        // Isso vai garantir que o mapa seja redimensionado após a renderização completa
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        }, 300);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error("Erro ao inicializar o mapa:", error);
      }
    };

    // Inicializa o mapa apenas uma vez
    if (!mapInitializedRef.current) {
      initMap();
    }

    // Função de limpeza ao desmontar o componente
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        mapInitializedRef.current = false;
      }
    };
  }, []);

  return (
    <div 
      id="map" 
      style={{
        width: '100%',
        height: '400px',
        position: 'relative'
      }} 
    />
  );
};

export default MapComponent;