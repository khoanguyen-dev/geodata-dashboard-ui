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
	http.HandleFunc("/api/files", corsMiddleware(handleFiles))   // List available CSV files
	http.HandleFunc("/api/upload", corsMiddleware(handleUpload)) // Upload new CSV files
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

// handleUpload handles file uploads and saves them to the 'data' folder.
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

	// Validate the file type (must be CSV)
	if !strings.HasSuffix(handler.Filename, ".csv") {
		http.Error(w, "Only CSV files are allowed", http.StatusBadRequest)
		return
	}

	// Create the file in the 'data' directory
	filePath := filepath.Join("data", handler.Filename)
	dst, err := os.Create(filePath)
	if err != nil {
		http.Error(w, "Failed to save file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	// Copy the contents of the uploaded file to the new file
	_, err = io.Copy(dst, file)
	if err != nil {
		http.Error(w, "Failed to save file", http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"success": "true", "message": "File uploaded successfully"})
}

// handleData handles requests to fetch bird flu data from a specified CSV file.
func handleData(w http.ResponseWriter, r *http.Request) {
	// Get the optional 'database' parameter to select the specific CSV file
	database := r.URL.Query().Get("database")
	if database == "" {
		database = "fake_bird_data_switzerland_v2" // Default to the main database if none is specified
	}
	filePath := filepath.Join("data", database+".csv")

	// Read the CSV data
	records, err := readCSV(filePath)
	if err != nil {
		http.Error(w, "Failed to read data file", http.StatusInternalServerError)
		return
	}

	var birdData []BirdData
	for _, record := range records[1:] { // Assuming the first row is headers
		lat, _ := strconv.ParseFloat(record[0], 64)
		long, _ := strconv.ParseFloat(record[1], 64)

		// Handle potential missing or empty flu type values
		h5n1, err := strconv.ParseFloat(record[3], 64)
		if err != nil || record[3] == "" {
			h5n1 = 0.0 // Default to 0 if parsing fails or value is missing
		}

		h5n2, err := strconv.ParseFloat(record[4], 64)
		if err != nil || record[4] == "" {
			h5n2 = 0.0
		}

		h7n2, err := strconv.ParseFloat(record[5], 64)
		if err != nil || record[5] == "" {
			h7n2 = 0.0
		}

		h7n8, err := strconv.ParseFloat(record[6], 64)
		if err != nil || record[6] == "" {
			h7n8 = 0.0
		}

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

	// Set response headers and write the JSON-encoded data
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(birdData)
}

// handleFiles lists all CSV files available in the 'data' folder without their .csv extension.
func handleFiles(w http.ResponseWriter, r *http.Request) {
	// Get all CSV files in the data directory
	files, err := filepath.Glob("data/*.csv")
	if err != nil {
		http.Error(w, "Failed to list data files", http.StatusInternalServerError)
		return
	}

	// Extract file names without the .csv extension
	var fileNames []string
	for _, file := range files {
		fileName := strings.TrimSuffix(filepath.Base(file), ".csv")
		fileNames = append(fileNames, fileName)
	}

	// Set response headers and write the JSON-encoded list of file names
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(fileNames)
}

// handleLogin handles login requests and validates user credentials.
func handleLogin(w http.ResponseWriter, r *http.Request) {
	var loginRequest User
	// Decode the request body into the User struct
	if err := json.NewDecoder(r.Body).Decode(&loginRequest); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	usersFilePath := "login/users.csv"
	users, err := readCSV(usersFilePath)
	if err != nil {
		http.Error(w, "Failed to read users file", http.StatusInternalServerError)
		return
	}

	// Validate credentials against the CSV data
	for _, user := range users[1:] { // Assuming the first row is headers
		if user[0] == loginRequest.Username && user[1] == loginRequest.Password {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{"success": "true", "message": "Login successful"})
			return
		}
	}

	http.Error(w, "Invalid username or password", http.StatusUnauthorized)
}

// readCSV reads a CSV file and returns a slice of records.
func readCSV(filePath string) ([][]string, error) {
	// Open the specified CSV file
	file, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("could not open file: %w", err)
	}
	defer file.Close()

	// Read all records from the CSV
	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("could not read CSV data: %w", err)
	}

	return records, nil
}
