# Backend for Geodata Dashboard

## Overview

The backend service for the Bird Flu Geodata Dashboard handles API requests, serves data, manages file uploads, and provides user authentication. It includes both Go and Node.js server options, allowing for flexible deployment depending on your requirements.

## Features

- **API Endpoints**: Provides endpoints for retrieving bird flu data, managing file uploads, and user authentication.
- **Data Processing**: Reads and processes bird flu data from CSV files, handling various flu types and their attributes.
- **Cross-Origin Resource Sharing (CORS)**: Configured to allow secure interactions between the frontend and backend.
- **File Management**: Supports uploading new CSV files via API, expanding the data set available for analysis.
- **Dynamic Data Source Selection**: Lists available CSV files on the server, allowing the frontend to dynamically select which data set to use.
- **User Authentication**: Validates user credentials against a CSV-based user database, ensuring secure access to sensitive data.
- **Multiple Server Options**: Supports running the backend using either Go or Node.js.
- **Request Parsing**: Handles incoming request bodies for JSON and URL-encoded data.

## Installation and Setup

You can run the backend server using either Go or Node.js:

### Go server

1. Prerequisites

- **Go**: Ensure that Go is installed on your machine. Download it from [the official Go website](https://golang.org/dl/).

2. Initialize Go Module (if not already done)

If your project is not already set up as a Go module, initialize it by running:

```bash
go mod init backend
```

3.Install Dependencies

To ensure that all required dependencies are installed and up-to-date, run:

```bash
go mod tidy
```

4. Run the Go Server

Start the Go server by running:

```bash
go run server.go
```

### Node.js server

1. **Prerequisites**:

- **Node.js**: Ensure Node.js is installed on your machine. You can download it from [the official Node.js website](https://nodejs.org/).
- **NPM**: Node.js comes with NPM (Node Package Manager), which is used to install dependencies.

2. **Install Dependencies**:

To install all required dependencies listed in your `package.json` file, run:

```bash
npm install
```

3. **Run the Node.js Server**:

Start the Node.js server by running:

```bash
npm start
```

Alternatively, if the start script is not defined in `package.json`, you can run the server directly with:

```bash
node server.js
```

## Access the server

Once the server is running, you can access it at `[http://localhost:3000](http://localhost:3000).

- **GET `/api/data`**: Retrieves bird flu data.
- **POST `/api/login`**: Authenticates users.
- **GET `/api/files`**: Lists available CSV files in the data folder.
- **POST `/api/upload`**: llows uploading of new CSV files to the data folder.

## File Structure

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

## Technology Stack

### Node.js Server

- **[Node.js](https://nodejs.org/en/docs/)**: A JavaScript runtime built on Chrome's V8 engine, used for server-side scripting and building scalable network applications.
- **[Express](https://expressjs.com/)**: A minimalist web framework for Node.js, used to set up the server and handle API routes for data retrieval and user authentication.
- **[CSV-Parser](https://github.com/mafintosh/csv-parser)**: A streaming parser for CSV files in Node.js, used to read and process bird flu data and user credentials asynchronously.
- **[CORS](https://github.com/expressjs/cors)**: Middleware to enable Cross-Origin Resource Sharing, allowing secure interaction between the frontend and backend.
- **[Body-Parser](https://github.com/expressjs/body-parser)**: Middleware for parsing incoming request bodies, supporting JSON and URL-encoded bodies.

### Go Server

- **[Go](https://golang.org/)**: A statically typed, compiled programming language designed for simplicity and efficiency, used to build robust backend services.
- **Built-in HTTP Package**: Go’s standard library includes a powerful `net/http` package, which is used to create and manage HTTP servers and handle requests directly.
- **CSV Handling**: Go's built-in `encoding/csv` package is used for reading and processing CSV files, managing bird flu data and user credentials with simple and efficient parsing.
- **JSON Encoding**: Go’s `encoding/json` package is used for encoding data into JSON format to send responses to the frontend, ensuring seamless data exchange.
- **Custom Middleware for CORS**: A custom middleware function is implemented to add CORS headers, allowing secure and controlled access to the backend from the frontend.
  
Both the Node.js and Go servers provide similar functionality and can be used interchangeably based on project requirements, ensuring flexibility and robustness in data handling and API management.

## Data Management

The backend server handles data management through the following approaches:

- **Bird Flu Data**: The data is sourced from `data/fake_bird_data_switzerland_v2.csv` located in the `data/` directory. This CSV file contains detailed records of bird flu cases, including fields such as latitude, longitude, flu type, species, and provenance. The server processes and serves this data via the **GET `/api/data`** endpoint, allowing the frontend to visualize and analyze the data in the dashboard.

- **User Authentication**: User credentials are stored in `login/users.csv`, also located in the `data/` directory. This file includes usernames and passwords, which the server uses to validate login attempts through the **POST `/api/login`** endpoint. This authentication mechanism ensures that only authorized users can access and manage sensitive data within the application.

---

Feel free to adjust the content based on any additional details or specific implementations in your project!
