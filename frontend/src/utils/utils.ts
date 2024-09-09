import { MapData, ChartData } from '../types/birdFluTypes'; // Import data types for map and chart data

/**
 * Aggregates map data into chart data format, calculating counts for each flu type and total counts.
 * @param data - An array of MapData objects to be aggregated into chart data.
 * @returns An array of ChartData objects representing aggregated data points for the chart.
 */
export const aggregateChartData = (data: MapData[]): ChartData[] => {
    // Create a map to accumulate data by date
    const chartDataMap: Record<string, ChartData> = {};

    // Iterate over each data entry to accumulate counts
    data.forEach(entry => {
        // Initialize ChartData object for each unique date if not already present
        if (!chartDataMap[entry.date]) {
            chartDataMap[entry.date] = {
                date: entry.date,
                H5N1: 0,
                H5N2: 0,
                H7N2: 0,
                H7N8: 0,
                Unknown: 0,
                total: 0, // Initialize total count to zero
            };
        }

        // Increment the count for the specific flu type and update the total count
        chartDataMap[entry.date][entry.fluType] += 1;
        chartDataMap[entry.date].total += 1;
    });

    // Convert the aggregated data map into an array of ChartData objects
    return Object.values(chartDataMap);
};

/**
 * Sorts a range of date strings based on the selected view mode (seasons or months).
 * Dates are sorted first by year, then by season or month.
 * @param dates - An array of date strings in the format 'YYYY - Season' or 'YYYY - Month'.
 * @param viewMode - The view mode indicating whether dates are by seasons or months.
 * @returns A sorted array of date strings.
 */
export const sortSliderRange = (dates: string[], viewMode: 'seasons' | 'months'): string[] => {
    // Define the order of seasons for sorting purposes
    const seasonOrder = ['Spring', 'Summer', 'Autumn', 'Winter'];

    // Sort dates first by year, then by the defined order of seasons or by month
    return dates.sort((a, b) => {
        const [yearA, seasonOrMonthA] = a.split(' - ');
        const [yearB, seasonOrMonthB] = b.split(' - ');

        // Compare years numerically
        if (yearA !== yearB) {
            return parseInt(yearA) - parseInt(yearB);
        }

        // Compare seasons or months based on view mode
        if (viewMode === 'seasons') {
            // Use the defined season order for comparison
            return seasonOrder.indexOf(seasonOrMonthA) - seasonOrder.indexOf(seasonOrMonthB);
        } else {
            // Convert month names to date objects for accurate comparison
            return new Date(`${yearA}-${seasonOrMonthA}-01`).getTime() - new Date(`${yearB}-${seasonOrMonthB}-01`).getTime();
        }
    });
};

/**
 * Handles play and pause functionality for the slider controlling the timeline animation.
 * This function manages the state of the play interval to advance the timeline automatically.
 * @param isPlaying - Boolean indicating whether the animation is currently playing.
 * @param setIsPlaying - Function to update the play state.
 * @param sliderRange - Array of date strings representing the range of the slider.
 * @param setSelectedIndex - Function to update the current selected index of the slider.
 * @param intervalRef - Ref object to keep track of the interval ID.
 */
export const handleSliderPlayPause = (
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    sliderRange: string[],
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
    intervalRef: React.MutableRefObject<number | null>
) => {
    // If currently playing, stop the animation
    if (isPlaying) {
        clearInterval(intervalRef.current!);
        setIsPlaying(false);
    } else {
        // If paused, start the animation to advance through slider range
        setIsPlaying(true);
        intervalRef.current = window.setInterval(() => {
            setSelectedIndex((prev) => (prev + 1) % sliderRange.length);
        }, 1000); // Set interval to 1 second per step
    }
};
