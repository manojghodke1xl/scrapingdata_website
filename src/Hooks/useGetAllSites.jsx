import { useState, useEffect, useContext } from 'react';
import { getAllSitesApi } from '../apis/site-apis';
import { GlobalContext } from '../contexts/GlobalContext';
import { showNotification } from '../utils/showNotification';

export default function useGetAllSites() {
  const { setLoading, dispatch } = useContext(GlobalContext);
  const [allsites, setAllsites] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getAllSitesApi();
      if (status) setAllsites(data.sites);
      else if (data === 'jwt expired') dispatch({ type: 'SIGNOUT' });
      else showNotification('warn', data);
    })().finally(() => setLoading(false));
  }, [dispatch, setLoading]);

  return allsites;
}
