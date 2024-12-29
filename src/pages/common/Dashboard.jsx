import { useCallback, useEffect, useRef } from 'react';
import { getAllSitesApi } from '../../apis/site-apis';
import { showNotification } from '../../utils/showNotification';
import useGlobalContext from '../../hooks/useGlobalContext';

const Dashboard = () => {
  const { auth, setLoading, dispatch } = useGlobalContext();
  const hasFetchedSites = useRef(false); // Track if sites have been fetched

  const fetchSites = useCallback(async () => {
    if (auth.allSites.length === 0 && !hasFetchedSites.current) {
      setLoading(true);

      try {
        const { status, data } = await getAllSitesApi();
        if (status) {
          dispatch({ type: 'SET_ALL_SITES', payload: data.sites });
          hasFetchedSites.current = true; // Set to true after the first fetch
          console.log('Updated allSites:', data.sites); // Log the updated sites
        } else if (data === 'jwt expired') dispatch({ type: 'SIGNOUT' });
        else showNotification('warn', data);
      } catch (error) {
        console.error('API call failed:', error);
        showNotification('error', error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [auth.allSites.length, dispatch, setLoading]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  return (
    <div className="p-8">
      <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
        <div className="">
          <h4 className="text-3xl text-dark">Dashboard</h4>
        </div>
      </div>
      <div className=" gap-6 ptpb-4">
        <div className="border p-4 rounded-xl border-primary flex flex-col gap-2">
          <div className="text-3xl font-semibold flex items-center justify-center">Welcome to MarsCMS&apos;s Enquiry Management System</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
