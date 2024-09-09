import { MapData } from '../types/birdFluTypes'; // Import type definitions for map data to ensure correct input types

// Array of flu types to be used as filtering options in the application
export const fluTypes = ['H5N1', 'H5N2', 'H7N2', 'H7N8', 'Unknown'] as const; 

// Function to extract and sort unique species options from the map data
export const getSpeciesOptions = (data: MapData[]): string[] => 
  Array.from(new Set(data.map((entry) => entry.species))).sort(); 

// Function to extract and sort unique provenance options from the map data
export const getProvenanceOptions = (data: MapData[]): string[] => 
  Array.from(new Set(data.map((entry) => entry.provenance))).sort();
