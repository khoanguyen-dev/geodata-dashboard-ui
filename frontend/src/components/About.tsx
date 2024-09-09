/**
 * About component provides detailed information about the Bird Flu Dashboard,
 * including context, background on avian influenza, and its global and regional impact.
 * It uses markdown rendering for rich text content and supports multiple languages.
 */

import React from 'react'; // React core functionalities
import ReactMarkdown from 'react-markdown'; // Used for rendering markdown content
import { Box, Typography } from '@mui/material'; // Material UI components for building the navigation bar
import { useTranslation } from 'react-i18next'; // Hook for translation

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

            {/* Markdown content describing the dashboard */}
            <ReactMarkdown>{t('aboutContent')}</ReactMarkdown>

            {/* Title and content about Avian Flu */}
            <Typography 
                variant="h5" 
                gutterBottom 
                align="center" 
                sx={{ marginTop: 4 }}
            >
                {t('avianFluTitle')} {/* Translated title about Avian Influenza */}
            </Typography>
            <ReactMarkdown>{t('avianFluContent')}</ReactMarkdown>

            {/* Title and content about Global and Regional Context */}
            <Typography 
                variant="h5" 
                gutterBottom 
                align="center" 
                sx={{ marginTop: 4 }}
            >
                {t('contextTitle')} {/* Translated title for global and regional context */}
            </Typography>

            {/* Multiple markdown content sections detailing the context from various organizations */}
            <ReactMarkdown>{t('foph')}</ReactMarkdown> {/* Information from Federal Office of Public Health */}
            <ReactMarkdown>{t('who')}</ReactMarkdown> {/* Information from the World Health Organization */}
            <ReactMarkdown>{t('ec')}</ReactMarkdown> {/* Information from the European Commission */}

            {/* Title and content on the importance of monitoring and prevention */}
            <Typography 
                variant="h5" 
                gutterBottom 
                align="center" 
                sx={{ marginTop: 4 }}
            >
                {t('importanceTitle')} {/* Translated title on the importance of monitoring */}
            </Typography>
            <ReactMarkdown>{t('importanceContent')}</ReactMarkdown>
        </Box>
    );
};

export default About;
