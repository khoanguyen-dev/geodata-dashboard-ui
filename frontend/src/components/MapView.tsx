/**
 * MapView component is a reusable React component that renders an interactive map using Leaflet.
 * It provides functionalities to display bird flu data points as markers with clustering or heatmap visualization.
 * It is designed to handle various data inputs and dynamically adjust the view to include all markers.
 * The component is fully responsive and adapts to different screen sizes, making it suitable for use in dashboards
 * that require geospatial data visualization.
 */

import React, { useEffect, useRef } from 'react'; // React core functionalities for lifecycle management and references
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // React-Leaflet components for map rendering and interaction
import L, { LatLngBounds } from 'leaflet'; // Leaflet core library for map functionalities and types
import 'leaflet/dist/leaflet.css'; // Leaflet's default CSS for base map styling and controls
import 'leaflet.heat'; // Leaflet heatmap plugin for rendering heatmaps on the map
import MarkerClusterGroup from 'react-leaflet-cluster'; // Component for clustering markers to manage map readability and performance
import { MapData } from '../types/birdFluTypes'; // Type definitions for map data, ensuring correct data structure
import { fluTypeColors } from '../constants/colors'; // Consistent color scheme for visual differentiation of flu types
import { useTranslation } from 'react-i18next'; // Hook for accessing internationalization and translation functions


interface MapViewProps {
  data: MapData[]; // Array of map data points
  showHeatMap: boolean; // Boolean flag to toggle heatmap visibility
  showClusters: boolean; // Boolean flag to toggle cluster visibility
  mapKey: string | number; // Key prop used to force re-render of the map component
}

// Component responsible for rendering a heatmap layer on the map
const HeatLayer = ({ data }: { data: MapData[] }) => {
  const map = useMap(); // Hook to access the current map instance

  useEffect(() => {
    // Render heat layer only if data is available
    if (map && data.length > 0) {
      // Convert data points into the format required by the heatmap
      const heatData: [number, number, number][] = data.map((entry) => [
        entry.latitude,
        entry.longitude,
        1.0, // Set a uniform intensity value for all data points
      ]);

      // Initialize the heat layer with custom settings
      const heatLayer = L.heatLayer(heatData, {
        radius: 20, // Radius of influence for each point in pixels
        blur: 10, // Blur amount for smooth gradient appearance
        maxZoom: 9, // Maximum zoom level at which the layer is visible
        max: 1.0, // Max intensity for the color gradient scaling
        gradient: {
          0.0: '#0000ff', // Blue at the lowest intensity
          0.2: '#00ff00', // Green at low to medium intensity
          0.4: '#ffff00', // Yellow at medium intensity
          0.6: '#ffa500', // Orange at medium-high intensity
          1.0: '#ff0000', // Red at the highest intensity
        },
      });

      heatLayer.addTo(map); // Add the heat layer to the map instance

      // Cleanup function to remove the heat layer when the component unmounts or data changes
      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [map, data]); // Dependencies: run effect when map instance or data array changes

  return null; // No visual output; the layer is added directly to the map
};

// Component responsible for rendering clusters of markers on the map
const ClusterLayer = ({ data }: { data: MapData[] }) => {
  const { t } = useTranslation(); // Hook for translation

  return (
    <MarkerClusterGroup>
      {data.map((entry, index) => (
        <Marker
          key={index} // Unique key for each marker based on its index
          position={[entry.latitude, entry.longitude]} // Marker position based on data coordinates
          icon={L.divIcon({
            className: 'custom-icon', // CSS class for styling
            html: `<span style="background-color: ${fluTypeColors[entry.fluType]}; width: 10px; height: 10px; display: block; border-radius: 50%;"></span>`, // HTML for the marker icon
          })}
        >
          <Popup> {/* Popup to show additional information about the marker */}
            <div>
              <strong>{t('infectionType')}:</strong> {entry.fluType}<br /> {/* Translated label for Type of Infection */}
              <strong>{t('species')}:</strong> {entry.species}<br /> {/* Translated label for Species */}
              <strong>{t('provenance')}:</strong> {entry.provenance}<br /> {/* Translated label for Provenance */}
              <strong>{t('time')}:</strong> {entry.date} {/* Translated label for Time */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

const MapView: React.FC<MapViewProps> = ({ data, showHeatMap, showClusters, mapKey }) => {
  const mapRef = useRef<L.Map | null>(null); // Ref to hold the Leaflet map instance

  useEffect(() => {
    // Adjust map view to fit all markers whenever the data changes
    if (mapRef.current && data.length > 0) {
      const map = mapRef.current;
      // Calculate bounds to include all data points
      const bounds = new LatLngBounds(data.map(entry => [entry.latitude, entry.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] }); // Fit map to bounds with padding
    }
  }, [data, mapKey]); // Re-run effect when data or mapKey changes

  // Define URLs for different tile layers (light and dark modes)
  const lightTileLayer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; // Standard light theme tile layer
  const darkTileLayer = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"; // Dark theme tile layer for better heatmap visibility

  return (
    <MapContainer 
      key={mapKey} // Unique key to trigger re-renders
      ref={mapRef} // Reference to the map container
      center={[46.8, 8.3]} // Initial center coordinates for the map view
      zoom={7} // Initial zoom level
      style={{ height: '100%', width: '100%' }} // Full size container for the map
    >
      <TileLayer
        url={showHeatMap ? darkTileLayer : lightTileLayer} // Toggle between light and dark tiles based on heatmap visibility
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors &copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a>" // Attribution for tile sources
      />
      {showHeatMap && <HeatLayer data={data} />} // Render the heatmap layer if enabled
      {showClusters && <ClusterLayer data={data} />} // Render the cluster layer if enabled
    </MapContainer>
  );
};

export default MapView;
