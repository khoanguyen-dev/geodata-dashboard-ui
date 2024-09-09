
/**
 * Custom theme configuration using Material-UI's theming system.
 * Defines color palette, typography, and component styles to provide consistent design across the application.
 */

import { createTheme } from '@mui/material/styles'; // Import createTheme function from Material-UI for custom theme creation

const theme = createTheme({
  palette: { // Define the color palette used throughout the app
    primary: { // Primary color settings
      main: '#003366', // Main primary color (dark blue)
    },
    secondary: { // Secondary color settings
      main: '#ffffff', // Main secondary color (white)
    },
    background: { // Background color settings
      default: '#f4f4f9', // Default background color (light gray)
    },
  },
  typography: { // Define typography settings for the app
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Set the default font family for the app
    h4: { // Typography settings for h4 headings
      fontWeight: 700, // Bold font weight for emphasis
      color: '#003366', // Heading color matching the primary color
    },
    body1: { // Typography settings for body1 (standard text)
      color: '#333333', // Dark gray color for better readability
    },
  },
  components: { // Custom style overrides for Material-UI components
    MuiButton: { // Override styles for Button component
      styleOverrides: {
        root: { // Root style for all buttons
          textTransform: 'none', // Disable uppercase transformation of button text
          borderRadius: 8, // Rounded corners for buttons
        },
      },
    },
  },
});

export default theme;
