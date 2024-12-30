// src/pages/Home.tsx
import React from 'react';
import { World, GlobeConfig } from './ui/globe.tsx'; // Adjust the import path

const Globe: React.FC = () => {
  const globeConfig: GlobeConfig = {
    pointSize: 2,
    globeColor: '#1d072e',
    showAtmosphere: true,
    atmosphereColor: '#ffffff',
    atmosphereAltitude: 0.1,
    emissive: '#000000',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: 'rgba(255, 255, 255, 0.7)',
    ambientLight: '#ffffff',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: {
      lat: 0,
      lng: 0,
    },
    autoRotate: true,
    autoRotateSpeed: 1,
  };

  // Sample data for arcs
  const data = [
    {
      order: 0,
      startLat: 37.7749,  // Example latitude
      startLng: -122.4194, // Example longitude
      endLat: 40.7128,     // Example latitude
      endLng: -74.0060,    // Example longitude
      arcAlt: 0.5,
      color: '#ff0000',    // Example color
    },
    // Add more arcs as needed
  ];

  return (
    <div style={{ height: '100vh' }}>
      <World globeConfig={globeConfig} data={data} />
    </div>
  );
};

export default Globe;