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
  // Convert flu type values to floats to ensure correct comparison
  const h5n1 = parseFloat(entry.H5N1);
  const h5n2 = parseFloat(entry.H5N2);
  const h7n2 = parseFloat(entry.H7N2);
  const h7n8 = parseFloat(entry.H7N8);

  // Determine the flu type based on the parsed values
  if (h5n1 === 1.0) return "H5N1";
  if (h5n2 === 1.0) return "H5N2";
  if (h7n2 === 1.0) return "H7N2";
  if (h7n8 === 1.0) return "H7N8";
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
  // Determine the season based on the month
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
 * @param selectedDatabase - The currently selected database to fetch data from
 * @returns An object containing processed map data, chart data, loading state, firstDate, and lastDate
 */
const useFluData = (viewMode: 'seasons' | 'months', selectedDatabase: string) => {
  const { t } = useTranslation(); // Initialize translation function
  const [allMapData, setAllMapData] = useState<MapData[]>([]); // State for all processed map data
  const [chartData, setChartData] = useState<ChartData[]>([]); // State for aggregated chart data
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state to handle UI feedback during data fetch
  const [firstDate, setFirstDate] = useState<string>(''); // State to hold the first available date
  const [lastDate, setLastDate] = useState<string>(''); // State to hold the last available date

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
        const response = await fetch(`http://localhost:5001/api/data?database=${selectedDatabase}`); // Fetch data from the server
        if (!response.ok) throw new Error('Failed to fetch data'); // Handle response errors
        const data: FetchedData[] = await response.json(); // Parse response as JSON

        // Process the fetched data into the format required by the application
        const processedMapData = data.map(entry => {
          const latitude = parseFloat(entry.latitude); // Parse latitude as a float
          const longitude = parseFloat(entry.longitude); // Parse longitude as a float
          const date = new Date(entry.timestamp); // Convert timestamp to a Date object
          const year = date.getFullYear(); // Extract the year from the date
          const month = date.getMonth() + 1; // Extract the month from the date (0-indexed, so add 1)
          const { season, seasonYear } = monthToSeason(month, year, t); // Determine season and year using helper function
          const fluType = determineFluType(entry); // Determine flu type based on entry data
          const rawDate = date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD' for compatibility with date inputs

          // Format date based on view mode (seasons or months)
          const formattedDate = viewMode === 'seasons'
            ? `${seasonYear} - ${season}` // Format date as 'Year - Season'
            : `${year} - ${monthNames[month - 1]}`; // Format date as 'Year - Month'

          // Return the processed data entry
          return {
            latitude,
            longitude,
            date: formattedDate, // Date formatted for display and filtering
            rawDate, // Include the raw date in 'YYYY-MM-DD' format
            fluType,
            species: entry.species,
            provenance: entry.provenance,
          };
        });

        // Sort the processed data by date to ensure correct order in visualizations
        const sortedMapData = processedMapData.sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());

        setAllMapData(sortedMapData); // Update state with sorted map data

        // Set the first and last date based on the sorted data in 'YYYY-MM-DD' format
        if (sortedMapData.length > 0) {
          setFirstDate(sortedMapData[0].rawDate); // Set the first date
          setLastDate(sortedMapData[sortedMapData.length - 1].rawDate); // Set the last date
        }

        // Aggregate and sort the data for the chart component
        const aggregatedChartData = aggregateChartData(sortedMapData);

        // Sort the aggregated chart data to ensure correct order by year and then by season/month
        const sortedChartData = aggregatedChartData.sort((a, b) => {
          const [yearA, periodA] = a.date.split(' - ');
          const [yearB, periodB] = b.date.split(' - ');

          // Compare years first
          const yearComparison = parseInt(yearA) - parseInt(yearB);
          if (yearComparison !== 0) {
            return yearComparison;
          }

          // Sorting based on viewMode: seasons or months
          if (viewMode === 'seasons') {
            return seasonOrder.indexOf(periodA) - seasonOrder.indexOf(periodB); // Sort by season order
          } else {
            // For months, sort using Date object to ensure correct order
            const monthA = new Date(`${yearA}-${periodA}-01`).getMonth(); // Extract month index for comparison
            const monthB = new Date(`${yearB}-${periodB}-01`).getMonth(); // Extract month index for comparison
            return monthA - monthB; // Compare months to determine order
          }
        });

        setChartData(sortedChartData); // Update the state with the sorted chart data

      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors encountered during fetch
      } finally {
        setIsLoading(false); // Set loading state to false once processing is complete
      }
    };

    fetchData(); // Invoke the fetch data function
  }, [viewMode, selectedDatabase, t]); // Dependencies to refetch data when view mode, selected database, or language changes

  // Return processed data, loading state, firstDate, and lastDate for use in components
  return { allMapData, chartData, isLoading, firstDate, lastDate };
};

export default useFluData; // Export the custom hook
