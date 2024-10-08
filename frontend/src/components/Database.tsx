/**
 * Database component provides an interface for administrators to log in and manage bird flu data.
 * It includes a login form, data visualization in a tabular format using DataGrid, and supports data fetching
 * from a backend API. This component is designed to be user-friendly for non-technical users,
 * with clear feedback mechanisms and language support via translations.
 */

import React, { useState, useEffect } from 'react'; // Core React functionalities for component creation and state management
import { Box, TextField, Button, Typography, Alert, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material'; // Material UI components for UI elements and styling
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid'; // DataGrid components for displaying data in a grid format with pagination
import { useTranslation } from 'react-i18next'; // Hook for internationalization and translations
import useLogin from '../hooks/useLogin'; // Custom hook for managing login state and authentication
import useUpload from '../hooks/useUpload'; // Custom hook for managing file uploads

const Database: React.FC = () => {
  // Destructure state and functions from useLogin hook for authentication management
  const {
    username,
    setUsername,
    password,
    setPassword,
    isLoggedIn,
    error,
    setError,
    handleLogin,
    handleLogout,
  } = useLogin(); // Custom hook for handling login, logout, and authentication states

  // Destructure state and functions from useUpload hook for file upload management
  const { file, setFile, uploadError, handleFileUpload, fetchDatabases, availableDatabases } = useUpload(); // Custom hook for handling file uploads

  const [loading, setLoading] = useState(false); // State to manage loading spinner for data fetching
  const [data, setData] = useState([]); // State to store fetched data from the backend
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10, // Default number of rows per page, with options to increase
    page: 0, // Current page index
  });
  const [selectedDatabase, setSelectedDatabase] = useState<string>(''); // State for the selected database

  const { t } = useTranslation(); // Hook for handling translations

  // Columns configuration for the DataGrid, using translated headers
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'latitude', headerName: t('latitude'), width: 150 },
    { field: 'longitude', headerName: t('longitude'), width: 150 },
    { field: 'date', headerName: t('date'), width: 150 },
    { field: 'fluType', headerName: t('fluType'), width: 150 },
    { field: 'species', headerName: t('species'), width: 150 },
    { field: 'provenance', headerName: t('provenance'), width: 150 },
  ];

  const fetchData = async (database: string) => {
    setLoading(true); // Show loading spinner
    try {
      const response = await fetch(`http://localhost:5001/api/data?database=${database}`); // Fetch data from the backend
      if (!response.ok) throw new Error('Failed to fetch data'); // Handle errors in fetching data
      const fetchedData = await response.json(); // Parse the JSON response
      const dataWithIds = fetchedData.map((item: any, index: number) => ({
        id: index + 1,
        latitude: item.latitude,
        longitude: item.longitude,
        date: new Date(item.timestamp).toLocaleDateString(), // Convert timestamp to readable date
        fluType: determineFluType(item), // Determine flu type from data
        species: item.species,
        provenance: item.provenance,
      }));
      setData(dataWithIds); // Set the processed data in state
    } catch (error) {
      setError(t('fetchError')); // Set error state if fetching fails
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const determineFluType = (entry: any) => {
    if (entry.H5N1 === 1.0) return 'H5N1';
    if (entry.H5N2 === 1.0) return 'H5N2';
    if (entry.H7N2 === 1.0) return 'H7N2';
    if (entry.H7N8 === 1.0) return 'H7N8';
    return t('none');
  };

  // Fetch available databases when the component is mounted
  useEffect(() => {
    if (isLoggedIn) {
      fetchDatabases(); // Fetch list of databases if logged in
    }
  }, [isLoggedIn]);

  // Set the selected database to the first one available once the databases are fetched
  useEffect(() => {
    if (availableDatabases.length > 0) {
      setSelectedDatabase(availableDatabases[0]); // Automatically set the first available database
    }
  }, [availableDatabases]);

  // Fetch data whenever the selected database changes
  useEffect(() => {
    if (selectedDatabase) {
      fetchData(selectedDatabase); // Fetch data for the selected database
    }
  }, [selectedDatabase]);

  return (
    <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      {!isLoggedIn ? (
        <>
          <Typography variant="h5" gutterBottom>
            {t('adminLogin')}
          </Typography>
          {error && <Alert severity="error" sx={{ marginBottom: '20px' }}>{error}</Alert>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <TextField
              label={t('username')}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '10px', maxWidth: '250px' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label={t('password')}
              type="password"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '10px', maxWidth: '250px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
              {t('login')}
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ marginTop: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <Typography variant="h6" gutterBottom>
              {t('databaseManagement')} {/* Render translation for 'Database Management' */}
            </Typography>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              {t('logout')} {/* Render translation for 'Logout' */}
            </Button>
          </Box>

          {/* Database Selection */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>{t('selectDatabase')}</InputLabel>
              <Select
                value={selectedDatabase}
                onChange={(e) => setSelectedDatabase(e.target.value as string)}
                label={t('selectDatabase')}
              >
                {availableDatabases.map((db) => (
                  <MenuItem key={db} value={db}>
                    {db}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Data Display */}
          {loading ? (
            <CircularProgress /> // Show loading spinner while data is being fetched
          ) : data.length > 0 ? (
            <Box sx={{ height: 600, width: '100%', marginTop: '20px' }}>
              <DataGrid
                rows={data}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel} // Handle page changes
                pageSizeOptions={[10, 20, 50]} // Options for number of rows per page
                disableRowSelectionOnClick // Disable row selection on click
              />
            </Box>
          ) : (
            <Typography variant="body1">{t('noData')}</Typography> // Show message if no data is available
          )}

          {/* File Upload Section */}
          <Box sx={{ marginTop: '30px', textAlign: 'left' }}>
            <Typography variant="h6" gutterBottom>
              {t('uploadTitle')} {/* Title for the upload section */}
            </Typography>

            {/* File Upload */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <input
                type="file"
                accept=".csv,.json" // Accept both CSV and JSON file formats
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                style={{ display: 'none' }} // Hide the default input style
                id="upload-file"
              />
              <label htmlFor="upload-file">
                <Button variant="contained" component="span">
                  {t('selectFile')} {/* Button to trigger file upload */}
                </Button>
              </label>
              {file && <Typography variant="body2">{file.name}</Typography>} {/* Display selected file name */}
            </Box>

            {/* Submit Button */}
            <Button
              variant="outlined"
              color="primary"
              onClick={async () => {
                await handleFileUpload(); // Handle file upload
                fetchDatabases(); // Refresh available databases after a successful upload
              }}
              sx={{ marginTop: '10px' }}
              disabled={!file} // Disable if no file is selected
            >
              {t('submit')} {/* Submit button for uploading file */}
            </Button>

            {/* Display Errors if Any */}
            {uploadError && <Alert severity="error" sx={{ marginTop: '10px' }}>{uploadError}</Alert>} {/* Show upload errors */}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Database;
