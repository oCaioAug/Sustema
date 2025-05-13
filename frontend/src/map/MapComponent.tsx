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
  onMapClick: (lat: number, lng: number, ev: L.LeafletMouseEvent) => void;

  /**
   * Ref externa opcional para obter acesso ao objeto Leaflet.Map
   * a partir do componente pai.
   */
  mapRef: React.RefObject<L.Map | null>;

  /**
   * Marcadores iniciais a serem exibidos no mapa.
   * Cada marcador pode ter uma posição (lat, lng) e um texto para o popup.
   */
  initialMarkers?: { lat: number; lng: number; popup: string }[];
}

const MapComponent: React.FC<MapComponentProps> = ({ mapRef, onMapClick, initialMarkers }) => {
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

        // Adiciona marcadores iniciais, se fornecidos
        if (initialMarkers) {
          initialMarkers.forEach(({ lat, lng, popup }) => {
            L.marker([lat, lng], { icon: criarIcone('Orgânico') })
              .addTo(map)
              .bindPopup(popup);
          });
        }

        // Evento de clique: repassa lat, lng e o próprio evento
        map.on('click', (e: L.LeafletMouseEvent) => {
          onMapClick(e.latlng.lat, e.latlng.lng, e);
        });

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
  }, [onMapClick, mapRef, initialMarkers]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      // Add initial markers if provided
      if (initialMarkers) {
        initialMarkers.forEach(marker => {
          L.marker([marker.lat, marker.lng])
            .addTo(map)
            .bindPopup(marker.popup);
        });
      }

      map.on('click', (e: L.LeafletMouseEvent) => {
        onMapClick(e.latlng.lat, e.latlng.lng, e);
      });
    }
  }, [mapRef, onMapClick, initialMarkers]);

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
