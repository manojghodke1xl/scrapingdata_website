import { useState, useEffect, useRef } from 'react';
import useGlobalContext from './useGlobalContext';

const useSetTimeout = (apiUrl, page, limit, val, key, a, site, event, delay = 500) => {
  const { setLoading, dispatch } = useGlobalContext();
  const timeOutRef = useRef(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // If apiUrl is null, don't make the API call
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    setLoading(true);
    timeOutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/${apiUrl}?p=${page}&n=${limit}&s=${val}&k=${key}&a=${a}&ws=${site}&event=${event}`, {
          method: 'GET',
          headers: { Authorization: localStorage.getItem('auth') }
        });
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
  }, [val, delay, apiUrl, page, limit, key, setLoading, a, site, refresh, dispatch, event]);

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
