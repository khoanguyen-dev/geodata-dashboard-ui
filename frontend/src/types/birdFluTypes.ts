/**
 * Interface for representing data used on the map.
 * Contains coordinates, date, flu type, species, and provenance information.
 */
export interface MapData {
  latitude: number; // Latitude of the flu case location
  longitude: number; // Longitude of the flu case location
  date: string; // Date formatted as a string, e.g., '2020 - Winter'
  fluType: 'H5N1' | 'H5N2' | 'H7N2' | 'H7N8' | 'Unknown'; // Type of flu detected
  species: string; // Species affected by the flu
  provenance: string; // Origin or source of the data
}

/**
 * Interface for raw data fetched from the backend or API.
 * Contains string representations of coordinates, timestamp, flu type markers, species, and provenance.
 */
export interface FetchedData {
  latitude: string; // Latitude as a string, fetched from the backend
  longitude: string; // Longitude as a string, fetched from the backend
  timestamp: string; // Timestamp of the data, used for date processing
  H5N1: string; // String representation indicating presence ('1.0') or absence of H5N1 flu type
  H5N2: string; // String representation indicating presence ('1.0') or absence of H5N2 flu type
  H7N2: string; // String representation indicating presence ('1.0') or absence of H7N2 flu type
  H7N8: string; // String representation indicating presence ('1.0') or absence of H7N8 flu type
  species: string; // Species affected by the flu
  provenance: string; // Origin or source of the data
}

/**
 * Interface for data used in charts.
 * Contains counts of various flu types and the total count for a given date.
 */
export interface ChartData {
  date: string; // Date formatted as a string, e.g., '2020 - Winter'
  H5N1: number; // Count of H5N1 flu cases
  H5N2: number; // Count of H5N2 flu cases
  H7N2: number; // Count of H7N2 flu cases
  H7N8: number; // Count of H7N8 flu cases
  Unknown: number; // Count of cases with unknown flu type
  total: number; // Total count of all flu cases combined
}
