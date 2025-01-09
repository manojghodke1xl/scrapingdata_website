import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIntegrationBySite } from '../../apis/payment-integration-apis';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';

const ZohoStatus = () => {
  const { id = '' } = useParams();
  const { setLoading, isLoading } = useGlobalContext();
  const [integrationData, setIntegrationData] = useState({});

  const getIntegration = useCallback(async () => {
    try {
      setLoading(true);
      const { status, data } = await getIntegrationBySite(id);
      if (status) {
        setIntegrationData(data);
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  }, [id, setLoading]);

  useEffect(() => {
    if (id) getIntegration();
  }, [getIntegration, id, setLoading]);

  console.log(integrationData);

  return (
    <div className="page page-center">
      <div className="container-tight py-4">
        <h1>Loading</h1>
      </div>
    </div>
  );
};

export default ZohoStatus;
