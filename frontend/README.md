# Frontend for Geodata Dashboard

## Overview

The frontend for the Bird Flu Geodata Dashboard provides a user-friendly interface for visualizing bird flu cases using interactive maps and charts. It allows users to explore data over time, apply filters, and view information in multiple languages.

## Features

- **Interactive Map Views**: Includes single and double map views with clustering and heatmap options.
- **Time Series Analysis**: Timeline slider and playback controls for exploring bird flu data across different periods.
- **Filtering Options**: Filter data by infection type, species, and provenance.
- **Responsive Design**: Ensures a consistent experience across various devices.
- **Multi-language Support**: Provides accessibility in multiple languages using i18next.

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine. This project uses Node.js for both the backend server and frontend development environment.
- **Git**: Required for cloning the repository.

### Install Dependencies

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
    cd <repository-directory>/frontend
   ```
2. **Navigate to the backend directory and install the necessary dependencies**:
   ```bash
   npm install
   ```

### Usage

1. **Start the Frontend Applicatio**:
   - Navigate to the `frontend` directory and start the React application::
    ```bash
    cd frontend
    npm start
    ```
2. **Access the application**:
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

This project uses a comprehensive set of technologies to build a dynamic and interactive geodata dashboard. Here’s a summary of the technologies used in the frontend:

### Frontend

- **[React](https://reactjs.org/docs/getting-started.html)**: A JavaScript library for building user interfaces, facilitating the creation of dynamic, single-page applications.
- **[TypeScript](https://www.typescriptlang.org/docs/)**: A typed superset of JavaScript that compiles to plain JavaScript, offering type safety and early error detection.
- **[Material-UI](https://mui.com/getting-started/installation/)**: A popular React UI framework that implements Google’s Material Design, used to create responsive and accessible user interface components.
- **[Recharts](https://recharts.org/en-US/api)**: A composable charting library built on React components, used for creating interactive and customizable time-series charts.
- **[React Leaflet](https://react-leaflet.js.org/)**: A React wrapper for the Leaflet library, providing interactive maps and geographical visualizations.
- **[i18next](https://www.i18next.com/)**: An internationalization framework for React applications, enabling multi-language support and enhancing accessibility for a diverse user base.

## Data Management

The frontend application relies on the backend to manage and provide data for visualization. Key aspects include:

- **Bird Flu Data**: The frontend fetches bird flu case data from the backend API. This data is used to populate interactive maps and time-series charts, providing users with visual insights into the spread and trends of bird flu cases.

- **User Authentication**: Authentication data, including usernames and passwords, is managed by the backend. The frontend interacts with login components to handle user authentication, ensuring secure access to various features of the application.

- **Data Integration**: The frontend integrates with backend endpoints to retrieve and display data in real-time. This includes handling data filtering, sorting, and visualization, allowing users to interact with and explore the data effectively.

---

Feel free to adjust the content based on any additional details or specific implementations in your project!
