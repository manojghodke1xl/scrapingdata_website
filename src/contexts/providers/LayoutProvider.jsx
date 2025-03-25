import { useEffect, useState } from 'react';
import useGlobalContext from '../../hooks/useGlobalContext';
import { updateAdminPreferencesApi } from '../../apis/admin-apis';
import { showNotification } from '../../utils/showNotification';
import { LayoutContext } from '../contexts/LayoutContext';

export const LayoutProvider = ({ children }) => {
  const [layoutSize, setLayoutSize] = useState('medium');
  const {
    auth: { theme, id, layoutPreference },
    dispatch
  } = useGlobalContext();

  useEffect(() => {
    if (layoutPreference) {
      setLayoutSize(layoutPreference);
    }
  }, [layoutPreference]);

  const updateLayoutSize = async (size) => {
    setLayoutSize(size);
    try {
      const { status, data } = await updateAdminPreferencesApi(id, {
        layoutSize: size,
        darkMode: theme.isDarkMode, // Include current theme settings
        workspaceColors: theme.primaryColor
      });
      if (status) {
        dispatch({ type: 'SET_LAYOUT_PREFERENCE', payload: size });
      } else {
        showNotification('warn', data);
      }
    } catch (error) {
      showNotification('error', error.message);
    }
  };

  return <LayoutContext.Provider value={{ layoutSize, updateLayoutSize }}>{children}</LayoutContext.Provider>;
};
