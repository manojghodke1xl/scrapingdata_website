import { useReducer, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

// Default state with `allSites` as an empty array
const defaultState = {
  id: '',
  isSuperAdmin: false,
  exp: 0,
  iat: 0,
  allSites: [] // Store all sites here
};

// Get auth token from localStorage, or use the default state if missing or malformed
const storage = localStorage.getItem('auth');

// Decode token and handle errors gracefully
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

// Reducer to handle authentication and state changes
const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SIGNIN': {
      // Store token in localStorage
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
      // Clear token from localStorage
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

// Context Provider Component
export const GlobalProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, authState);
  const [isLoading, setLoading] = useState(false);

  return <GlobalContext.Provider value={{ auth, dispatch, setLoading, isLoading }}>{children}</GlobalContext.Provider>;
};
