import { useCallback, useEffect, useState } from 'react';
import useGlobalContext from '../../hooks/useGlobalContext';
import { ColorContext } from '../contexts/ColorContext';

/**
 * ColorProvider Component
 * Manages theme colors and dark mode functionality for the application
 */
export const ColorProvider = ({ children }) => {
  const { auth } = useGlobalContext();

  // Theme state management
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Default color configuration with both light and dark mode values
  const [primaryColor, setPrimaryColor] = useState(
    auth.theme?.primaryColor || {
      name: 'Blue',
      // Light mode colors
      bgColor: '#2563EB',
      fadedColor: '#eff8ff',
      textColor: '#2563EB',
      brandHoverColor: '#1E4DB7',
      borderColor: '#2563EB',
      // Dark mode colors
      bgColorDark: '#2E90FA',
      fadedColorDark: '#19418566',
      textColorDark: '#53B1FD',
      brandHoverColorDark: '#1E4DB7',
      borderColorDark: '#2E90FA'
    }
  );

  /**
   * Updates CSS variables for theme colors
   * @param {Object} color - Color configuration object
   * @param {boolean} darkMode - Current dark mode state
   */
  const updateColors = (color, darkMode) => {
    document.documentElement.style.setProperty('--bg-primary', darkMode ? color?.bgColorDark : color?.bgColor);
    document.documentElement.style.setProperty('--text-brand', darkMode ? color?.textColorDark : color?.textColor);
    document.documentElement.style.setProperty('--bg-primary-hover', darkMode ? color?.brandHoverColorDark : color?.brandHoverColor);
    document.documentElement.style.setProperty('--border-secondary', darkMode ? color?.borderColorDark : color?.borderColor);
    document.documentElement.style.setProperty('--bg-primary-faded', darkMode ? color?.fadedColorDark : color?.fadedColor);

    document.documentElement.style.setProperty('--bg-main', darkMode ? '#0C0E12' : '#ffffff');
    document.documentElement.style.setProperty('--bg-hover', darkMode ? '#13161b' : '#f3f4f6');
    document.documentElement.style.setProperty('--text-main', darkMode ? '#e0e0e0' : '#000000');
    document.documentElement.style.setProperty('--text-dark', darkMode ? '#F9FAFB' : '#101828');
    document.documentElement.style.setProperty('--text-primary', darkMode ? '#D0D5DD' : '#344054');
    document.documentElement.style.setProperty('--text-secondary', darkMode ? '#d0d5dd' : '#344054');
    document.documentElement.style.setProperty('--bg-secondary', darkMode ? '#1e1e1e' : '#f8f9fa');
    document.documentElement.style.setProperty('--border-primary', darkMode ? '#1D2939' : '#D0D5DD');
    document.documentElement.style.setProperty('--bg-grey', darkMode ? '#101318' : '#f3f4f6');
  };

  // Effect to handle dark mode changes
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    updateColors(primaryColor, isDarkMode);
  }, [isDarkMode, primaryColor]);

  /**
   * Toggles dark mode and updates theme colors
   */
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    updateColors(primaryColor, newMode);
  };

  /**
   * Updates primary color scheme
   * @param {Object} color - New color configuration
   */
  const handleColorChange = (color) => {
    setPrimaryColor(color);
    updateColors(color, isDarkMode);
  };

  /**
   * Fetches and applies user theme preferences
   */
  const fetchTheme = useCallback(async () => {
    if (auth.id && auth.theme) {
      setIsDarkMode(auth.theme.isDarkMode);
      setPrimaryColor(auth.theme.primaryColor);
      updateColors(auth.theme.primaryColor, auth.theme.isDarkMode);
    }
  }, [auth]);

  // Fetch theme preferences on component mount
  useEffect(() => {
    fetchTheme();
  }, [auth, fetchTheme]);

  return <ColorContext.Provider value={{ primaryColor, handleColorChange, toggleDarkMode, isDarkMode, setIsDarkMode }}>{children}</ColorContext.Provider>;
};
