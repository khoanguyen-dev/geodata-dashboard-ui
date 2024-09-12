import React from 'react'; // React core functionalities
import ReactMarkdown from 'react-markdown'; // Used for rendering markdown content
import { Box, Typography } from '@mui/material'; // Material UI components for layout and typography
import { useTranslation } from 'react-i18next'; // Hook for translations

/**
 * About component provides detailed information about the Bird Flu Dashboard,
 * including its features, capabilities, and administrative functionalities.
 * It uses markdown rendering for rich text content and supports multiple languages.
 */
const About: React.FC = () => {
    const { t } = useTranslation(); // Hook to fetch translated strings

    return (
        <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Main Title for the About Section */}
            <Typography 
                variant="h4" 
                gutterBottom 
                align="center" 
                sx={{ marginTop: '20px', marginBottom: '20px' }}
            >
                {t('aboutTitle')} {/* Translated title for the About section */}
            </Typography>

            {/* Content about Dashboard Features */}
            <ReactMarkdown>{t('aboutContent') || ''}</ReactMarkdown> {/* Ensure a single string is passed */}
            <ReactMarkdown>{t('dashboardFeaturesContent') || ''}</ReactMarkdown> {/* Ensure a single string is passed */}

            {/* Title and content about Avian Flu */}
            <Typography 
                variant="h5" 
                gutterBottom 
                align="center" 
                sx={{ marginTop: 4 }}
            >
                {t('avianFluTitle')} {/* Translated title about Avian Influenza */}
            </Typography>
            <ReactMarkdown>{t('avianFluContent') || ''}</ReactMarkdown> {/* Ensure a single string is passed */}

            {/* Title and content about Global and Regional Context */}
            <Typography 
                variant="h5" 
                gutterBottom 
                align="center" 
                sx={{ marginTop: 4 }}
            >
                {t('contextTitle')} {/* Translated title for global and regional context */}
            </Typography>
            <ReactMarkdown>{t('foph') || ''}</ReactMarkdown> {/* Ensure a single string is passed */}
            <ReactMarkdown>{t('who') || ''}</ReactMarkdown> {/* Ensure a single string is passed */}
            <ReactMarkdown>{t('ec') || ''}</ReactMarkdown> {/* Ensure a single string is passed */}

            {/* Title and content on the importance of monitoring and prevention */}
            <Typography 
                variant="h5" 
                gutterBottom 
                align="center" 
                sx={{ marginTop: 4 }}
            >
                {t('importanceTitle')} {/* Translated title on the importance of monitoring */}
            </Typography>
            <ReactMarkdown>{t('importanceContent') || ''}</ReactMarkdown> {/* Ensure a single string is passed */}
        </Box>
    );
};

export default About;
