import { useState, useEffect } from 'react'; // Importing React hooks for state management and side effects
import { useTranslation } from 'react-i18next'; // Importing translation hook for multi-language support
import { MapData, ChartData, FetchedData } from '../types/birdFluTypes'; // Importing type definitions for data structures
import { aggregateChartData } from '../utils/utils'; // Import utility function for aggregating chart data

/**
 * Helper function to determine the flu type based on provided data.
 * This function maps specific flu indicators in the data to a known flu type.
 * @param entry - A single data entry of type FetchedData
 * @returns A string representing the flu type (e.g., 'H5N1', 'Unknown')
 */
const determineFluType = (entry: FetchedData): 'H5N1' | 'H5N2' | 'H7N2' | 'H7N8' | 'Unknown' => {
  if (entry.H5N1 === "1.0") return "H5N1";
  if (entry.H5N2 === "1.0") return "H5N2";
  if (entry.H7N2 === "1.0") return "H7N2";
  if (entry.H7N8 === "1.0") return "H7N8";
  return "Unknown"; // Default to 'Unknown' if no specific type is indicated
};

/**
 * Helper function to map a month to its corresponding season, with translations.
 * @param month - The month number (1-12)
 * @param year - The year associated with the month
 * @param t - Translation function from i18next
 * @returns An object with the season name and the associated year
 */
const monthToSeason = (month: number, year: number, t: (key: string) => string): { season: string, seasonYear: number } => {
  if ([12, 1, 2].includes(month)) return { season: t('seasons.Winter'), seasonYear: month === 12 ? year : year - 1 };
  if ([3, 4, 5].includes(month)) return { season: t('seasons.Spring'), seasonYear: year };
  if ([6, 7, 8].includes(month)) return { season: t('seasons.Summer'), seasonYear: year };
  if ([9, 10, 11].includes(month)) return { season: t('seasons.Autumn'), seasonYear: year };
  return { season: '', seasonYear: year }; // Fallback if month does not match any expected ranges
};

/**
 * Custom hook to fetch, process, and provide bird flu data for visualization components.
 * Supports filtering data by seasons or months, and dynamically handles language translations.
 * @param viewMode - Determines whether data is grouped by 'seasons' or 'months'
 * @returns An object containing processed map data, chart data, and loading state
 */
const useFluData = (viewMode: 'seasons' | 'months') => {
  const { t } = useTranslation(); // Initialize translation function
  const [allMapData, setAllMapData] = useState<MapData[]>([]); // State for all processed map data
  const [chartData, setChartData] = useState<ChartData[]>([]); // State for aggregated chart data
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state to handle UI feedback during data fetch

  // Arrays to store the order of seasons and month names, used for sorting and display
  const seasonOrder = [
    t('seasons.Spring'),
    t('seasons.Summer'),
    t('seasons.Autumn'),
    t('seasons.Winter'),
  ];

  const monthNames = [
    t('months.January'),
    t('months.February'),
    t('months.March'),
    t('months.April'),
    t('months.May'),
    t('months.June'),
    t('months.July'),
    t('months.August'),
    t('months.September'),
    t('months.October'),
    t('months.November'),
    t('months.December'),
  ];

  // useEffect hook to fetch data from the API, process it, and update state variables
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true while data is being fetched
        const response = await fetch('http://localhost:5001/api/data'); // Fetch data from the server
        if (!response.ok) throw new Error('Failed to fetch data'); // Handle response errors
        const data: FetchedData[] = await response.json(); // Parse response as JSON

        // Process the fetched data into the format required by the application
        const processedMapData = data.map(entry => {
          const latitude = parseFloat(entry.latitude);
          const longitude = parseFloat(entry.longitude);
          const date = new Date(entry.timestamp);
          const year = date.getFullYear();
          const month = date.getMonth();
          const { season, seasonYear } = monthToSeason(month + 1, year, t); // Determine season and year
          const fluType = determineFluType(entry); // Determine flu type based on entry data

          // Return the processed data entry
          return {
            latitude,
            longitude,
            date: `${seasonYear} - ${viewMode === 'seasons' ? season : t(`months.${monthNames[month]}`)}`,
            fluType,
            species: entry.species,
            provenance: entry.provenance,
          };
        });

        // Sort the processed data by date to ensure correct order in visualizations
        const sortedMapData = processedMapData.sort((a: MapData, b: MapData) => {
          const [yearA, periodA] = a.date.split(' - ');
          const [yearB, periodB] = b.date.split(' - ');

          if (yearA !== yearB) {
            return parseInt(yearA) - parseInt(yearB);
          }

          if (viewMode === 'seasons') {
            return seasonOrder.indexOf(periodA) - seasonOrder.indexOf(periodB);
          } else {
            return monthNames.indexOf(periodA) - monthNames.indexOf(periodB);
          }
        });

        setAllMapData(sortedMapData); // Update state with sorted map data

        // Aggregate and sort the data for the chart component
        const aggregatedChartData = aggregateChartData(sortedMapData);
        const sortedChartData = aggregatedChartData.sort((a: ChartData, b: ChartData) => {
          const [yearA, periodA] = a.date.split(' - ');
          const [yearB, periodB] = b.date.split(' - ');

          if (yearA !== yearB) {
            return parseInt(yearA) - parseInt(yearB);
          }

          if (viewMode === 'seasons') {
            return seasonOrder.indexOf(periodA) - seasonOrder.indexOf(periodB);
          } else {
            return monthNames.indexOf(periodA) - monthNames.indexOf(periodB);
          }
        });

        setChartData(sortedChartData); // Update state with sorted chart data

      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors encountered during fetch
      } finally {
        setIsLoading(false); // Set loading state to false once processing is complete
      }
    };

    fetchData(); // Invoke the fetch data function
  }, [viewMode, t]); // Dependencies to refetch data when view mode or language changes

  return { allMapData, chartData, isLoading }; // Return processed data and loading state
};

export default useFluData; // Export the custom hook
