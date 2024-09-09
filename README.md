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
   git clone https://github.com/khoanguyen-dev/geodata-dashboard-ui.git
   cd geodata-dashboard-ui
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

The backend serves data from CSV files via a REST API, including key details like latitude, longitude, flu type, species, and provenance. This allows the frontend to visualize and interact with the data through maps and charts. Additionally, a separate CSV file is used for user authentication, ensuring only authorized users can access sensitive features.

Key data management features include:

- **Filtering**: Users can filter data by infection type, species, and provenance.
- **Sorting**: Data can be sorted to highlight specific trends or cases.
- **Visualization**: Various maps and charts enable data analysis across time periods and infection types.


## FAIR and ORD Principles

The project follows FAIR ([Findable, Accessible, Interoperable, Reusable](https://www.go-fair.org/fair-principles/)) and ORD ([Open Research Data](https://op.europa.eu/en/publication-detail/-/publication/7f07de4e-8b6f-11e8-ac6a-01aa75ed71a1)) principles to promote open science and data sharing:

- **Findable**: Data is structured and indexed for easy discovery.
- **Accessible**: Open APIs ensure data is accessible to authorized users.
- **Interoperable**: Standard formats (CSV, JSON) and common data models enhance compatibility.
- **Reusable**: Well-documented data and modular code facilitate reuse and adaptation.

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

We consider implementing the following features and improvements:

### 1. **Testing for Backend and Frontend**

Implement comprehensive testing to ensure the reliability and robustness of both backend and frontend components. 

- **Technologies**: Use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for frontend tests, and [Jest](https://jestjs.io/), [Supertest](https://www.npmjs.com/package/supertest), or [Mocha](https://mochajs.org/) for backend API testing.

### 2. **Advanced Data Management for Administrators**

Enable administrators to manage, validate, and provide feedback on data files directly through the dashboard, including options for uploading, adjusting, and removing multiple data files.

- **Technologies**: Implement file management with [React Dropzone](https://react-dropzone.js.org/) for file uploads and [Yup](https://github.com/jquense/yup) for data validation.

### 3. **Enhanced Data Visualization Options**

Add bar charts, pie charts, and scatter plots to provide users with diverse ways to interpret data, enhancing the dashboard's analytical capabilities.

- **Technologies**: Utilize [Recharts](https://recharts.org/en-US) or [Chart.js](https://www.chartjs.org/) to integrate new chart types.

### 4. **Real-Time Data Updates**

Incorporate real-time data updates to reflect the latest information, crucial for timely decision-making.

- **Technologies**: Use [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) or [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) for real-time data streaming.

### 5. **User Authentication and Role Management**

Implement user authentication and role-based access to secure data and functionalities, ensuring only authorized access.

- **Technologies**: Integrate [Auth0](https://auth0.com/) or [Passport.js](http://www.passportjs.org/) for authentication and role management.

### 6. **Advanced Filtering and Search**

Introduce advanced filtering and search options to allow users to query data more precisely, enhancing the user experience with large datasets.

- **Technologies**: Use [React Select](https://react-select.com/) for advanced filtering UI and optimize backend queries with [ElasticSearch](https://www.elastic.co/elasticsearch/) for efficient search capabilities.

### 7. **Customizable User Dashboards**

Allow users to customize their dashboard layouts and save preferences, improving usability by letting them tailor the dashboard to their needs.

- **Technologies**: Use [Redux](https://redux.js.org/) or [Context API](https://reactjs.org/docs/context.html) for state management and [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for saving user preferences.

### 8. **Improved Accessibility Features**

Enhance accessibility to ensure the dashboard is usable by all users, including those with disabilities.

- **Technologies**: Conduct audits with [Lighthouse](https://developers.google.com/web/tools/lighthouse) and [axe](https://www.deque.com/axe/) for accessibility improvements, and implement [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) roles and labels.

### 9. **Integration with External Data Sources**

Expand the dashboard's data by integrating with external sources, offering a more comprehensive analysis.

- **Technologies**: Use [Axios](https://axios-http.com/) or [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for API integration and ensure compatibility with [GeoJSON](https://geojson.org/) for geospatial data.

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

We welcome your thoughts and are eager to hear how you use or contribute to the Bird Flu GeoData Dashboard!
