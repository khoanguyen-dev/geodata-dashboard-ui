// Import necessary modules
const express = require('express'); // Web framework for Node.js
const cors = require('cors'); // Middleware to enable CORS
const fs = require('fs'); // File system module to work with file paths
const path = require('path'); // Module to work with file and directory paths
const csvParser = require('csv-parser'); // Module to parse CSV files
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies

// Initialize Express application
const app = express();
const port = process.env.PORT || 5001; // Set the port to listen on, defaulting to 5001
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000'; // Set allowed CORS origin

// Use CORS to allow requests from the specified origin
app.use(cors({
  origin: allowedOrigin,
}));

app.use(bodyParser.json()); // Middleware to parse JSON bodies of incoming requests

/**
 * Utility function to parse CSV data from a file and return results via callback.
 * @param {string} filePath - The path to the CSV file.
 * @param {function} callback - Callback function to handle the parsed results.
 */
const parseCSV = (filePath, callback) => {
  const results = []; // Array to store parsed data
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath); // Log error if file doesn't exist
    callback([]); // Return empty array if file doesn't exist
    return;
  }
  
  // Read and parse the CSV file
  fs.createReadStream(filePath)
    .pipe(csvParser()) // Use csv-parser to parse the CSV data
    .on('data', (data) => {
      results.push(data); // Push each row of data into the results array
    })
    .on('end', () => {
      console.log(`Parsed ${results.length} total entries`); // Log the total number of entries parsed
      callback(results); // Return the parsed results via the callback
    })
    .on('error', (error) => {
      console.error('Error reading CSV:', error); // Log any errors encountered
      callback([]); // Return an empty array on error
    });
};

/**
 * API endpoint to fetch bird flu data, with optional filtering by year.
 * Responds with JSON data.
 */
app.get('/api/data', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'fake_bird_data_switzerland_v2.csv'); // Path to the data file
  const year = req.query.year; // Optional query parameter for filtering by year

  // Parse the CSV data and respond with filtered results if a year is specified
  parseCSV(filePath, (results) => {
    if (year) {
      const filteredResults = results.filter(entry => entry.year === year); // Filter data by year
      res.json(filteredResults); // Respond with the filtered results
    } else {
      res.json(results); // Respond with all results if no filter is applied
    }
  });
});

/**
 * API endpoint to authenticate user credentials.
 * Responds with a success or failure message.
 */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body; // Extract credentials from the request body
  const usersFilePath = path.join(__dirname, 'data', 'users.csv'); // Path to the CSV file with user credentials

  // Parse the CSV data containing user credentials
  parseCSV(usersFilePath, (users) => {
    // Find a user that matches the provided username and password
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      res.json({ success: true, message: 'Login successful' }); // Respond with success if credentials match
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' }); // Respond with unauthorized status if credentials don't match
    }
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log server start message
});
