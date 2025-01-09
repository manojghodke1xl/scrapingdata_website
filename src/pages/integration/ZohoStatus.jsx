import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIntegrationBySite } from '../../apis/payment-integration-apis';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import { RxCross1 } from 'react-icons/rx';
import { IoMdCheckmark } from 'react-icons/io';

const ZohoStatus = () => {
  const { id = '' } = useParams();
  const { setLoading, isLoading } = useGlobalContext();
  const [currentStep, setCurrentStep] = useState(false);

  const getIntegration = useCallback(async () => {
    try {
      setLoading(true);
      const { status, data } = await getIntegrationBySite(id);
      if (status) {
        if (data.crm.zoho.isVerfied) setCurrentStep(true);
        else setCurrentStep(false);
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      {currentStep ? (
        <div className="p-8 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center bg-success rounded-full p-4">
              <IoMdCheckmark className="text-3xl text-success" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">Verification Successful</h1>
          <p className="text-secondary font-normal mb-6">Zoho CRM has been successfully integrated with your project. All systems are operational.</p>
          <button className="px-6 py-2 bg-primary text-white rounded-xl focus:outline-none focus:ring-0" disabled={isLoading} onClick={() => (window.location.href = '/dashboard')}>
            Go To Dashboard
          </button>
        </div>
      ) : (
        <div className="p-8 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center bg-fadedred rounded-full p-4">
              <RxCross1 className="text-3xl text-danger" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">Verification Failed</h1>
          <p className="text-secondary font-normal mb-6">The Client ID or Secret provided is incorrect. Please verify your credentials and try again.</p>
          <button className="px-6 py-2 bg-primary text-white rounded-lg focus:outline-none focus:ring-0" onClick={() => (window.location.href = '/dashboard')}>
            Go To Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ZohoStatus;
