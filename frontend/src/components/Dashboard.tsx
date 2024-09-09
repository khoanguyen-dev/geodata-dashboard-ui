/**
 * Dashboard component provides an interactive interface for visualizing bird flu data
 * across different locations and time periods, catering to non-technical users such as politicians.
 * It supports single and double map views with various filtering options and time-based data analysis.
 */

import React, { useState, useRef, useEffect } from 'react'; // React core functionalities
import MapView from './MapView'; // Custom component for displaying geospatial data on a map, with support for clusters and heatmaps
import TimeSeriesChart from './TimeSeriesChart'; // Custom component for rendering time series data as a line chart, allowing analysis of trends over time
import { Slider, Button, Typography, Box, CircularProgress, ToggleButtonGroup, ToggleButton, Select, MenuItem, FormControl, Switch, FormControlLabel } from '@mui/material'; 
import useFluData from '../hooks/useFluData'; // Custom hook for fetching and processing bird flu data, handling the API call, data aggregation, and state management
import { aggregateChartData, sortSliderRange } from '../utils/utils'; // Utility functions for data processing
import { fluTypes, getSpeciesOptions, getProvenanceOptions } from '../constants/filters'; // Constants and functions for filtering data
import { MapData, ChartData } from '../types/birdFluTypes'; // TypeScript type definitions for structured data
import { useTranslation } from 'react-i18next'; // Hook for translation
const Dashboard: React.FC = () => {
  // State hooks to manage the application's state
  const [viewMode, setViewMode] = useState<'seasons' | 'months'>('seasons'); // Controls whether data is viewed by seasons or months
  const { allMapData, isLoading } = useFluData(viewMode); // Custom hook fetching and processing data

  // State for controlling map views
  const [isDoubleMapView, setIsDoubleMapView] = useState<boolean>(false); // Toggles between single and double map views

  // States for the first map and its filters
  const [filteredMapData1, setFilteredMapData1] = useState<MapData[]>([]);
  const [selectedFluType1, setSelectedFluType1] = useState<string>('All');
  const [selectedSpecies1, setSelectedSpecies1] = useState<string>('All');
  const [selectedProvenance1, setSelectedProvenance1] = useState<string>('All');
  const [mapView1, setMapView1] = useState<'clusters' | 'heat'>('clusters');

  // States for the second map and its filters (only used if double map view is enabled)
  const [filteredMapData2, setFilteredMapData2] = useState<MapData[]>([]);
  const [selectedFluType2, setSelectedFluType2] = useState<string>('All');
  const [selectedSpecies2, setSelectedSpecies2] = useState<string>('All');
  const [selectedProvenance2, setSelectedProvenance2] = useState<string>('All');
  const [mapView2, setMapView2] = useState<'clusters' | 'heat'>('clusters');

  const [filteredChartData, setFilteredChartData] = useState<ChartData[]>([]); // Holds the data for the time series chart
  const [selectedIndex, setSelectedIndex] = useState<number>(0); // Controls the current index for the timeline slider
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Controls play/pause state of the timeline slider
  const intervalRef = useRef<number | null>(null); // Reference for managing the timeline slider interval
  const { t } = useTranslation(); // Hook for handling translations

  // Filter options derived from the fetched data
  const speciesOptions = getSpeciesOptions(allMapData);
  const provenanceOptions = getProvenanceOptions(allMapData);

  // Prepare the slider range based on the selected view mode (seasons or months)
  const sliderRange = sortSliderRange(Array.from(new Set(allMapData.map(entry => entry.date))), viewMode);

  // Function to update map data for both maps based on the selected index and filter criteria
  const updateMapData = (index: number) => {
    const selectedSeasonYear = sliderRange[index];

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

  // Function to aggregate and update chart data based on filters applied on both maps
  const updateChartData = () => {
    let filteredData = allMapData.filter(entry =>
      (selectedFluType1 === 'All' || entry.fluType === selectedFluType1 || selectedFluType2 === 'All' || entry.fluType === selectedFluType2) &&
      (selectedSpecies1 === 'All' || entry.species === selectedSpecies1 || selectedSpecies2 === 'All' || entry.species === selectedSpecies2) &&
      (selectedProvenance1 === 'All' || entry.provenance === selectedProvenance1 || selectedProvenance2 === 'All' || entry.provenance === selectedProvenance2)
    );

    const aggregatedData = aggregateChartData(filteredData);
    aggregatedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setFilteredChartData(aggregatedData);
  };

  // Effect to update both chart and map data on changes to filters or initial load
  useEffect(() => {
    updateChartData();
    if (sliderRange.length > 0) {
      updateMapData(0); // Initialize map data to the first time period
    }
  }, [allMapData, viewMode, selectedFluType1, selectedSpecies1, selectedProvenance1, selectedFluType2, selectedSpecies2, selectedProvenance2, isDoubleMapView]);

  // Function to handle slider changes and update map data accordingly
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSelectedIndex(newValue as number);
    updateMapData(newValue as number);
  };

  // Functions to control the play/pause state of the timeline slider
  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current!);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = window.setInterval(() => {
        setSelectedIndex((prev) => {
          const nextIndex = (prev + 1) % sliderRange.length;
          updateMapData(nextIndex);
          return nextIndex;
        });
      }, 1000);
    }
  };

  // Function to reset the slider and stop any ongoing playback
  const handleReset = () => {
    setSelectedIndex(0);
    setIsPlaying(false);
    clearInterval(intervalRef.current!);
    updateMapData(0);
  };

  // Handlers for map view changes for both maps
  const handleMapViewChange1 = (event: React.MouseEvent<HTMLElement>, newView: 'clusters' | 'heat') => {
    if (newView !== null) {
      setMapView1(newView);
    }
  };

  const handleMapViewChange2 = (event: React.MouseEvent<HTMLElement>, newView: 'clusters' | 'heat') => {
    if (newView !== null) {
      setMapView2(newView);
    }
  };

  // Handler to switch between viewing data by seasons or by months
  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newMode: 'seasons' | 'months') => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Calculate the past range for shading on the chart
  const pastRange = sliderRange.slice(0, selectedIndex + 1);

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Toggle for Single/Double Map View */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <FormControlLabel
          control={
            <Switch
              checked={isDoubleMapView}
              onChange={(event) => setIsDoubleMapView(event.target.checked)}
              color="primary"
            />
          }
          label={t('doubleMapView')}
        />
      </Box>

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
              {t('options')} - Map 1
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

            {/* Row for Select Inputs with Separate Labels */}
            <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="body2" sx={{ marginBottom: '4px' }}>{t('infectionType')}</Typography>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select value={selectedFluType1} onChange={(e) => setSelectedFluType1(e.target.value)}>
                    <MenuItem value="All">All</MenuItem>
                    {fluTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ marginBottom: '4px' }}>{t('species')}</Typography>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select value={selectedSpecies1} onChange={(e) => setSelectedSpecies1(e.target.value)}>
                    <MenuItem value="All">All</MenuItem>
                    {speciesOptions.map((species) => (
                      <MenuItem key={species} value={species}>
                        {species}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ marginBottom: '4px' }}>{t('provenance')}</Typography>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select value={selectedProvenance1} onChange={(e) => setSelectedProvenance1(e.target.value)}>
                    <MenuItem value="All">All</MenuItem>
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
                {t('options')} - Map 2
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

              {/* Row for Select Inputs with Separate Labels */}
              <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" sx={{ marginBottom: '4px' }}>{t('infectionType')}</Typography>
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select value={selectedFluType2} onChange={(e) => setSelectedFluType2(e.target.value)}>
                      <MenuItem value="All">All</MenuItem>
                      {fluTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ marginBottom: '4px' }}>{t('species')}</Typography>
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select value={selectedSpecies2} onChange={(e) => setSelectedSpecies2(e.target.value)}>
                      <MenuItem value="All">All</MenuItem>
                      {speciesOptions.map((species) => (
                        <MenuItem key={species} value={species}>
                          {species}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ marginBottom: '4px' }}>{t('provenance')}</Typography>
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select value={selectedProvenance2} onChange={(e) => setSelectedProvenance2(e.target.value)}>
                      <MenuItem value="All">All</MenuItem>
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
          valueLabelDisplay="on"
          valueLabelFormat={(index) => sliderRange[index]}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
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
    </Box>
  );
};

export default Dashboard;
