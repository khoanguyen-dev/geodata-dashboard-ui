/**
 * Type declaration module for the 'react-leaflet-markercluster' package.
 * This module provides TypeScript definitions for integrating MarkerClusterGroup functionality
 * into React Leaflet applications, allowing for clustering of map markers.
 */

declare module 'react-leaflet-markercluster' {
  import { Component } from 'react'; // Import React's Component class for defining components
  import { LayerGroupProps } from 'react-leaflet'; // Import props for Leaflet layer groups
  import { MarkerClusterGroupOptions } from 'leaflet'; // Import options specific to Leaflet's MarkerClusterGroup

  /**
   * Interface combining properties from React Leaflet's LayerGroupProps and Leaflet's MarkerClusterGroupOptions.
   * This interface allows the MarkerClusterGroup component to accept both sets of properties,
   * providing flexibility in configuration.
   */
  export interface MarkerClusterGroupProps extends LayerGroupProps, MarkerClusterGroupOptions {}

  /**
   * MarkerClusterGroup component class definition.
   * This class extends React's Component class, with props defined by the MarkerClusterGroupProps interface.
   * It enables the use of clustering for markers on Leaflet maps within React applications.
   */
  export default class MarkerClusterGroup extends Component<MarkerClusterGroupProps> {}
}
