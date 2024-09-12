/**
 * Navigation component provides the main navigation bar for the application.
 * It includes tabs for Dashboard, About, Contact, and a hidden Database tab.
 * Users can also select their preferred language using a language selector.
 * This component ensures that the app is accessible in multiple languages and 
 * routes to different pages using React Router.
 */

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Typography, Select, MenuItem, SelectChangeEvent, IconButton } from '@mui/material'; // Material UI components for building the navigation bar
import { useNavigate, useLocation } from 'react-router-dom'; // Hooks for navigation and accessing the current route
import { useTranslation } from 'react-i18next'; // Hook for translations and internationalization
import PublicIcon from '@mui/icons-material/Public'; // Icon for language selection

const Navigation: React.FC = () => {
    const navigate = useNavigate(); // Hook for navigating between routes
    const location = useLocation(); // Hook for accessing the current route
    const { i18n, t } = useTranslation(); // Hook for translations
    const [value, setValue] = useState(0); // State for controlling the active tab
    const [language, setLanguage] = useState('en'); // State for managing selected language

    /**
     * Effect to update the active tab based on the current route.
     */
    useEffect(() => {
        switch (location.pathname) {
            case '/dashboard':
                setValue(0);
                break;
            case '/about':
                setValue(1);
                break;
            case '/contact':
                setValue(2);
                break;
            case '/database':
                setValue(3);
                break;
            default:
                setValue(0);
        }
    }, [location.pathname]);

    /**
     * Handler for tab change - updates state and navigates to the corresponding page.
     * @param event - The change event for the tab.
     * @param newValue - The new value for the active tab.
     */
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/dashboard');
                break;
            case 1:
                navigate('/about');
                break;
            case 2:
                navigate('/contact');
                break;
            case 3:
                navigate('/database');
                break;
        }
    };

    /**
     * Handler for language change - updates state and changes the app's language.
     * @param event - The change event for the language selector.
     */
    const handleLanguageChange = (event: SelectChangeEvent<string>) => {
        const selectedLanguage = event.target.value as string;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage); // Change language using i18next
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#003366' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {t('toolbarTitle')} {/* Translated title for the toolbar */}
                </Typography>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{
                        '& .MuiTabs-flexContainer': {
                            gap: 1, // Add spacing between tabs
                        }
                    }}
                >
                    <Tab label={t('dashboard', 'Dashboard')} /> {/* Dashboard tab */}
                    <Tab label={t('about', 'About')} /> {/* About tab */}
                    <Tab label={t('contact', 'Contact')} /> {/* Contact tab */}
                </Tabs>
                <Box sx={{ flexGrow: 1 }} /> {/* Spacer to separate tabs from the language selector */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton edge="start" sx={{ color: '#ffffff' }} aria-label="language">
                        <PublicIcon /> {/* Icon for language selection */}
                    </IconButton>
                    <Select
                        value={language}
                        onChange={handleLanguageChange}
                        sx={{
                            color: '#ffffff', // Set color for the language selector
                            '.MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' }, // Outline color
                            '.MuiSvgIcon-root': { color: '#ffffff' }, // Icon color
                            minWidth: 100, // Minimum width for the selector
                        }}
                    >
                        {/* Language options */}
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="fr">Français</MenuItem>
                        <MenuItem value="de">Deutsch</MenuItem>
                        <MenuItem value="it">Italiano</MenuItem>
                    </Select>
                </Box>

                {/* Hidden Database Tab closer to Language Selector */}
                <Tab 
                    label={t('database', 'Database')} 
                    onClick={() => handleTabChange(null as any, 3)} 
                    sx={{ marginLeft: '10px', opacity: 0.7, cursor: 'pointer' }}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
