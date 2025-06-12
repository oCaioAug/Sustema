import React, { useEffect, useRef } from 'react';
import MapComponent from '../../map/MapComponent';
import '../styles/CollectionPoint/CollectionPointMap.css';
import axiosInstance from '../../helper/axios-instance';
import L from 'leaflet';

const CollectionPointMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);

  const fetchCollectionPoints = async () => {
    try {
      const response = await axiosInstance.get('/CollectionPoint');
      const points = response.data?.data ?? response.data;
      if (mapRef.current) {
        points.forEach((point: any) => {
          L.marker([point.latitude, point.longitude], {
            icon: L.icon({
              iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41]
            })
          })
            .addTo(mapRef.current!)
            .bindPopup(`<b>${point.nome}</b><br>${point.descricao}`);
        });
      }
    } catch {
      alert('Erro ao carregar os pontos de coleta. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    fetchCollectionPoints();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="collection-point-btn-wrapper">
        <a
          href="/collection-points/"
          className="collection-point-manage-link"
        >
          Gerenciar Pontos
        </a>
      </div>
      <div style={{ flex: 1, minHeight: 0, margin: '0 2rem 2rem 2rem' }}>
        <MapComponent
          onMapClick={() => console.log('Map clicked')}
          mapRef={mapRef}
        />
      </div>
    </div>
  );
};

export default CollectionPointMap;
