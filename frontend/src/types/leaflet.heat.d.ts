// Import all of Leaflet's type definitions
import * as L from 'leaflet';

/**
 * Extend the Leaflet module to include types for the heat map plugin.
 * This declaration file defines additional functionality provided by the leaflet.heat plugin,
 * which is not included in the default Leaflet type definitions.
 */
declare module 'leaflet' {
  
  /**
   * Function to create a heat layer on the map.
   * @param latlngs - Array of latitude, longitude, and intensity tuples
   * @param options - Optional configuration options for the heat layer
   * @returns A HeatLayer instance
   */
  function heatLayer(latlngs: [number, number, number][], options?: HeatMapOptions): HeatLayer;

  /**
   * Interface for the HeatLayer class, extending Leaflet's Layer class.
   * Provides methods to manipulate the heat map's data and options.
   */
  interface HeatLayer extends Layer {
    /**
     * Sets the data points for the heat layer.
     * @param latlngs - Array of latitude, longitude, and intensity tuples
     * @returns The current instance of HeatLayer for method chaining
     */
    setLatLngs(latlngs: [number, number, number][]): this;

    /**
     * Adds a single data point to the heat layer.
     * @param latlng - A tuple of latitude, longitude, and intensity
     * @returns The current instance of HeatLayer for method chaining
     */
    addLatLng(latlng: [number, number, number]): this;

    /**
     * Updates the options for the heat layer.
     * @param options - Configuration options for the heat layer
     * @returns The current instance of HeatLayer for method chaining
     */
    setOptions(options: HeatMapOptions): this;
  }

  /**
   * Interface defining the configuration options for a heat map layer.
   */
  interface HeatMapOptions {
    minOpacity?: number; // Minimum opacity of the heat map
    maxZoom?: number; // Maximum zoom level where the heat map is visible
    max?: number; // Maximum intensity value for scaling the gradient
    radius?: number; // Radius of each point in the heat map
    blur?: number; // Amount of blur applied to each heat point
    gradient?: { [key: number]: string }; // Color gradient mapping intensity values to colors
  }
}
