package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// BirdData represents the structure of bird flu data records.
type BirdData struct {
	Latitude   float64 `json:"latitude"`
	Longitude  float64 `json:"longitude"`
	Species    string  `json:"species"`
	H5N1       float64 `json:"H5N1"`
	H5N2       float64 `json:"H5N2"`
	H7N2       float64 `json:"H7N2"`
	H7N8       float64 `json:"H7N8"`
	Timestamp  string  `json:"timestamp"`
	Provenance string  `json:"provenance"`
}

// User represents the structure of a user record for login authentication.
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func main() {
	// Register handlers for various endpoints
	http.HandleFunc("/api/data", corsMiddleware(handleData))     // Fetch bird flu data
	http.HandleFunc("/api/files", corsMiddleware(handleFiles))   // List available JSON files
	http.HandleFunc("/api/upload", corsMiddleware(handleUpload)) // Upload new CSV or JSON files
	http.HandleFunc("/api/login", corsMiddleware(handleLogin))   // User login

	// Start the server on port 5001
	port := "5001"
	log.Printf("Server running at http://localhost:%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// corsMiddleware adds CORS headers to the response to allow cross-origin requests from the frontend.
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Allow requests from the frontend origin
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")   // Allow specific methods
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")         // Allow specific headers

		// Handle preflight request for CORS (OPTIONS method)
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next(w, r) // Call the next handler
	}
}

// handleUpload handles file uploads, converts CSV files to JSON, and validates both CSV and JSON file formats.
func handleUpload(w http.ResponseWriter, r *http.Request) {
	// Ensure the request method is POST
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Parse the multipart form with a maximum memory limit
	err := r.ParseMultipartForm(10 << 20) // 10MB
	if err != nil {
		http.Error(w, "Failed to parse form data", http.StatusBadRequest)
		return
	}

	// Retrieve the file from the form data
	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Failed to retrieve file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Determine if the file is CSV or JSON
	if strings.HasSuffix(handler.Filename, ".csv") {
		// Handle CSV file: validate format and convert to JSON
		records, err := readCSVFromUpload(file)
		if err != nil {
			http.Error(w, "Failed to read CSV file", http.StatusInternalServerError)
			return
		}

		// Validate the CSV format
		if !validateCSVFormat(records) {
			http.Error(w, "Invalid CSV format", http.StatusBadRequest)
			return
		}

		// Convert CSV data to BirdData and save as JSON
		var birdData []BirdData
		for _, record := range records[1:] { // Assuming the first row is headers
			lat, _ := strconv.ParseFloat(record[0], 64)
			long, _ := strconv.ParseFloat(record[1], 64)
			h5n1, _ := strconv.ParseFloat(record[3], 64)
			h5n2, _ := strconv.ParseFloat(record[4], 64)
			h7n2, _ := strconv.ParseFloat(record[5], 64)
			h7n8, _ := strconv.ParseFloat(record[6], 64)

			data := BirdData{
				Latitude:   lat,
				Longitude:  long,
				Species:    record[2],
				H5N1:       h5n1,
				H5N2:       h5n2,
				H7N2:       h7n2,
				H7N8:       h7n8,
				Timestamp:  record[7],
				Provenance: record[8],
			}
			birdData = append(birdData, data)
		}

		// Save the converted data as a JSON file
		filePath := filepath.Join("data", strings.TrimSuffix(handler.Filename, ".csv")+".json")
		err = writeJSON(filePath, birdData)
		if err != nil {
			http.Error(w, "Failed to save JSON file", http.StatusInternalServerError)
			return
		}

		// Respond with a success message for CSV conversion
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"success": "true", "message": "CSV file converted to JSON and saved successfully"})

	} else if strings.HasSuffix(handler.Filename, ".json") {
		// Handle JSON file: validate format and save directly
		var birdData []BirdData
		if err := json.NewDecoder(file).Decode(&birdData); err != nil {
			http.Error(w, "Invalid JSON format", http.StatusBadRequest)
			return
		}

		// Validate the structure of the JSON file
		if !validateJSONFormat(birdData) {
			http.Error(w, "Invalid JSON data structure", http.StatusBadRequest)
			return
		}

		// Save the valid JSON file
		filePath := filepath.Join("data", handler.Filename)
		dst, err := os.Create(filePath)
		if err != nil {
			http.Error(w, "Failed to save JSON file", http.StatusInternalServerError)
			return
		}
		defer dst.Close()

		// Write the valid JSON content to the destination file
		err = json.NewEncoder(dst).Encode(birdData)
		if err != nil {
			http.Error(w, "Failed to write JSON file", http.StatusInternalServerError)
			return
		}

		// Respond with a success message for JSON upload
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"success": "true", "message": "JSON file uploaded and saved successfully"})

	} else {
		// Reject any other file formats
		http.Error(w, "Only CSV and JSON files are allowed", http.StatusBadRequest)
	}
}

// handleData handles requests to fetch bird flu data from a specified JSON file.
func handleData(w http.ResponseWriter, r *http.Request) {
	// Get the optional 'database' parameter to select the specific JSON file
	database := r.URL.Query().Get("database")
	if database == "" {
		database = "fake_bird_data_switzerland_v2" // Default to the main database if none is specified
	}
	filePath := filepath.Join("data", database+".json")

	// Read the JSON data
	birdData, err := readJSON(filePath)
	if err != nil {
		http.Error(w, "Failed to read data file", http.StatusInternalServerError)
		return
	}

	// Set response headers and write the JSON-encoded data
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(birdData)
}

// handleFiles lists all JSON files available in the 'data' folder without their .json extension.
func handleFiles(w http.ResponseWriter, r *http.Request) {
	// Get all JSON files in the data directory
	files, err := filepath.Glob("data/*.json")
	if err != nil {
		http.Error(w, "Failed to list data files", http.StatusInternalServerError)
		return
	}

	// Extract file names without the .json extension
	var fileNames []string
	for _, file := range files {
		fileName := strings.TrimSuffix(filepath.Base(file), ".json")
		fileNames = append(fileNames, fileName)
	}

	// Set response headers and write the JSON-encoded list of file names
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(fileNames)
}

// handleLogin handles login requests and validates user credentials from a JSON file.
func handleLogin(w http.ResponseWriter, r *http.Request) {
	var loginRequest User
	// Decode the request body into the User struct
	if err := json.NewDecoder(r.Body).Decode(&loginRequest); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Path to the JSON file containing user credentials
	usersFilePath := "login/users.json"
	users, err := readUsersJSON(usersFilePath)
	if err != nil {
		http.Error(w, "Failed to read users file", http.StatusInternalServerError)
		return
	}

	// Validate credentials against the JSON data
	for _, user := range users {
		if user.Username == loginRequest.Username && user.Password == loginRequest.Password {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{"success": "true", "message": "Login successful"})
			return
		}
	}

	http.Error(w, "Invalid username or password", http.StatusUnauthorized)
}

// validateCSVFormat checks if the uploaded CSV file has the correct format (e.g., the required number of columns).
func validateCSVFormat(records [][]string) bool {
	// Basic validation: check if the first row has the correct number of columns (9 columns in this case)
	if len(records) < 2 || len(records[0]) != 9 {
		return false
	}
	// Additional checks (if necessary) can be added here
	return true
}

// validateJSONFormat checks if the uploaded JSON data follows the correct structure.
func validateJSONFormat(data []BirdData) bool {
	for _, record := range data {
		if record.Latitude == 0 || record.Longitude == 0 || record.Species == "" {
			// Basic validation: ensure essential fields are populated
			return false
		}
		// Add more validation rules as necessary for the BirdData fields
	}
	return true
}

// readCSVFromUpload reads a CSV file uploaded via an HTTP request and returns its records.
func readCSVFromUpload(file io.Reader) ([][]string, error) {
	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("could not read CSV data: %w", err)
	}
	return records, nil
}

// readUsersJSON reads a JSON file containing user records and returns a slice of User.
func readUsersJSON(filePath string) ([]User, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("could not open file: %w", err)
	}
	defer file.Close()

	var users []User
	err = json.NewDecoder(file).Decode(&users)
	if err != nil {
		return nil, fmt.Errorf("could not parse JSON data: %w", err)
	}

	return users, nil
}

// readJSON reads a JSON file and decodes it into a slice of BirdData.
func readJSON(filePath string) ([]BirdData, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("could not open file: %w", err)
	}
	defer file.Close()

	var birdData []BirdData
	err = json.NewDecoder(file).Decode(&birdData)
	if err != nil {
		return nil, fmt.Errorf("could not parse JSON data: %w", err)
	}

	return birdData, nil
}

// writeJSON writes the given data to a file as JSON.
func writeJSON(filePath string, data interface{}) error {
	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("could not create file: %w", err)
	}
	defer file.Close()

	err = json.NewEncoder(file).Encode(data)
	if err != nil {
		return fmt.Errorf("could not write JSON data: %w", err)
	}
	return nil
}
