import React from 'react'; // Core React library for building user interfaces
import ReactDOM from 'react-dom/client'; // ReactDOM client for rendering the application
import App from './App'; // Main App component
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter for handling routing in the app
import { I18nextProvider } from 'react-i18next'; // Provider to integrate i18n for translations in the React app
import i18n from './i18n'; // Import the i18n configuration for language support

// Create the root for React 18 rendering
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the application using ReactDOM's createRoot method
root.render(
  <React.StrictMode> {/* Enables strict mode for highlighting potential problems in an application */}
    <I18nextProvider i18n={i18n}> {/* Provides i18n context to the entire application for translations */}
      <BrowserRouter> {/* Wraps the application to enable routing using the browser's history API */}
        <App /> {/* Main application component */}
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
