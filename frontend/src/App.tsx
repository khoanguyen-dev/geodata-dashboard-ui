import React from 'react'; // Import React to use JSX and create components
import { Routes, Route } from 'react-router-dom'; // Import routing components from react-router-dom
import Navigation from './components/Navigation'; // Import the Navigation component for the app's header
import Dashboard from './components/Dashboard'; // Import the Dashboard component for the main data visualization
import About from './components/About'; // Import the About component to display information about the app
import Contact from './components/Contact'; // Import the Contact component for contact information
import Database from './components/Database'; // Import the Database component for data management

/**
 * App component serves as the main entry point of the application.
 * It sets up the navigation and routing for the different pages, including
 * Dashboard, About, Contact, and Database pages.
 */
const App: React.FC = () => {
  return (
    <div>
      {/* Render the Navigation component to provide the app's header with navigation links */}
      <Navigation />
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* Define the route for the Dashboard component, accessible at '/dashboard' */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Define the route for the About component, accessible at '/about' */}
          <Route path="/about" element={<About />} />

          {/* Define the route for the Contact component, accessible at '/contact' */}
          <Route path="/contact" element={<Contact />} />

          {/* Define the route for the Database component, accessible at '/database' */}
          <Route path="/database" element={<Database />} />

          {/* Default route that renders the Dashboard component if no other route is matched */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App; // Export the App component as the default export
