import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { getAllSitesApi } from '../../apis/site-apis';
import { showNotification } from '../../utils/showNotification';
import { getAdminThemeApi } from '../../apis/admin-apis';

const defaultState = {
  id: '',
  isSuperAdmin: false,
  theme: {},
  exp: 0,
  iat: 0,
  allSites: []
};

const storage = localStorage.getItem('auth');

const authState = storage
  ? (() => {
      try {
        const tokenPayload = window.atob(storage.split('.')[1]);
        const decoded = JSON.parse(tokenPayload);
        return { ...defaultState, ...decoded };
      } catch (error) {
        console.error('Invalid token format', error);
        return defaultState;
      }
    })()
  : defaultState;

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SIGNIN': {
      localStorage.setItem('auth', `Bearer ${payload}`);
      try {
        const decoded = JSON.parse(window.atob(payload.split('.')[1]));
        return { ...state, ...decoded };
      } catch (error) {
        console.error('Error decoding token:', error);
        return state;
      }
    }

    case 'SIGNOUT': {
      localStorage.removeItem('auth');
      return { ...defaultState };
    }

    case 'SET_ALL_SITES': {
      return { ...state, allSites: payload };
    }

    case 'SET_THEME': {
      return { ...state, theme: payload };
    }

    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, authState);
  const [isLoading, setLoading] = useState(false);
  const themeFetched = useRef(false);

  const fetchData = useCallback(
    async (apiCall, successAction, id) => {
      setLoading(true);
      try {
        const { status, data } = await apiCall(id);
        if (status) dispatch(successAction(data));
        else if (status === false || data === 'jwt expired') dispatch({ type: 'SIGNOUT' });
        else showNotification('warn', data);
      } catch (error) {
        showNotification('error', error.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, setLoading]
  );

  const fetchSites = useCallback(() => {
    if (auth.id && auth.allSites.length === 0) fetchData(getAllSitesApi, (data) => ({ type: 'SET_ALL_SITES', payload: data.sites }), null);
  }, [auth.allSites.length, auth.id, fetchData]);

  const fetchTheme = useCallback(() => {
    if (auth.id && !themeFetched.current) {
      fetchData(getAdminThemeApi, (data) => ({ type: 'SET_THEME', payload: data.theme }), auth.id);
      themeFetched.current = true;
    }
  }, [auth.id, fetchData]);
  useEffect(() => {
    if (auth.id) {
      fetchSites();
      fetchTheme();
    }
  }, [auth.id, fetchSites, fetchTheme]);

  return <GlobalContext.Provider value={{ auth, dispatch, setLoading, isLoading }}>{children}</GlobalContext.Provider>;
};
