/**
 * Dashboard component provides an interactive interface for visualizing bird flu data
 * across different locations and time periods, catering to non-technical users such as politicians.
 * It supports single and double map views with various filtering options and time-based data analysis.
 */

import React, { useState, useRef, useEffect, useMemo } from 'react'; // React core functionalities
import MapView from './MapView'; // Custom component for displaying geospatial data on a map, with support for clusters and heatmaps
import TimeSeriesChart from './TimeSeriesChart'; // Custom component for rendering time series data as a line chart, allowing analysis of trends over time
import { Slider, Button, Typography, Box, CircularProgress, ToggleButtonGroup, ToggleButton, Select, MenuItem, FormControl, TextField, InputLabel, OutlinedInput } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent from MUI
import useFluData from '../hooks/useFluData'; // Custom hook for fetching and processing bird flu data, handling the API call, data aggregation, and state management
import { aggregateChartData, sortSliderRange } from '../utils/utils'; // Utility functions for data processing
import { fluTypes, getSpeciesOptions, getProvenanceOptions } from '../constants/filters'; // Constants and functions for filtering data
import { MapData, ChartData } from '../types/birdFluTypes'; // TypeScript type definitions for structured data
import { useTranslation } from 'react-i18next'; // Hook for translation

const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'seasons' | 'months'>('seasons'); // Controls whether data is viewed by seasons or months
  const [selectedDatabase, setSelectedDatabase] = useState<string>(''); // Controls the selected database
  const { allMapData, isLoading, firstDate, lastDate } = useFluData(viewMode, selectedDatabase); // Custom hook fetching and processing data based on selected database

  const [isDoubleMapView, setIsDoubleMapView] = useState<boolean>(false); // Toggles between single and double map views
  const [filteredMapData1, setFilteredMapData1] = useState<MapData[]>([]); // Holds filtered data for the first map
  const [filteredMapData2, setFilteredMapData2] = useState<MapData[]>([]); // Holds filtered data for the second map
  const [selectedFluType1, setSelectedFluType1] = useState<string>('All'); // Filter for flu type on the first map
  const [selectedSpecies1, setSelectedSpecies1] = useState<string>('All'); // Filter for species on the first map
  const [selectedProvenance1, setSelectedProvenance1] = useState<string>('All'); // Filter for provenance on the first map
  const [selectedFluType2, setSelectedFluType2] = useState<string>('All'); // Filter for flu type on the second map
  const [selectedSpecies2, setSelectedSpecies2] = useState<string>('All'); // Filter for species on the second map
  const [selectedProvenance2, setSelectedProvenance2] = useState<string>('All'); // Filter for provenance on the second map
  const [mapView1, setMapView1] = useState<'clusters' | 'heat'>('clusters'); // Map view mode for the first map
  const [mapView2, setMapView2] = useState<'clusters' | 'heat'>('clusters'); // Map view mode for the second map
  const [filteredChartData, setFilteredChartData] = useState<ChartData[]>([]); // Holds the data for the time series chart
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // Controls the current index for the timeline slider
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Controls play/pause state of the timeline slider
  const intervalRef = useRef<number | null>(null); // Reference for managing the timeline slider interval
  const { t } = useTranslation(); // Hook for handling translations

  const [availableDatabases, setAvailableDatabases] = useState<string[]>([]); // State for available databases
  const [fromDate, setFromDate] = useState<string>(''); // State to hold the selected from date for filtering
  const [toDate, setToDate] = useState<string>(''); // State to hold the selected to date for filtering

  // Prepare the slider range based on the selected view mode (seasons or months)
  const sliderRange = useMemo(() => {
    if (allMapData.length === 0) return []; // Handle case where data isn't loaded yet
    return sortSliderRange(
      Array.from(new Set(allMapData.filter(entry => {
        const entryDate = new Date(entry.rawDate);
        return entryDate >= new Date(fromDate) && entryDate <= new Date(toDate); // Filter entries within the selected date range
      }).map(entry => entry.date))),
      viewMode
    );
  }, [allMapData, viewMode, fromDate, toDate]); // Dependencies include fromDate and toDate to dynamically redraw the slider

  // Effect to initialize date filters based on available slider range
  useEffect(() => {
    if (firstDate && lastDate) {
      setFromDate(firstDate); // Set From Date to the earliest available date
      setToDate(lastDate); // Set To Date to the latest available date
    }
  }, [firstDate, lastDate]);

  // Fetch available datasets for the select dropdown
  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/files'); // Endpoint to get list of available datasets
        if (!response.ok) throw new Error('Failed to fetch database names');
        const data: string[] = await response.json();
        setAvailableDatabases(data); // Populate the available databases from server response
        if (data.length > 0) setSelectedDatabase(data[0]); // Default to the first database in the list
      } catch (error) {
        console.error('Error fetching databases:', error);
      }
    };

    fetchDatabases();
  }, []);

  // Filter options derived from the fetched data
  const speciesOptions = getSpeciesOptions(allMapData);
  const provenanceOptions = getProvenanceOptions(allMapData);

  // Function to update map data for both maps based on the selected index and filter criteria
  const updateMapData = (index: number) => {
    const selectedSeasonYear = sliderRange[index]; // Identify the current season/year based on the slider index

    // Filter data for the first map
    let filteredData1 = filterMapData(allMapData, selectedSeasonYear, selectedFluType1, selectedSpecies1, selectedProvenance1);
    setFilteredMapData1(filteredData1);

    // Filter data for the second map (if double map view is enabled)
    if (isDoubleMapView) {
      let filteredData2 = filterMapData(allMapData, selectedSeasonYear, selectedFluType2, selectedSpecies2, selectedProvenance2);
      setFilteredMapData2(filteredData2);
    }
  };

  // Reusable function to filter map data based on selected criteria
  const filterMapData = (data: MapData[], seasonYear: string, fluType: string, species: string, provenance: string) => {
    return data.filter(entry => entry.date === seasonYear)
      .filter(entry => fluType === 'All' || entry.fluType === fluType)
      .filter(entry => species === 'All' || entry.species === species)
      .filter(entry => provenance === 'All' || entry.provenance === provenance);
  };

  // Function to aggregate and update chart data based on filters applied on both maps and date range
  const updateChartData = () => {
    // Combine filters for both maps to aggregate the data
    let filteredData = allMapData.filter(entry =>
      (selectedFluType1 === 'All' || entry.fluType === selectedFluType1 || selectedFluType2 === 'All' || entry.fluType === selectedFluType2) &&
      (selectedSpecies1 === 'All' || entry.species === selectedSpecies1 || selectedSpecies2 === 'All' || entry.species === selectedSpecies2) &&
      (selectedProvenance1 === 'All' || entry.provenance === selectedProvenance1 || selectedProvenance2 === 'All' || entry.provenance === selectedProvenance2)
    );

    // Further filter the data based on the selected date range
    filteredData = filteredData.filter(entry => {
      const entryDate = new Date(entry.rawDate); // Use rawDate for accurate comparison
      return entryDate >= new Date(fromDate) && entryDate <= new Date(toDate); // Filter entries within the date range
    });

    // Aggregate the filtered data into chart data format
    const aggregatedData = aggregateChartData(filteredData); // Aggregate the filtered data

    // Sort the aggregated chart data to ensure correct order by year and then by season/month
    const sortedChartData = aggregatedData.sort((a, b) => {
      const [yearA, seasonOrMonthA] = a.date.split(' - '); // Split the date to get year and season/month
      const [yearB, seasonOrMonthB] = b.date.split(' - '); // Split the date to get year and season/month

      // Compare years first to sort primarily by year
      const yearComparison = parseInt(yearA) - parseInt(yearB);
      if (yearComparison !== 0) {
        return yearComparison; // Return the year comparison result if years differ
      }

      // Sorting based on viewMode: seasons or months
      if (viewMode === 'seasons') {
        const seasonOrder = ['Spring', 'Summer', 'Autumn', 'Winter']; // Define the correct season order
        return seasonOrder.indexOf(seasonOrMonthA) - seasonOrder.indexOf(seasonOrMonthB); // Sort by season order
      } else {
        // For months, sort using Date object to ensure correct order
        const monthA = new Date(`${yearA}-${seasonOrMonthA}-01`).getMonth(); // Extract month index for comparison
        const monthB = new Date(`${yearB}-${seasonOrMonthB}-01`).getMonth(); // Extract month index for comparison
        return monthA - monthB; // Compare months to determine order
      }
    });

    setFilteredChartData(sortedChartData); // Update the state with the sorted chart data
  };

  // Effect to update both chart and map data when filters or date ranges change
  useEffect(() => {
    updateChartData(); // Aggregate and sort chart data based on filters and date range
    if (sliderRange.length > 0) {
      updateMapData(selectedIndex); // Initialize map data to the first time period
    }
  }, [
    allMapData,
    viewMode,
    selectedFluType1,
    selectedSpecies1,
    selectedProvenance1,
    selectedFluType2,
    selectedSpecies2,
    selectedProvenance2,
    isDoubleMapView,
    sliderRange,
    selectedIndex,
    fromDate,
    toDate // Include fromDate and toDate to ensure updates on date changes
  ]);

  // Function to handle slider changes and update map data accordingly
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSelectedIndex(newValue as number); // Update the selected index based on slider value
    updateMapData(newValue as number); // Update the map data according to the selected index
  };

  // Functions to control the play/pause state of the timeline slider
  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current!); // Stop the interval if currently playing
      setIsPlaying(false); // Set playing state to false
    } else {
      setIsPlaying(true); // Set playing state to true
      intervalRef.current = window.setInterval(() => { // Start interval for automatic slider progression
        setSelectedIndex((prev) => {
          const nextIndex = (prev + 1) % sliderRange.length; // Calculate next index, looping back to start if necessary
          updateMapData(nextIndex); // Update map data for the next index
          return nextIndex; // Return the updated index
        });
      }, 1000); // Set the interval duration to 1 second
    }
  };

  // Function to reset the slider and stop any ongoing playback
  const handleReset = () => {
    setSelectedIndex(0); // Reset the slider to the initial position
    setIsPlaying(false); // Stop any ongoing playback
    clearInterval(intervalRef.current!); // Clear the interval to stop auto-play
    updateMapData(0); // Update map data for the initial position
  };

  // Handlers for map view changes for both maps
  const handleMapViewChange1 = (event: React.MouseEvent<HTMLElement>, newView: 'clusters' | 'heat') => {
    if (newView !== null) {
      setMapView1(newView); // Update the map view for the first map based on user selection
    }
  };

  const handleMapViewChange2 = (event: React.MouseEvent<HTMLElement>, newView: 'clusters' | 'heat') => {
    if (newView !== null) {
      setMapView2(newView); // Update the map view for the second map based on user selection
    }
  };

  // Handler to switch between viewing data by seasons or by months
  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newMode: 'seasons' | 'months') => {
    if (newMode !== null) {
      setViewMode(newMode); // Update the view mode between seasons and months
    }
  };

  // Handler for changing the selected database from the dropdown
  const handleDatabaseChange = (event: SelectChangeEvent<string>) => {
    setSelectedDatabase(event.target.value as string); // Update the selected database based on user input
  };

  // Handler for changing the From Date, ensuring it is within the valid range
  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = event.target.value;
    if (new Date(newFromDate) <= new Date(toDate)) {
      setFromDate(newFromDate); // Update the From Date if it's valid
    }
  };

  // Handler for changing the To Date, ensuring it is within the valid range
  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = event.target.value;
    if (new Date(newToDate) >= new Date(fromDate)) {
      setToDate(newToDate); // Update the To Date if it's valid
    }
  };

  // Handler for screen capture functionality to print as PDF
  const handleScreenCapture = () => {
    window.print(); // Trigger the browser's print functionality
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Calculate the past range for shading on the chart based on the selected index
  const pastRange = sliderRange.slice(0, selectedIndex + 1);

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Flex container to place the maps and options side by side if double map view is selected */}
      <Box sx={{ display: isDoubleMapView ? 'flex' : 'block', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {/* First Map and Options */}
        <Box sx={{ flex: 1, minWidth: '400px' }}>
          <Box sx={{ height: '400px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <MapView
              data={filteredMapData1}
              showHeatMap={mapView1 === 'heat'}
              showClusters={mapView1 === 'clusters'}
              mapKey={`map1-${isDoubleMapView}`} // Unique key for the first map
            />
          </Box>

          <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: '12px' }}>
              {t('options')} - 1
            </Typography>

            {/* Row for Toggle Buttons */}
            <Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <ToggleButtonGroup
                value={mapView1}
                exclusive
                onChange={handleMapViewChange1}
                aria-label="Map View"
              >
                <ToggleButton value="clusters" aria-label="Show Cluster Map">
                  {t('showClusterMap')}
                </ToggleButton>
                <ToggleButton value="heat" aria-label="Show Heat Map">
                  {t('showHeatMap')}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Row for Select Inputs with Separate Labels */}
            <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {/* Select input for Infection Type */}
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="select-infectiontype-label">{t('infectionType')}</InputLabel>
                <Select
                  labelId="select-infectiontype-label"
                  input={<OutlinedInput label={t('infectionType')} />}
                  value={selectedFluType1}
                  onChange={(e) => setSelectedFluType1(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Infection Type' }}
                >
                  <MenuItem value="All">{t('All')}</MenuItem>
                  {fluTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Select input for Species */}
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="select-species-label">{t('species')}</InputLabel>
                <Select
                  labelId="select-species-label"
                  input={<OutlinedInput label={t('species')} />}
                  value={selectedSpecies1}
                  onChange={(e) => setSelectedSpecies1(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Species' }}
                >
                  <MenuItem value="All">{t('All')}</MenuItem>
                  {speciesOptions.map((species) => (
                    <MenuItem key={species} value={species}>
                      {species}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Select input for Provenance */}
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="select-provenance-label">{t('provenance')}</InputLabel>
                <Select
                  labelId="select-provenance-label"
                  input={<OutlinedInput label={t('provenance')} />}
                  value={selectedProvenance1}
                  onChange={(e) => setSelectedProvenance1(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Provenance' }}
                >
                  <MenuItem value="All">{t('All')}</MenuItem>
                  {provenanceOptions.map((provenance) => (
                    <MenuItem key={provenance} value={provenance}>
                      {provenance}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* Second Map and Options - Only show if double map view is enabled */}
        {isDoubleMapView && (
          <Box sx={{ flex: 1, minWidth: '400px' }}>
            <Box sx={{ height: '400px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <MapView
                data={filteredMapData2}
                showHeatMap={mapView2 === 'heat'}
                showClusters={mapView2 === 'clusters'}
                mapKey={`map2-${isDoubleMapView}`} // Unique key for the second map
              />
            </Box>

            <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: '12px' }}>
                {t('options')} - 2
              </Typography>

              {/* Row for Toggle Buttons */}
              <Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <ToggleButtonGroup
                  value={mapView2}
                  exclusive
                  onChange={handleMapViewChange2}
                  aria-label="Map View"
                >
                  <ToggleButton value="clusters" aria-label="Show Cluster Map">
                    {t('showClusterMap')}
                  </ToggleButton>
                  <ToggleButton value="heat" aria-label="Show Heat Map">
                    {t('showHeatMap')}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* Row for Select Inputs with Separate Labels */}
              <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {/* Select input for Infection Type */}
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={selectedFluType2}
                    onChange={(e) => setSelectedFluType2(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Infection Type' }}
                  >
                    <MenuItem value="All">{t('All')}</MenuItem>
                    {fluTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Select input for Species */}
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={selectedSpecies2}
                    onChange={(e) => setSelectedSpecies2(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Species' }}
                  >
                    <MenuItem value="All">{t('All')}</MenuItem>
                    {speciesOptions.map((species) => (
                      <MenuItem key={species} value={species}>
                        {species}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Select input for Provenance */}
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    value={selectedProvenance2}
                    onChange={(e) => setSelectedProvenance2(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Provenance' }}
                  >
                    <MenuItem value="All">{t('All')}</MenuItem>
                    {provenanceOptions.map((provenance) => (
                      <MenuItem key={provenance} value={provenance}>
                        {provenance}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Time Slider and Controls */}
      <Box sx={{ marginTop: '40px', marginBottom: '20px' }}>
        <Slider
          value={selectedIndex}
          onChange={handleSliderChange}
          min={0}
          max={sliderRange.length - 1}
          valueLabelDisplay="auto" // Display labels on hover
          marks={sliderRange.map((date, index) => {
            const year = date.split(' - ')[0];
            // Show the first year and when the year changes
            const showLabel = index === 0 || year !== sliderRange[index - 1].split(' - ')[0];
            return { value: index, label: showLabel ? year : '' };
          })}
          valueLabelFormat={(index) => sliderRange[index]} // Format for slider value labels
          sx={{
            '& .MuiSlider-markLabel': {
              transform: 'rotate(-90deg)', // Rotate the labels to avoid overlap
              transformOrigin: 'top left', // Set origin to rotate correctly
              marginTop: '30px', // Add space to avoid overlapping with the slider
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button onClick={handlePlayPause} sx={{ marginRight: '10px' }} variant="contained">
            {isPlaying ? t('pause') : t('play')}
          </Button>
          <Button onClick={handleReset} variant="outlined">{t('reset')}</Button>
        </Box>
      </Box>

      {/* Time Series Chart */}
      {filteredChartData.length > 0 ? (
        <TimeSeriesChart
          data={filteredChartData}
          highlightedSeason={sliderRange[selectedIndex]}
          pastRange={pastRange}
        />
      ) : (
        <Typography variant="body1" align="center" sx={{ marginTop: '20px' }}>
          {t('noDataAvailable')}
        </Typography>
      )}

      {/* Dashboard Control - Flex container grouping toggles and controls */}
      <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
        <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: '12px' }}>
          {t('dashboardControl')}
        </Typography>

        {/* Grouped Controls for Database Select, View Mode, and Map View */}
        <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Database Select */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="select-database-label">{t('selectDatabase')}</InputLabel>
            <Select
              labelId="select-database-label"
              input={<OutlinedInput label={t('selectDatabase')} />}
              value={selectedDatabase}
              onChange={handleDatabaseChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Database' }}
            >
              {availableDatabases.map((db) => (
                <MenuItem key={db} value={db}>
                  {db}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* From Date Picker */}
          <TextField
            type="date"
            label={t('fromDate')}
            value={fromDate}
            onChange={handleFromDateChange}
            InputProps={{ inputProps: { min: firstDate, max: toDate } }} // Limits From Date within range
            sx={{ minWidth: 150 }}
          />

          {/* To Date Picker */}
          <TextField
            type="date"
            label={t('toDate')}
            value={toDate}
            onChange={handleToDateChange}
            InputProps={{ inputProps: { min: fromDate, max: lastDate } }} // Limits To Date within range
            sx={{ minWidth: 150 }}
          />
        </Box>

        {/* Toggle and Capture Button Row */}
        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '20px', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Toggle for Single/Double Map View */}
            <ToggleButtonGroup
              value={isDoubleMapView ? 'double' : 'single'} // Sets value based on current map view mode
              exclusive
              onChange={(event, newView) => setIsDoubleMapView(newView === 'double')} // Toggle between single and double map views
              aria-label="Single/Double Map View"
            >
              <ToggleButton value="single" aria-label="Single Map View">
                {t('singleMapView')}
              </ToggleButton>
              <ToggleButton value="double" aria-label="Double Map View">
                {t('doubleMapView')}
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Toggle for View Mode (Seasons/Months) */}
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="View Mode"
            >
              <ToggleButton value="seasons" aria-label="Show Seasons">
                {t('showSeasons')}
              </ToggleButton>
              <ToggleButton value="months" aria-label="Show Months">
                {t('showMonths')}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Button to Capture the Dashboard Screen for Print/PDF */}
          <Box sx={{ marginLeft: 'auto' }}>
            <Button variant="contained" color="secondary" onClick={handleScreenCapture}>
              {t('captureDashboard')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
