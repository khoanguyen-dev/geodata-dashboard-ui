import { useState, useEffect } from 'react'; // Import React hooks for managing state and side effects

// Interface defining the structure of the login response
interface LoginResponse {
  success: boolean; // Indicates if the login attempt was successful
  message: string; // Message providing details about the login attempt (e.g., error messages)
}

/**
 * Custom hook for managing user login state and authentication.
 * Provides functions for logging in, logging out, and tracking login state,
 * as well as handling errors related to authentication.
 */
const useLogin = () => {
  const [username, setUsername] = useState(''); // State for storing the username input
  const [password, setPassword] = useState(''); // State for storing the password input
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State indicating whether the user is logged in
  const [error, setError] = useState(''); // State for storing any error messages

  /**
   * Function to authenticate the user by making a POST request to the backend server.
   * @param username - The username provided by the user
   * @param password - The password provided by the user
   * @returns A promise that resolves to a LoginResponse object indicating success or failure
   */
  const authenticateUser = async (username: string, password: string): Promise<LoginResponse> => {
    try {
      // Make a POST request to the backend login API with the provided credentials
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({ username, password }), // Send the username and password as JSON
      });

      // If the response is not OK, return a failure response with a message
      if (!response.ok) {
        return { success: false, message: 'Invalid credentials' };
      }

      // Parse the JSON response from the server
      const result = await response.json();
      return result; // Return the parsed result, which should match the LoginResponse interface
    } catch (error) {
      // Handle any errors that occur during the fetch request
      return { success: false, message: 'Error connecting to the server' };
    }
  };

  /**
   * Handles the login process by calling the authenticateUser function.
   * Updates the login state and error messages based on the response.
   */
  const handleLogin = async () => {
    const response = await authenticateUser(username, password); // Attempt to authenticate the user
    if (response.success) {
      setIsLoggedIn(true); // Set logged-in state to true if authentication is successful
      setError(''); // Clear any previous error messages
      localStorage.setItem('isLoggedIn', 'true'); // Store login state in localStorage
    } else {
      setError(response.message); // Set an error message if authentication fails
    }
  };

  /**
   * Handles the logout process by resetting states and removing the login status from localStorage.
   */
  const handleLogout = () => {
    setIsLoggedIn(false); // Set logged-in state to false
    setUsername(''); // Clear the username state
    setPassword(''); // Clear the password state
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
  };

  /**
   * Checks the login state from localStorage when the component mounts.
   * If the user was previously logged in, set the login state accordingly.
   */
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true); // Set logged-in state to true if the stored state indicates the user is logged in
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Return the state variables and handler functions for use in components
  return {
    username, // The current username state
    setUsername, // Function to update the username state
    password, // The current password state
    setPassword, // Function to update the password state
    isLoggedIn, // Boolean indicating whether the user is logged in
    error, // Any error message related to authentication
    setError, // Function to update the error state
    handleLogin, // Function to handle user login
    handleLogout, // Function to handle user logout
  };
};

export default useLogin; // Export the custom hook for use in other components
