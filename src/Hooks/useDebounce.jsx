import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

const useSetTimeout = (apiUrl, page, limit, val, key, a, site, event, delay = 500) => {
  const { setLoading, dispatch } = useContext(GlobalContext);
  const timeOutRef = useRef(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    timeOutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/${apiUrl}?p=${page}&n=${limit}&s=${val}&k=${key}&a=${a}&ws=${site}&event=${event}`, {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        });

        const { data, error } = await res.json();
        if (res.status === 403 && error === 'jwt expired') dispatch({ type: 'SIGNOUT' });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status} - ${error}`);

        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, delay);
    return () => clearTimeout(timeOutRef.current);
  }, [val, delay, apiUrl, page, limit, key, setLoading, a, site, refresh, dispatch, event]);

  return [error, data, setRefresh];
};

export default useSetTimeout;
