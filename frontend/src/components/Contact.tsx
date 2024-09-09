/**
 * Contact component provides contact information and a means for users
 * to reach out with questions or feedback. It is designed to be simple,
 * accessible, and user-friendly, particularly for non-technical users.
 */

import React from 'react'; // React core functionalities
import { Box, Typography, Link } from '@mui/material'; // Material UI components for building the navigation bar
import { useTranslation } from 'react-i18next'; // Hook for translation

const Contact: React.FC = () => {
  const { t } = useTranslation(); // Hook to handle translation of text content

  return (
    <Box 
      sx={{ 
        padding: '20px', 
        maxWidth: '700px', 
        margin: '0 auto', 
        textAlign: 'center' 
      }}
    >
      {/* Main title for the Contact section */}
      <Typography variant="h4" gutterBottom>
        {t('contactUs')} {/* Translated heading for the Contact section */}
      </Typography>

      {/* Informational message guiding users on how to contact */}
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        {t('contactMessage')} {/* Translated message with contact instructions */}
      </Typography>

      {/* Link to send an email directly to the provided contact address */}
      <Link 
        href="mailto:khoanguyen.pro@outlook.com" 
        sx={{ fontSize: '18px', color: '#003366' }}
      >
        khoanguyen.pro@outlook.com {/* Display email link with styled appearance */}
      </Link>
    </Box>
  );
};

export default Contact;
