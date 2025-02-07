import { useCallback, useEffect, useReducer, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { getAllSitesApi } from '../../apis/site-apis';
import { showNotification } from '../../utils/showNotification';

const defaultState = {
  id: '',
  isSuperAdmin: false,

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

    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, authState);
  const [isLoading, setLoading] = useState(false);

  const fetchSites = useCallback(async () => {
    if (auth.id && auth.allSites.length === 0) {
      setLoading(true);

      try {
        const { status, data } = await getAllSitesApi();
        if (status) dispatch({ type: 'SET_ALL_SITES', payload: data.sites });
        else if (status === false || data === 'jwt expired') dispatch({ type: 'SIGNOUT' });
        else showNotification('warn', data);
      } catch (error) {
        showNotification('error', error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [auth.allSites.length, dispatch, setLoading, auth.id]);

  useEffect(() => {
    if (auth.id) fetchSites();
  }, [auth.id, fetchSites]);

  return <GlobalContext.Provider value={{ auth, dispatch, setLoading, isLoading }}>{children}</GlobalContext.Provider>;
};
