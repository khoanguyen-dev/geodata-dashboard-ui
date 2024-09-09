import React, { useState, useEffect } from 'react'; // Core React functionalities for component creation and state management
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material'; // Material UI components for UI elements and styling
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid'; // DataGrid components for displaying data in a grid format with pagination
import { useTranslation } from 'react-i18next'; // Hook for internationalization and translations
import useLogin from '../hooks/useLogin'; // Custom hook for managing login state and authentication

/**
 * Database component provides an interface for administrators to log in and manage bird flu data.
 * It includes a login form, data visualization in a tabular format using DataGrid, and supports data fetching
 * from a backend API. This component is designed to be user-friendly for non-technical users,
 * with clear feedback mechanisms and language support via translations.
 */
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

  const [loading, setLoading] = useState(false); // State to manage loading spinner for data fetching
  const [data, setData] = useState([]); // State to store fetched data from the backend
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10, // Default number of rows per page, with options to increase
    page: 0, // Current page index
  });

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

  /**
   * Function to determine the flu type based on specific values in the data.
   * @param entry - The data entry to analyze for flu type determination.
   * @returns A string representing the type of flu based on conditions.
   */
  const determineFluType = (entry: any) => {
    if (entry.H5N1 === '1.0') return 'H5N1';
    if (entry.H5N2 === '1.0') return 'H5N2';
    if (entry.H7N2 === '1.0') return 'H7N2';
    if (entry.H7N8 === '1.0') return 'H7N8';
    return t('none');
  };

  /**
   * Function to fetch data from the backend API.
   * This function retrieves bird flu data, processes it, and sets it in the state.
   */
  const fetchData = async () => {
    setLoading(true); // Show loading spinner
    try {
      const response = await fetch('http://localhost:5001/api/data'); // Fetch data from the backend
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

  /**
   * Effect hook to check login state from localStorage on component mount.
   * If the user was previously logged in, fetch the data automatically.
   */
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      fetchData(); // Fetch data if the user is already logged in
    }
  }, [isLoggedIn]); // Run the effect when isLoggedIn state changes

  return (
    <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      {/* Render login form if user is not logged in */}
      {!isLoggedIn ? (
        <>
          <Typography variant="h5" gutterBottom>
            {t('adminLogin')} {/* Render translation for 'Admin Login' */}
          </Typography>
          {error && <Alert severity="error" sx={{ marginBottom: '20px' }}>{error}</Alert>} {/* Show error message */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <TextField
              label={t('username')} // Username field
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '10px', maxWidth: '250px' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
            />
            <TextField
              label={t('password')} // Password field
              type="password"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '10px', maxWidth: '250px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
              {t('login')} {/* Render translation for 'Login' button */}
            </Button>
          </Box>
        </>
      ) : (
        // Render data management interface if logged in
        <Box sx={{ marginTop: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <Typography variant="h6" gutterBottom>
              {t('databaseManagement')} {/* Render translation for 'Database Management' */}
            </Typography>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              {t('logout')} {/* Render translation for 'Logout' button */}
            </Button>
          </Box>
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
              />
            </Box>
          ) : (
            <Typography variant="body1">{t('noData')}</Typography> // Show message if no data available
          )}
        </Box>
      )}
    </Box>
  );
};

export default Database;
