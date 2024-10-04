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

// Utility function to parse CSV data from a file and convert to JSON format
const parseCSVtoJSON = (filePath, callback) => {
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
      results.push({
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        species: data.species,
        H5N1: parseFloat(data.H5N1) || 0,
        H5N2: parseFloat(data.H5N2) || 0,
        H7N2: parseFloat(data.H7N2) || 0,
        H7N8: parseFloat(data.H7N8) || 0,
        timestamp: data.timestamp,
        provenance: data.provenance
      });
    })
    .on('end', () => {
      callback(results); // Return the parsed results via the callback
    })
    .on('error', (error) => {
      console.error('Error reading CSV:', error); // Log any errors encountered
      callback([]); // Return an empty array on error
    });
};

// API endpoint to fetch bird flu data from a specified JSON file
app.get('/api/data', (req, res) => {
  const database = req.query.database || 'fake_bird_data_switzerland_v2'; // Default to main database if none is specified
  const filePath = path.join(__dirname, 'data', `${database}.json`); // Path to the data file

  // Check if the JSON file exists and return the data
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(fileData);
    res.json(parsedData);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// API endpoint to list available JSON files in the 'data' folder
app.get('/api/files', (req, res) => {
  const dataDir = path.join(__dirname, 'data');
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      console.error('Failed to list data files:', err);
      res.status(500).json({ error: 'Failed to list data files' });
      return;
    }

    // Filter and return files without the '.json' extension
    const jsonFiles = files.filter(file => file.endsWith('.json')).map(file => path.basename(file, '.json'));
    res.json(jsonFiles);
  });
});

// Utility function to validate JSON structure for bird flu data
const validateJSON = (data) => {
  if (!Array.isArray(data)) return false;
  return data.every(item => 
    typeof item.latitude === 'number' &&
    typeof item.longitude === 'number' &&
    typeof item.species === 'string' &&
    typeof item.timestamp === 'string'
  );
};

// API endpoint to handle file uploads (CSV or JSON)
app.post('/api/upload', upload.single('file'), (req, res) => {
  const { file } = req;
  
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // If it's a CSV file, convert it to JSON
  if (file.originalname.endsWith('.csv')) {
    const csvPath = path.join(__dirname, 'data', file.filename);
    const jsonPath = path.join(__dirname, 'data', `${file.originalname.replace('.csv', '')}.json`);

    // Parse CSV and save as JSON
    parseCSVtoJSON(csvPath, (parsedData) => {
      fs.writeFileSync(jsonPath, JSON.stringify(parsedData, null, 2), 'utf-8');
      fs.unlinkSync(csvPath); // Remove the original CSV file
      res.json({ success: true, message: 'CSV file converted to JSON and saved successfully' });
    });

  } else if (file.originalname.endsWith('.json')) {
    // If it's a JSON file, validate and save it
    const jsonPath = path.join(__dirname, 'data', file.originalname);
    const jsonData = JSON.parse(fs.readFileSync(file.path, 'utf-8'));

    if (!validateJSON(jsonData)) {
      return res.status(400).json({ error: 'Invalid JSON format' });
    }

    // Move JSON file to the 'data' folder
    fs.rename(file.path, jsonPath, (err) => {
      if (err) {
        console.error('Failed to save file:', err);
        return res.status(500).json({ error: 'Failed to save file' });
      }
      res.json({ success: true, message: 'JSON file uploaded successfully' });
    });
  } else {
    return res.status(400).json({ error: 'Only CSV or JSON files are allowed' });
  }
});

// API endpoint to authenticate user credentials
app.post('/api/login', (req, res) => {
  const { username, password } = req.body; // Extract credentials from the request body
  const usersFilePath = path.join(__dirname, 'login', 'users.json'); // Correct path to the JSON file with user credentials

  // Check if the user database exists
  if (!fs.existsSync(usersFilePath)) {
    return res.status(500).json({ error: 'User database not found' });
  }

  // Read the users from the JSON file
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

  // Find a user that matches the provided username and password
  const user = users.find(u => u.username === username && u.password === password);

  // Check if the user was found
  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log server start message
});
