# Backend for Geodata Dashboard

## Overview

The backend service for the Bird Flu Geodata Dashboard handles API requests, serves data, and manages user authentication. It provides essential data processing and API endpoints that power the interactive features of the dashboard.

## Features

- **API Endpoints**: Provides endpoints for retrieving bird flu data and user authentication.
- **Data Processing**: Reads and processes bird flu and logging data from CSV files.
- **Cross-Origin Resource Sharing (CORS)**: Configured to allow secure interactions between the frontend and backend.
- **Responsive Design**: The UI is designed to be responsive, ensuring a consistent experience across various devices.
- **Request Parsing**: Handles incoming request bodies for JSON and URL-encoded data.

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine. This project uses Node.js for both the backend server and frontend development environment.
- **Git**: Required for cloning the repository.

### Install Dependencies

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>/backend
   ```
2. **Navigate to the backend directory and install the necessary dependencies**:
   ```bash
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
2. **Access the application**:
The backend service provides the following API endpoints:

- **GET `/api/data`**
  - **Description**: Retrieves bird flu data.
  - **Response**: JSON array of bird flu cases with details such as location, flu type, and date.

- **POST `/api/login`**
  - **Description**: Authenticates users.
  - **Request Body**: JSON object with `username` and `password`.
  - **Response**: JSON object with authentication status and user details.

## File Structure

```plaintext
backend/
│
├── data/
│   └── fake_bird_data_switzerland_v2.csv       # Data file containing bird flu cases
│   └── users       							# Data file containing usernames and passwords
│
├── server.js                                   # Main server file handling API requests and serving data
│
├── package.json                                # Node.js package configuration file
│
└── README.md                                   # Backend-specific README file
```

## Technology Stack

- **[Node.js](https://nodejs.org/en/docs/)**: A JavaScript runtime built on Chrome's V8 engine, used for server-side scripting and building scalable network applications.
- **[Express](https://expressjs.com/)**: A minimalist web framework for Node.js, used to set up the server and handle API routes for data retrieval and user authentication.
- **[CSV-Parser](https://github.com/mafintosh/csv-parser)**: A streaming parser for CSV files in Node.js, used to read and process bird flu data and user credentials asynchronously.
- **[CORS](https://github.com/expressjs/cors)**: Middleware to enable Cross-Origin Resource Sharing, allowing secure interaction between the frontend and backend.
- **[Body-Parser](https://github.com/expressjs/body-parser)**: Middleware for parsing incoming request bodies in a middleware, supporting JSON and URL-encoded bodies.

## Data Management

The backend server manages data as follows:

- **Bird Flu Data**: Read from `fake_bird_data_switzerland_v2.csv` in the `data/` directory. This CSV file contains information on bird flu cases, including details such as latitude, longitude, flu type, species, and provenance. The server provides this data through the **GET `/api/data`** endpoint.

- **User Authentication**: Read from `users.csv` located in the `data/` directory. This file contains usernames and passwords for authentication. The server uses this data to validate login attempts through the **POST `/api/login`** endpoint. Authentication ensures that only authorized users can access or manage the data.

---

Feel free to adjust the content based on any additional details or specific implementations in your project!
