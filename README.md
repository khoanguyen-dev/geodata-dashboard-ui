# Geodata Dashboard UI

## Overview

This project is a Geodata Dashboard UI designed to visualize bird flu cases over time using geospatial data. The dashboard aims to provide a user-friendly interface that enables non-technical users, such as politicians and stakeholders, to make informed decisions based on comprehensive spatial and temporal insights. The project adheres to FAIR (Findable, Accessible, Interoperable, Reusable) and ORD (Open Research Data) practices, ensuring the data is managed and presented in a way that is sustainable and reusable.

## Features

- **Interactive Map Views**: The dashboard includes single and double map views, allowing users to visualize data using both cluster and heat map modes.
- **Time Series Analysis**: A timeline slider and playback controls enable users to explore bird flu cases across different seasons or months.
- **Filtering Options**: Users can filter data by infection type, species, and provenance to tailor the visualizations to their specific needs.
- **Responsive Design**: The UI is designed to be responsive, ensuring a consistent experience across various devices.
- **Multi-language Support**: The application supports multiple languages, enhancing accessibility for a diverse user base.

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine. This project uses Node.js for both the backend server and frontend development environment.
- **Git**: Required for cloning the repository.

### Install Dependencies

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Navigate to the backend directory and install the necessary dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Install frontend dependencies**:
	```bash
   cd backend
   npm install
   ```

### Usage

To start using the Bird Flu Cases Dashboard, follow these steps:

1. **Run the backend server**:
   - Open a terminal, navigate to the backend directory, and start the server:
     ```bash
     cd backend
     npm start
     ```

2. **Run the frontend application**:
   - Open another terminal, navigate to the frontend directory, and start the React application:
     ```bash
     cd frontend
     npm start
     ```

3. **Access the application**:
   - Open your web browser and navigate to `http://localhost:3000`. The Bird Flu Cases Dashboard should now be running and accessible for use.

## File Structure

### Backend File Structure

```plaintext
backend/
│
├── data/
│   └── fake_bird_data_switzerland_v2.csv       # Data file containing bird flu cases
│   └── users.csv       							  # Data file containing usernames and passwords
│
├── server.js                                   # Main server file handling API requests and serving data
│
├── package.json                                # Node.js package configuration file
│
└── README.md                                   # Backend-specific README file
```

### Frontend File Structure
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

This project leverages a comprehensive set of technologies to build an interactive geodata dashboard for visualizing bird flu data. The stack includes frontend, backend, data storage, and development tools, each carefully chosen to ensure the application is robust, scalable, and user-friendly.

### Frontend
- **[React](https://reactjs.org/docs/getting-started.html)**: A JavaScript library for building user interfaces, used for creating the dynamic and interactive single-page application.
- **[TypeScript](https://www.typescriptlang.org/docs/)**: A typed superset of JavaScript that compiles to plain JavaScript, providing type safety and early error detection.
- **[Material-UI](https://mui.com/getting-started/installation/)**: A popular React UI framework that implements Google’s Material Design, used for responsive and accessible UI components.
- **[Recharts](https://recharts.org/en-US/api)**: A composable charting library built on React components, used to create interactive and customizable time-series charts.
- **[React Leaflet](https://react-leaflet.js.org/)**: A React wrapper for the Leaflet library, providing interactive maps and geographical visualizations.
- **[i18next](https://www.i18next.com/)**: An internationalization framework for React applications, used for providing multi-language support across the dashboard.

### Backend
- **[Node.js](https://nodejs.org/en/docs/)**: A JavaScript runtime built on Chrome's V8 engine, used for server-side scripting and building scalable network applications.
- **[Express](https://expressjs.com/)**: A minimalist web framework for Node.js, used to set up the server and handle API routes for data retrieval and user authentication.
- **[CSV-Parser](https://github.com/mafintosh/csv-parser)**: A streaming parser for CSV files in Node.js, used to read and process bird flu data and user credentials asynchronously.
- **[CORS](https://github.com/expressjs/cors)**: Middleware to enable Cross-Origin Resource Sharing, allowing frontend and backend interaction from different origins.
- **[Body-Parser](https://github.com/expressjs/body-parser)**: Middleware for parsing incoming request bodies in a middleware, supporting JSON and URL-encoded bodies.

### Data Storage
- **CSV Files**: Simple, human-readable text files used for storing bird flu data and user credentials in a structured format, enabling easy data management and integration.

### Additional Tools
- **[React Router](https://reactrouter.com/)**: A standard routing library for React, enabling navigation between different components/pages such as Dashboard, About, Contact, and Database sections.
- **[React-Leaflet-Cluster](https://www.npmjs.com/package/react-leaflet-markercluster)**: Adds clustering capabilities to React Leaflet maps, enhancing visualization by grouping nearby markers into clusters for large datasets.
- **[Leaflet.Heat](https://github.com/Leaflet/Leaflet.heat)**: A Leaflet plugin used to create heatmaps from geographical data points, providing a visual representation of data density on the map.

### Development Tools
- **[Git](https://git-scm.com/)**: A distributed version control system used for tracking changes in the codebase and facilitating collaboration among team members.
- **[ESLint](https://eslint.org/)** and **[Prettier](https://prettier.io/)**: Tools used for maintaining code quality through linting and formatting, ensuring consistent code style across the project.


## Data Management

The backend server manages data from CSV files and provides it through a REST API for the frontend application. The data includes crucial information such as latitude, longitude, flu type, species, and provenance. This setup enables the visualization and interaction of data through various map and chart components in the dashboard.

Additionally, the backend uses a separate CSV file to store usernames and passwords for user authentication. This file allows administrators to log in and access functionalities for managing and viewing data. The authentication system ensures that only authorized users can access sensitive features and data.

The dashboard supports a range of data management capabilities, including:

- **Filtering**: Users can apply filters to view specific data subsets based on infection type, species, and provenance.
- **Sorting**: Data can be sorted to highlight trends or specific cases.
- **Visualization**: The dashboard provides various visualization options, such as maps and charts, to analyze data across different time periods and infection types.

This approach facilitates comprehensive data analysis and decision-making by allowing administrators to efficiently manage and interact with the bird flu data.

## FAIR and ORD Principles

This project adheres to FAIR (Findable, Accessible, Interoperable, Reusable) and ORD (Open Research Data) principles to ensure that the data and software are easily accessible, reusable, and can be integrated into other systems. Key aspects include:

- **Findable**: The data is organized and indexed in a structured manner, making it easy to find relevant information.
- **Accessible**: The data and APIs are open and accessible to authorized users, ensuring transparency and ease of access.
- **Interoperable**: The data follows standard formats (e.g., CSV, JSON) and uses common data models, making it compatible with other systems.
- **Reusable**: The data is well-documented, and the code is designed with modularity in mind, allowing for easy reuse and adaptation in other projects.

By implementing these principles, the Bird Flu Cases Dashboard aims to contribute to the broader goals of open science and data sharing in public health.

## Contribution

Contributions to the project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
	```
3. Make your changes and commit them with clear and concise messages.
4. Push your branch to your forked repository:
	```bash
   git push origin feature-name
	```
5. Open a pull request on the main repository, detailing the changes you’ve made.

## Next Steps

As you continue to enhance the Geodata Dashboard UI, consider the following potential features and improvements.

### 1. **Enhanced Data Visualization Options**

**Feature**: Add additional visualization types such as bar charts, pie charts, and scatter plots.

**Benefit**: Provides users with multiple ways to interpret and analyze the bird flu data, making the dashboard more versatile.

**Implementation**:
- **Explore Libraries**: Utilize libraries like [Recharts](https://recharts.org/en-US) or [Chart.js](https://www.chartjs.org/) to integrate new chart types.
- **Component Development**: Create new React components for each chart type and incorporate them into the dashboard.
- **Data Integration**: Ensure that these components are properly integrated with the existing data sources and that they respond to user interactions like filtering and time-series analysis.

### 2. **Real-Time Data Updates**

**Feature**: Implement real-time data updates to reflect the most current bird flu information.

**Benefit**: Enhances the dashboard's relevance and utility by providing the latest data, which is crucial for timely decision-making.

**Implementation**:
- **WebSocket Integration**: Use WebSocket or server-sent events (SSE) to push real-time updates from the server to the frontend.
- **Frontend Handling**: Update React components to handle real-time data streams and refresh the UI accordingly.
- **Backend Support**: Modify the backend to support real-time data broadcasting and ensure it can handle concurrent connections.

### 3. **User Authentication and Role Management**

**Feature**: Implement user authentication and role-based access control.

**Benefit**: Secures sensitive data and functionalities, ensuring that only authorized users can access or modify certain aspects of the dashboard.

**Implementation**:
- **Authentication Library**: Integrate an authentication library such as [Passport.js](http://www.passportjs.org/) for Node.js or use services like Auth0.
- **Role Management**: Define user roles and permissions, and implement role-based access control within the application.
- **UI Adjustments**: Modify the UI to display different content or options based on user roles and authentication status.

### 4. **Advanced Filtering and Search**

**Feature**: Introduce advanced filtering and search capabilities to allow users to more precisely query the data.

**Benefit**: Improves user experience by enabling more detailed and specific data analysis, which is especially useful for large datasets.

**Implementation**:
- **Filter Components**: Develop new React components for advanced filters and search inputs, and integrate them into the dashboard.
- **Backend Queries**: Update the backend to handle complex queries and filtering requests efficiently.
- **Performance Optimization**: Ensure that advanced filters and search functionalities do not adversely affect the performance of the application.

### 5. **Customizable User Dashboards**

**Feature**: Allow users to customize their dashboard views and save their preferences.

**Benefit**: Personalizes the user experience and improves usability by letting users tailor the dashboard to their needs.

**Implementation**:
- **Customization Options**: Create features that let users adjust the layout, select preferred visualizations, and save these settings.
- **Persistent Storage**: Use local storage or a user preferences database to save and load customizations.
- **User Interface**: Design and implement an interface for users to configure and manage their dashboard settings.

### 6. **Improved Accessibility Features**

**Feature**: Enhance accessibility features to support users with disabilities.

**Benefit**: Ensures the dashboard is usable by a broader audience, complying with accessibility standards and guidelines.

**Implementation**:
- **Accessibility Testing**: Conduct accessibility audits using tools like [Lighthouse](https://developers.google.com/web/tools/lighthouse) or [axe](https://www.deque.com/axe/).
- **Aria Labels and Roles**: Implement ARIA (Accessible Rich Internet Applications) labels and roles to improve screen reader compatibility.
- **Keyboard Navigation**: Ensure that all interactive elements are navigable and usable via keyboard.

### 7. **Integration with External Data Sources**

**Feature**: Expand the dashboard's capabilities by integrating with additional external data sources.

**Benefit**: Provides a more comprehensive view by combining various datasets, potentially offering richer insights.

**Implementation**:
- **API Integration**: Identify and connect to relevant APIs that provide supplementary data.
- **Data Normalization**: Ensure that data from external sources is compatible with the existing data model and formats.
- **UI Enhancements**: Update the dashboard UI to accommodate and display the additional data effectively.

By implementing these potential features and improvements, you can enhance the functionality, usability, and relevance of the Geodata Dashboard UI, making it a more powerful tool for analyzing and visualizing bird flu data.

## License

This project is licensed under the Apache License 2.0, which allows for free use, modification, and distribution of the software under certain conditions. You can review the full terms of the license in the [LICENSE](LICENSE) file included in this repository. This license promotes open collaboration and ensures that the project remains accessible to all users.

## Acknowledgements

We gratefully acknowledge the contributions and support from the following:

- **Swiss Data Science Center**: For providing the task that served as the foundation for this project.
- **Material-UI**: For their robust React components, which were integral to building the user interface.
- **Leaflet** and **react-leaflet**: For their powerful mapping tools, which enabled the interactive map features.
- **The World Health Organization (WHO)**, **Federal Office of Public Health (FOPH) Switzerland**, and **European Commission**: For providing open data and resources that are vital for public health monitoring and research.

We also thank the open-source community for their continuous support and contributions, which make projects like this possible.

## Contact

For questions, feedback, or further information, please reach out to:

- **Email**: [khoanguyen.pro@outlook.com](mailto:khoanguyen.pro@outlook.com)

We welcome your thoughts and are eager to hear how you use or contribute to the Bird Flu Cases Dashboard!
