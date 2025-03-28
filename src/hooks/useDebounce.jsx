import { useState, useEffect, useRef } from 'react';
import useGlobalContext from './useGlobalContext';

/**
 * Custom hook to handle API calls with debouncing
 * @param {string} apiUrl - API endpoint URL
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of items per page
 * @param {string} sortBy - Field to sort by
 * @param {string} sortOrder - Sorting order (asc/desc)
 * @param {string} val - Search value
 * @param {string} key - Search key
 * @param {string} a - Additional query parameter
 * @param {string} site - Site ID
 * @param {string} event - Event ID
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {[error, data, setRefresh]} - An array containing the error, data, and setRefresh function
 */
const useSetTimeout = (apiUrl, page, limit, sortBy, sortOrder, val, key, a, site, event, delay = 500) => {
  const { setLoading, dispatch } = useGlobalContext();
  const timeOutRef = useRef(0); // Reference to the setTimeout ID
  const [error, setError] = useState(null); // Error state
  const [data, setData] = useState(null); // Data state
  const [refresh, setRefresh] = useState(false); // Refresh state

  useEffect(() => {
    // If apiUrl is null, don't make the API call
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    setLoading(true);
    timeOutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/${apiUrl}?p=${page}&n=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&s=${val}&k=${key}&a=${a}&${site && `ws=${site}`}&event=${event}`,
          {
            method: 'GET',
            headers: { Authorization: localStorage.getItem('auth') }
          }
        );
        const { data, error } = await res.json();
        if (res.status === 403 || res.status === 401 || error === 'jwt expired') dispatch({ type: 'SIGNOUT' });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status} - ${error}`);
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => {
      clearTimeout(timeOutRef.current);
      setLoading(false);
    };
  }, [val, delay, apiUrl, page, limit, key, setLoading, a, site, refresh, dispatch, event, sortBy, sortOrder]);

  // Reset states when apiUrl is null
  useEffect(() => {
    if (!apiUrl) {
      setError(null);
      setData(null);
    }
  }, [apiUrl]);

  return [error, data, setRefresh];
};

export default useSetTimeout;
