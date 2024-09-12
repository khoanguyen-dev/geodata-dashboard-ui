// Import necessary modules
const express = require('express'); // Web framework for Node.js
const cors = require('cors'); // Middleware to enable CORS
const fs = require('fs'); // File system module to work with file paths
const path = require('path'); // Module to work with file and directory paths
const csvParser = require('csv-parser'); // Module to parse CSV files
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const multer = require('multer'); // Middleware to handle file uploads

// Initialize Express application
const app = express();
const port = process.env.PORT || 5001; // Set the port to listen on, defaulting to 5001
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000'; // Set allowed CORS origin

// Use CORS to allow requests from the specified origin
app.use(cors({
  origin: allowedOrigin,
}));

app.use(bodyParser.json()); // Middleware to parse JSON bodies of incoming requests

// Configure file upload destination and filename
const upload = multer({ dest: 'data/' });

// Utility function to parse CSV data from a file and return results via callback
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
      callback(results); // Return the parsed results via the callback
    })
    .on('error', (error) => {
      console.error('Error reading CSV:', error); // Log any errors encountered
      callback([]); // Return an empty array on error
    });
};

// API endpoint to fetch bird flu data from a specified CSV file
app.get('/api/data', (req, res) => {
  const database = req.query.database || 'fake_bird_data_switzerland_v2'; // Default to main database if none is specified
  const filePath = path.join(__dirname, 'data', `${database}.csv`); // Path to the data file

  // Parse the CSV data and respond with the results
  parseCSV(filePath, (results) => {
    const processedData = results.map(entry => ({
      latitude: parseFloat(entry.latitude),
      longitude: parseFloat(entry.longitude),
      species: entry.species,
      H5N1: parseFloat(entry.H5N1) || 0,
      H5N2: parseFloat(entry.H5N2) || 0,
      H7N2: parseFloat(entry.H7N2) || 0,
      H7N8: parseFloat(entry.H7N8) || 0,
      timestamp: entry.timestamp,
      provenance: entry.provenance
    }));
    res.json(processedData);
  });
});

// API endpoint to list available CSV files in the 'data' folder
app.get('/api/files', (req, res) => {
  const dataDir = path.join(__dirname, 'data');
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      console.error('Failed to list data files:', err);
      res.status(500).json({ error: 'Failed to list data files' });
      return;
    }

    // Filter and return files without the '.csv' extension
    const csvFiles = files.filter(file => file.endsWith('.csv')).map(file => path.basename(file, '.csv'));
    res.json(csvFiles);
  });
});

// API endpoint to handle file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  // Ensure a file was uploaded and has a .csv extension
  const { file } = req;
  if (!file || !file.originalname.endsWith('.csv')) {
    return res.status(400).json({ error: 'Only CSV files are allowed' });
  }

  // Move file to the 'data' directory with the correct extension
  const targetPath = path.join(__dirname, 'data', file.originalname);
  fs.rename(file.path, targetPath, (err) => {
    if (err) {
      console.error('Failed to save file:', err);
      return res.status(500).json({ error: 'Failed to save file' });
    }
    res.json({ success: true, message: 'File uploaded successfully' });
  });
});

// API endpoint to authenticate user credentials
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
