# Frontend for Geodata Dashboard

## Overview

The frontend for the Bird Flu Geodata Dashboard provides a user-friendly interface for visualizing bird flu cases using interactive maps and charts. It allows users to explore data over time, apply filters, and view information in multiple languages.

## Features

The Bird Flu Cases Dashboard provides the following features:

- **Choose a Specific Database**: Select from available databases to view relevant data.
- **Compare Data Across Locations**: Analyze and compare bird flu cases across different regions.
- **Select a Specific Period**: Filter data based on specific time periods within the database.
- **Switch Between Views**: Choose between Single Map and Double Map views for data visualization.
- **Timeline Modes**: Toggle between seasonal and monthly timeline views.
- **Map Visualization Options**: Switch between cluster maps and heat maps.
- **Filter Options**: Refine data by infection type, species, and provenance.
- **Time Slider and Playback Controls**: Navigate through data with a time slider and playback controls.
- **PDF Report Capture**: Print out a detailed PDF report of the current view.

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine. This project uses Node.js for both the backend server and frontend development environment.
- **Git**: Required for cloning the repository.

### Install Dependencies

1. **Install Dependencies**:

Navigate to the backend directory and install the necessary dependencies

   ```bash
   cd backend
   npm install
   ```

2. **Start the Frontend Application**:

Start the React application:

    ```bash
    npm start
    ```

3. **Access the application**:
   - Open your web browser and navigate to `http://localhost:3000`. The Dashboard should now be running and accessible for use.

## File Structure

```plaintext
frontend/
│
├── public/                                     # Public assets and HTML file
│
├── src/
│   ├── components/                             # React components
│   │   ├── About.tsx                           # About page component
│   │   ├── Contact.tsx                         # Contact page component
│   │   ├── Dashboard.tsx                       # Main dashboard component
│   │   ├── Database.tsx                        # Admin database management component
│   │   ├── MapView.tsx                         # Map visualization component
│   │   ├── Navigation.tsx                      # Navigation bar component
│   │   └── TimeSeriesChart.tsx                 # Time series chart component
│   │
│   ├── constants/                              # Constant values and configurations
│   │   ├── colors.ts                           # Color mappings for flu types
│   │   └── filters.ts                          # Filter options for species and provenance
│   │
│   ├── hooks/                                  # Custom React hooks
│   │   ├── useFluData.ts                       # Hook for fetching and processing flu data
│   │   └── useLogin.ts                         # Hook for managing login state
│   │   └── useUpload.ts                        # Hook for managing uploading new database
│   │
│   ├── types/                                  # TypeScript type definitions
│   │   ├── birdFluTypes.ts                     # Types for bird flu data structures
│   │   ├── leaflet.heat.d.ts                   # Type definitions for Leaflet heatmap plugin
│   │   └── react-leaflet-markercluster.d.ts    # Type definitions for React Leaflet marker cluster plugin
│   │
│   ├── utils/                                  # Utility functions
│   │   └── utils.ts                            # General utility functions for data processing and sorting
│   │
│   ├── App.tsx                                 # Main application component with routing
│   ├── i18n.ts                                 # i18n configuration for multi-language support
│   ├── index.tsx                               # Entry point for the React application
│   └── theme.ts                                # Custom theme configuration for Material-UI
│
├── package.json                                # Node.js package configuration file
└── README.md                                   # Project README file
```

## Technology Stack

The frontend of the Bird Flu Geodata Dashboard leverages a modern technology stack to deliver a robust and interactive user experience:

### Frontend Technologies

- **[React](https://reactjs.org/docs/getting-started.html)**: A powerful JavaScript library used for building user interfaces, particularly single-page applications where a dynamic and responsive user experience is essential.
  
- **[TypeScript](https://www.typescriptlang.org/docs/)**: A statically typed superset of JavaScript that enhances code quality and maintainability by providing type safety and advanced tooling support.

- **[Material-UI](https://mui.com/getting-started/installation/)**: A popular React component library that implements Google's Material Design principles, providing a rich set of customizable and accessible UI components for a consistent look and feel.

- **[Recharts](https://recharts.org/en-US/api)**: A composable charting library built on React components, used for creating interactive, responsive, and customizable visualizations like time-series charts that display trends in bird flu data.

- **[React Leaflet](https://react-leaflet.js.org/)**: A React wrapper for the Leaflet mapping library, enabling the integration of interactive maps with features like clustering and heatmaps to visualize geospatial data effectively.

- **[React-Leaflet-Cluster](https://react-leaflet.js.org/docs/plugins/#markercluster)** and **[Leaflet.Heat](https://github.com/Leaflet/Leaflet.heat)**: Plugins used with React Leaflet to enhance map functionality, such as clustering data points and visualizing intensity with heatmaps.

- **[i18next](https://www.i18next.com/)**: An internationalization framework for React applications, allowing the dashboard to support multiple languages and improve accessibility for a global audience.

- **[React Router](https://reactrouter.com/)**: A standard library for routing in React, enabling navigation between different views and pages within the application.

- **[ESLint](https://eslint.org/)** and **[Prettier](https://prettier.io/)**: Tools for maintaining code quality and formatting standards across the project, ensuring consistency and readability.

## Data Management

The frontend application works seamlessly with the backend to manage and display bird flu data, providing a comprehensive view of the data through various visualizations and filters:

- **Data Fetching and Integration**: The frontend fetches data from the backend API, including bird flu case details and user authentication information. Data is fetched on demand and integrated into interactive components, such as maps and charts.

- **Dynamic Filtering and Visualization**: Users can filter data by infection type, species, provenance, and time periods directly from the frontend interface. This filtering is powered by utility functions that process data dynamically, ensuring the visualizations reflect the most relevant and accurate information.

- **Geospatial Data Visualization**: The application utilizes interactive maps to display bird flu cases geographically. The use of cluster maps and heatmaps allows users to explore spatial patterns and trends effectively.

- **Time-Series Analysis**: The frontend provides time-series visualizations that allow users to analyze trends over different periods, including seasonal and monthly views. The time slider and playback controls offer an intuitive way to explore data across time.

- **User Authentication and Security**: User credentials are securely handled through the backend API. The frontend integrates login functionality to ensure that only authorized users can access certain features, such as database management.

- **Data Updates and Management**: Admin users can update or upload new databases directly through the frontend, which interacts with the backend to manage the data files. This functionality ensures that the data remains up-to-date and relevant for analysis.

- **Responsive and Accessible Design**: The frontend is designed to be responsive, providing a consistent user experience across various devices and screen sizes. Accessibility is also a priority, with multi-language support and compliance with accessibility standards.

---

Feel free to adjust the content based on any additional details or specific implementations in your project!
