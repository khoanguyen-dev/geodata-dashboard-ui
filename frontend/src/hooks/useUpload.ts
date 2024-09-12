import { useState } from 'react'; // Import React hooks for managing state and side effects

/**
 * Custom hook for handling file uploads.
 * Provides state management for file selection, upload progress, and error handling.
 */
const useUpload = () => {
  const [file, setFile] = useState<File | null>(null); // State to manage the selected file
  const [uploadError, setUploadError] = useState<string | null>(null); // State to manage upload errors
  const [availableDatabases, setAvailableDatabases] = useState<string[]>([]); // State to manage available databases

  /**
   * Function to validate and upload a file to the server.
   * Checks for file format (CSV) and prevents duplicate filenames before uploading.
   */
  const handleFileUpload = async () => {
    if (!file) {
      setUploadError('Please select a file to upload.'); // Error if no file is selected
      return;
    }

    // Validate file format and check for duplicate filenames
    if (!file.name.endsWith('.csv')) {
      setUploadError('Only CSV files are allowed.'); // Error if file is not a CSV
      return;
    }

    if (availableDatabases.includes(file.name.replace('.csv', ''))) {
      setUploadError('A file with the same name already exists.'); // Error if file name already exists
      return;
    }

    // Create form data and append the selected file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed'); // Handle upload failure

      setUploadError(null); // Clear any previous upload errors
      setFile(null); // Reset file state
    } catch (error) {
      setUploadError('An error occurred during the file upload.'); // Error if upload fails
    }
  };

  /**
   * Fetch the list of available databases from the server.
   * This function refreshes the available databases after a successful upload.
   */
  const fetchDatabases = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/files'); // Fetch list of available databases
      const databases = await response.json();
      setAvailableDatabases(databases); // Update the list of available databases
    } catch (error) {
      setUploadError('Failed to fetch the list of available databases.'); // Error if fetching fails
    }
  };

  return {
    file, // The current selected file state
    setFile, // Function to update the selected file state
    uploadError, // Any error message related to file upload
    handleFileUpload, // Function to handle the file upload
    fetchDatabases, // Function to fetch available databases
    availableDatabases, // List of available databases
  };
};

export default useUpload; // Export the custom hook for use in other components
