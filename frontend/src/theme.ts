/**
 * Custom theme configuration using Material-UI's theming system.
 * Defines color palette, typography, and component styles to provide consistent design across the application.
 */

import { createTheme } from '@mui/material/styles'; // Import createTheme function from Material-UI for custom theme creation

const theme = createTheme({
  palette: { // Define the color palette used throughout the app
    primary: { // Primary color settings
      main: '#004080', // Updated primary color (rich blue)
      contrastText: '#ffffff', // Text color for primary backgrounds
    },
    secondary: { // Secondary color settings
      main: '#ffcc00', // Secondary color (vibrant yellow)
      contrastText: '#004080', // Text color for secondary backgrounds
    },
    background: { // Background color settings
      default: '#f0f4f8', // Light gray background for overall app
      paper: '#ffffff', // Paper component background color
    },
    text: { // Text color settings
      primary: '#333333', // Primary text color for readability
      secondary: '#666666', // Secondary text color for less emphasis
    },
    action: { // Action color settings (e.g., hover states)
      hover: '#e0f7fa', // Light blue hover effect
      selected: '#ffcc00', // Selection color matching the secondary palette
    },
  },
  typography: { // Define typography settings for the app
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Set the default font family for the app
    h1: { // Typography settings for h1 headings
      fontWeight: 700, // Bold font weight for emphasis
      color: '#004080', // Heading color matching the primary color
      fontSize: '2.5rem', // Font size for h1
    },
    h2: { // Typography settings for h2 headings
      fontWeight: 600, // Semi-bold font weight
      color: '#004080', // Heading color matching the primary color
      fontSize: '2rem', // Font size for h2
    },
    h4: { // Typography settings for h4 headings
      fontWeight: 700, // Bold font weight for emphasis
      color: '#004080', // Heading color matching the primary color
      fontSize: '1.5rem', // Font size for h4
    },
    body1: { // Typography settings for body1 (standard text)
      color: '#333333', // Dark gray color for better readability
      fontSize: '1rem', // Font size for body text
    },
    body2: { // Typography settings for body2 (secondary text)
      color: '#666666', // Slightly lighter gray for secondary text
      fontSize: '0.875rem', // Smaller font size for body2
    },
  },
  components: { // Custom style overrides for Material-UI components
    MuiButton: { // Override styles for Button component
      styleOverrides: {
        root: { // Root style for all buttons
          textTransform: 'none', // Disable uppercase transformation of button text
          borderRadius: 12, // More rounded corners for buttons
          padding: '8px 20px', // Add padding for better touch targets
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for a raised button effect
          '&:hover': {
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)', // Enhanced shadow on hover
            backgroundColor: '#003366', // Darken primary color slightly on hover
          },
        },
        containedPrimary: { // Specific styles for primary contained buttons
          backgroundColor: '#004080', // Ensure primary button color consistency
          '&:hover': {
            backgroundColor: '#003366', // Slightly darker on hover
          },
        },
        outlinedPrimary: { // Specific styles for primary outlined buttons
          borderColor: '#004080', // Border color matching primary color
          color: '#004080', // Text color matching primary color
          '&:hover': {
            borderColor: '#003366', // Darken border on hover
            backgroundColor: '#e0f7fa', // Light blue background on hover
          },
        },
      },
    },
    MuiAppBar: { // Override styles for AppBar component
      styleOverrides: {
        root: { // Root style for AppBar
          backgroundColor: '#004080', // Set AppBar background to primary color
          boxShadow: 'none', // Remove default box shadow
        },
      },
    },
    MuiDrawer: { // Override styles for Drawer component
      styleOverrides: {
        paper: { // Paper component inside Drawer
          backgroundColor: '#004080', // Set Drawer background to primary color
          color: '#ffffff', // Ensure text is readable on dark background
          borderRight: '2px solid #ffcc00', // Add a subtle border for separation
        },
      },
    },
    MuiListItemButton: { // Override styles for ListItemButton component
      styleOverrides: {
        root: {
          '&.Mui-selected': { // Style for selected item
            backgroundColor: '#003366', // Darker blue for selected items
            color: '#ffffff', // White text for readability
            '&:hover': {
              backgroundColor: '#002b55', // Keep consistent dark color on hover
            },
          },
          '&:hover': {
            backgroundColor: '#e0f7fa', // Light blue hover effect for non-selected items
          },
        },
      },
    },
    MuiIconButton: { // Override styles for IconButton component
      styleOverrides: {
        root: {
          color: '#ffffff', // Set icon color to white
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Add a semi-transparent white hover effect
          },
        },
      },
    },
    MuiSelect: { // Override styles for Select component
      styleOverrides: {
        icon: { // Style for the dropdown icon in selects
          color: '#004080', // Set icon color to match primary theme
        },
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#004080', // Set border color of the select
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#003366', // Darker border on hover
          },
        },
      },
    },
    MuiPaper: { // Override styles for Paper component
      styleOverrides: {
        root: {
          padding: '16px', // Add padding to all Paper components
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for elevation effect
        },
      },
    },
  },
});

export default theme;
