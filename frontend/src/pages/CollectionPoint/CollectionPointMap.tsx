import React from 'react';
import MapComponent from '../../map/MapComponent';

const CollectionPointMap: React.FC = () => {
  return (
    <div>
      <h1>Pontos de Coleta</h1>
      <MapComponent 
        onMapClick={() => console.log('Map clicked')} 
        mapRef={React.createRef()} 
      />
    </div>
  );
};

export default CollectionPointMap;