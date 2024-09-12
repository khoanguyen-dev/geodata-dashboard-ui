# Bird Flu Geodata Dashboard

## Overview 🔎

This project is a Geodata Dashboard UI designed to visualize bird flu cases over time using geospatial data. The dashboard aims to provide a user-friendly interface that enables non-technical users, such as politicians and stakeholders, to make informed decisions based on comprehensive spatial and temporal insights. The project adheres to FAIR (Findable, Accessible, Interoperable, Reusable) and ORD (Open Research Data) practices, ensuring the data is managed and presented in a way that is sustainable and reusable.

## Key Features 🎯

- **Choose a Specific Database**: Select from available databases to view relevant data.
- **Compare Data Across Locations**: Analyze and compare bird flu cases across different regions.
- **Select a Specific Period**: Filter data based on specific time periods within the database.
- **Switch Between Views**: Choose between Single Map and Double Map views for data visualization.
- **Timeline Modes**: Toggle between seasonal and monthly timeline views.
- **Map Visualization Options**: Switch between cluster maps and heat maps.
- **Filter Options**: Refine data by infection type, species, and provenance.
- **Time Slider and Playback Controls**: Navigate through data with a time slider and playback controls.
- **PDF Report Capture**: Print out a detailed PDF report of the current view.
- **User Authentication**: Secure access for admins to view and manage databases.
- **Database Management**: Admins can update or upload new databases for analysis.
- **User Manual**: A comprehensive `user_manual.pdf` is provided to guide users on how to utilize the dashboard's features effectively.

## Installation and Setup 💻

### Prerequisites

- **Git**: Required for cloning the repository.
- **Go**: Required for running the backend server using Go. You can download and install Go from the official website: [Install Go](https://golang.org/dl/).
- **Node.js**: Required for running the frontend server and optionally for the backend server. You can download and install Node.js from the official website: [Install Node.js](https://nodejs.org/).

### Install Dependencies

1. **Clone the repository**:
   ```bash
   git clone https://github.com/khoanguyen-dev/geodata-dashboard-ui.git
   cd geodata-dashboard-ui
   ```
2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
3. **Install Go dependencies**:

- Ensure that you have Go installed and properly set up on your machine.
- No additional installation commands are needed for Go, as the necessary packages will be fetched during the server's runtime.

4. **(Optional) Install Node.js dependencies for the backend**:

If you prefer using the Node.js backend server, install the necessary npm packages:

   ```bash
   npm install
   ```
4. **Install frontend dependencies**:

   ```bash
   cd ../frontend
   npm install 
   ```

### Usage

To start using the Bird Flu Cases Dashboard, follow these steps:

1. **Run the backend server using Go**:

- Open a terminal, navigate to the backend directory, and start the Go server:

   ```bash
   cd backend
   go run main.go
   ```
- Alternatively, if you prefer using the Node.js backend server:
   ```bash
   npm start
   ```

2. **Run the frontend application**:

Open another terminal, navigate to the frontend directory, and start the React application
   ```bash
   cd frontend
   npm start
   ```


3. **Access the application**:

3. **Access the application**:
   - After both the backend server and the frontend application are running, open your web browser and navigate to [http://localhost:3000](http://localhost:3000).
   - You should see the Bird Flu Cases Dashboard interface, where you can start exploring the data, use filters, and visualize bird flu cases across different locations and time periods.


## File Structure 🗂️

### Backend File Structure

```plaintext
backend/
│
├── data/
│   └── fake_bird_data_switzerland_v2.csv       # Data file containing bird flu cases
│
├── login
│   └── users.csv                               # Data file containing usernames and passwords
│
├── server.js                                   # Main server file writen in Node.js handling API requests and serving data
│
├── server.go                                   # Main server file writen in Go handling API requests and serving data
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

## Technology Stack 🔗

The Bird Flu Geodata Dashboard leverages a combination of modern technologies for both frontend and backend development, providing a robust and scalable platform for visualizing bird flu data.

### Frontend

- **[React](https://reactjs.org/docs/getting-started.html)**: A JavaScript library for building dynamic user interfaces, utilized for creating a responsive single-page application.
- **[TypeScript](https://www.typescriptlang.org/docs/)**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality through type safety and early error detection.
- **[Material-UI](https://mui.com/getting-started/installation/)**: A React UI framework implementing Google's Material Design, used for crafting responsive and accessible UI components.
- **[Recharts](https://recharts.org/en-US/api)**: A composable charting library built on React components, enabling the creation of interactive and customizable time-series charts.
- **[React Leaflet](https://react-leaflet.js.org/)**: A React wrapper for the Leaflet library, used to provide interactive maps and geospatial visualizations.
- **[React-Leaflet-Cluster](https://www.npmjs.com/package/react-leaflet-markercluster)**: Enhances map visualizations by adding clustering capabilities to Leaflet maps, effectively managing large datasets.
- **[Leaflet.Heat](https://github.com/Leaflet/Leaflet.heat)**: A Leaflet plugin used to generate heatmaps, visually representing data density on maps.
- **[i18next](https://www.i18next.com/)**: An internationalization framework for React applications, supporting multi-language interfaces and enhancing accessibility for global users.

### Backend

- **[Node.js](https://nodejs.org/en/docs/)**: A JavaScript runtime built on Chrome's V8 engine, used for server-side scripting and constructing scalable network applications.
- **[Express](https://expressjs.com/)**: A minimalist web framework for Node.js, used for setting up the server and managing API routes for data retrieval and user authentication.
- **[Go](https://golang.org/doc/)**: A statically typed programming language designed for scalability and efficiency, used for building a high-performance backend server.
- **[CSV-Parser](https://github.com/mafintosh/csv-parser)**: A streaming CSV parser for Node.js, used to read and process bird flu data and user credentials asynchronously.
- **[CORS](https://github.com/expressjs/cors)**: Middleware for enabling Cross-Origin Resource Sharing, facilitating secure communication between frontend and backend.
- **[Body-Parser](https://github.com/expressjs/body-parser)**: Middleware for parsing incoming request bodies, supporting JSON and URL-encoded data.

### Data Storage

- **CSV Files**: Used for storing bird flu data and user credentials in a structured format, allowing easy data integration and management.

### Additional Tools

- **[React Router](https://reactrouter.com/)**: A standard routing library for React, enabling navigation between different components and pages, such as Dashboard, About, Contact, and Database sections.
- **[Git](https://git-scm.com/)**: A distributed version control system used for tracking changes in the codebase and facilitating collaboration among developers.
- **[ESLint](https://eslint.org/)** and **[Prettier](https://prettier.io/)**: Tools for maintaining code quality through linting and formatting, ensuring consistent coding standards across the project.

## Data Management 📊

The backend serves data from CSV files via RESTful APIs, including essential information like latitude, longitude, flu type, species, and provenance. This structured data is then visualized through interactive maps and charts in the frontend, enabling users to explore and analyze bird flu cases over time.

### Key Data Management Features:

- **Filtering**: Users can filter data by infection type, species, and provenance, allowing them to refine the visualizations according to their needs.
- **Sorting**: Data can be sorted to highlight specific trends or cases, providing clearer insights into the data.
- **Visualization**: Interactive maps and charts facilitate a comprehensive analysis of bird flu data across various time periods and geographical locations.
- **User Authentication**: A separate CSV file is used for managing user credentials, ensuring secure access to the dashboard's features. Only authorized users can access sensitive data and perform administrative tasks, such as updating or uploading new databases.
- **Real-Time Data Updates**: The dashboard is designed to handle real-time data updates, ensuring that the information presented is current and relevant for decision-making purposes.
- **Integration with External Data Sources**: The dashboard can integrate additional data from external sources, offering a more comprehensive analysis and expanding the available insights.

These data management capabilities ensure that the Bird Flu Geodata Dashboard remains a powerful tool for visualizing and analyzing geospatial and temporal data in a user-friendly format, adhering to open data standards and principles.

## FAIR and ORD Principles ⚖️

The project follows FAIR ([Findable, Accessible, Interoperable, Reusable](https://www.go-fair.org/fair-principles/)) and ORD ([Open Research Data](https://op.europa.eu/en/publication-detail/-/publication/7f07de4e-8b6f-11e8-ac6a-01aa75ed71a1)) principles to promote open science and data sharing:

- **Findable**: Data is structured and indexed for easy discovery.
- **Accessible**: Open APIs ensure data is accessible to authorized users.
- **Interoperable**: Standard formats (CSV, JSON) and common data models enhance compatibility.
- **Reusable**: Well-documented data and modular code facilitate reuse and adaptation.

## Contribution 🤝

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

## Next Steps 🚀

To further enhance the Bird Flu Cases Dashboard, the following features and improvements are planned:

### 1. **Advanced Data Source Integration**

Expand the dashboard's data capabilities by incorporating additional data sources and adhering to geospatial standards such as GIS European Standards (FDGC and OGC standards). This will enable broader and more comprehensive data visualization, enhancing decision-making capabilities for users.

- **Potential Technology**: Integrate APIs using [Axios](https://axios-http.com/) or [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). For geospatial data, ensure compatibility with [GeoJSON](https://geojson.org/) and consider using [GDAL](https://gdal.org/) for advanced geospatial data processing.

### 2. **Enhanced User Experience for Decision Makers**

Enable decision-makers, such as politicians, to generate quick reports that include stats, plots, and export options like images or PDF reports directly from the dashboard. This aligns with the goal of providing actionable insights and facilitating data-driven decisions.

- **Potential Technology**: Use [html2canvas](https://html2canvas.hertzen.com/) and [jsPDF](https://github.com/parallax/jsPDF) for generating PDFs from the dashboard's current view, allowing users to capture and export insights effectively.

### 3. **Customizable Visual and Usability Enhancements**

Further refine the design by implementing user-friendly visual elements such as customizable color schemes, accessibility enhancements, and user interface improvements to align with the needs of non-technical users.

- **Potential Technology**: Employ [Material-UI](https://mui.com/) for adaptable and accessible UI components, along with [React-ARIA](https://react-spectrum.adobe.com/react-aria/) for enhanced accessibility support.

### 4. **Robust Frontend-Backend Interoperability**

Ensure the frontend can easily connect to various backends, including different login services or data sources, enhancing the system's interoperability and flexibility. This aligns with the goal of making the application highly reusable and adaptable to different datasets and user needs.

- **Potential Technology**: Implement [GraphQL](https://graphql.org/) for a more flexible API that can query multiple backends or data services, and consider using [REST APIs](https://restfulapi.net/) for simpler integrations.

### 5. **Performance Optimization for Large Datasets**

Plan for handling large datasets and potentially real-time data, which is critical for scenarios involving extensive geospatial information. This includes optimizing both the frontend rendering and backend data processing to ensure smooth user interactions.

- **Potential Technology**: Utilize data virtualization libraries like [react-virtualized](https://github.com/bvaughn/react-virtualized) for efficient rendering of large lists or grids. On the backend, consider data caching strategies or using [Redis](https://redis.io/) for faster data access.

### 6. **Enhanced Security and Data Privacy Measures**

Develop advanced security measures, especially when dealing with sensitive data like the exact geolocations of endangered species. This includes implementing role-based access control and ensuring data privacy through best practices.

- **Potential Technology**: Integrate [Auth0](https://auth0.com/) for authentication and role management, and use [OWASP guidelines](https://owasp.org/) to enforce data privacy and security protocols.

### 7. **Comprehensive Testing and Quality Assurance**

Implement thorough testing frameworks to ensure the reliability and robustness of the dashboard, covering both frontend and backend components. This includes unit tests, integration tests, and end-to-end tests.

- **Potential Technology**: Use [Jest](https://jestjs.io/) for unit testing, [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for frontend tests, and [Supertest](https://www.npmjs.com/package/supertest) or [Cypress](https://www.cypress.io/) for API and end-to-end testing.

### 8. **Advanced Filtering and Search Capabilities**

Enhance the filtering options with advanced search functionalities, allowing users to perform complex queries and drill down into specific subsets of data. This will improve the overall user experience, particularly when dealing with extensive datasets.

- **Potential Technology**: Implement advanced filtering UI components using [React Select](https://react-select.com/), and consider backend optimizations with [ElasticSearch](https://www.elastic.co/elasticsearch/) for powerful search capabilities.

### 9. **Customizable User Dashboards**

Provide users with the ability to customize their dashboard layout and save their preferences, making the application more user-centric and adaptable to individual needs.

- **Potential Technology**: Use [Redux](https://redux.js.org/) or [Context API](https://reactjs.org/docs/context.html) for state management, combined with [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for storing user preferences.

### 10. **Real-Time Data Handling and Visualization**

Explore real-time data integration to provide up-to-the-minute updates on bird flu cases, enhancing the dashboard's utility in critical decision-making scenarios.

- **Potential Technology**: Utilize [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) or [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) for live data streaming and updates.

### 11. **Documentation and User Guides**

Prepare comprehensive technical documentation and a user manual (user_manual.pdf) to guide both developers and end-users. This documentation will cover setup instructions, feature usage, and best practices for maintaining and extending the dashboard.

- **Potential Technology**: Use [Markdown](https://www.markdownguide.org/) for technical documentation and consider tools like [Docusaurus](https://docusaurus.io/) for a more structured and interactive documentation site.

---

This updated "Next Steps" section outlines a clear path for future development, aligning with the needs and expectations of both technical and non-technical users while leveraging a modern technology stack to deliver robust, scalable, and user-friendly solutions.

## License 📜

This project is licensed under the Apache License 2.0, which allows for free use, modification, and distribution of the software under certain conditions. You can review the full terms of the license in the [LICENSE](LICENSE) file included in this repository. This license promotes open collaboration and ensures that the project remains accessible to all users.

## Acknowledgements ✨

We gratefully acknowledge the contributions and support from the following:

- **Swiss Data Science Center**: For providing the task that served as the foundation for this project.
- **Material-UI**: For their robust React components, which were integral to building the user interface.
- **Leaflet** and **react-leaflet**: For their powerful mapping tools, which enabled the interactive map features.
- **The World Health Organization (WHO)**, **Federal Office of Public Health (FOPH) Switzerland**, and **European Commission**: For providing open data and resources that are vital for public health monitoring and research.

We also thank the open-source community for their continuous support and contributions, which make projects like this possible.

## Contact 💬

For questions, feedback, or further information, please reach out to:

- **Email**: [khoanguyen.pro@outlook.com](mailto:khoanguyen.pro@outlook.com)

We welcome your thoughts and are eager to hear how you use or contribute to the Bird Flu GeoData Dashboard!
