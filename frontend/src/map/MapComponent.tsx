// filepath: c:\Sustema\frontend\src\map\MapComponent.tsx

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { criarIcone } from './mapIcons';
import { addLayersToMap } from './mapLayers';
import './MapComponent.css';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  /**
   * Função opcional que será chamada ao clicar no mapa,
   * passando latitude, longitude e o evento do Leaflet.
   */
  onMapClick?: (lat: number, lng: number, event: L.LeafletMouseEvent) => void;

  /**
   * Ref externa opcional para obter acesso ao objeto Leaflet.Map
   * a partir do componente pai.
   */
  mapRef?: React.RefObject<L.Map | null>;
}

const MapComponent: React.FC<MapComponentProps> = ({ onMapClick, mapRef }) => {
  // Se o usuário passou uma mapRef externa, usaremos ela,
  // caso contrário criaremos uma interna.
  const internalMapRef = useRef<L.Map | null>(null);
  const mapInitializedRef = useRef<boolean>(false);

  // decide qual ref usar
  const mapRefToUse = mapRef ?? internalMapRef;

  useEffect(() => {
    const initMap = () => {
      const mapElement = document.getElementById('map');
      if (!mapElement) return;

      try {
        const map = L.map('map', {
          center: [-22.4689, -44.4469],
          zoom: 8
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        // Exemplo de marcador
        const marker = L.marker([-22.4689, -44.4469], { icon: criarIcone('Orgânico') });
        marker.addTo(map).bindPopup('Exemplo de Ponto de Coleta');

        // Adiciona camadas extras
        addLayersToMap(map);

        // Evento de clique: repassa lat, lng e o próprio evento
        if (onMapClick) {
          map.on('click', (e: L.LeafletMouseEvent) => {
            onMapClick(e.latlng.lat, e.latlng.lng, e);
          });
        }

        // Guarda a instância do mapa na ref escolhida
        mapRefToUse.current = map;
        mapInitializedRef.current = true;

        // Reajusta mapa ao redimensionar janela
        const handleResize = () => {
          mapRefToUse.current?.invalidateSize();
        };
        window.addEventListener('resize', handleResize);

        // Pequeno timeout para garantir que o container já esteja dimensionado
        setTimeout(() => mapRefToUse.current?.invalidateSize(), 300);

        // cleanup do resize
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('Erro ao inicializar o mapa:', error);
      }
    };

    if (!mapInitializedRef.current) {
      initMap();
    }

    return () => {
      // Ao desmontar, remove o mapa e limpa as refs
      if (mapRefToUse.current) {
        mapRefToUse.current.off();   // remove todos os listeners
        mapRefToUse.current.remove();
        mapRefToUse.current = null;
        mapInitializedRef.current = false;
      }
    };
  }, [onMapClick, mapRef]);

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
export type { MapComponentProps };
export { criarIcone } from './mapIcons';
export { addLayersToMap } from './mapLayers';
