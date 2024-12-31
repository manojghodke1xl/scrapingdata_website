import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import DropDown from '../../atoms/formFields/DropDown';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import { updatePaymentIntegrationApi } from '../../apis/payment-integration-apis';

const RazorpayIntegration = () => {
  const navigate = useNavigate();
  const { setLoading, isLoading } = useGlobalContext();
  const {
    state: { paymentData, siteId }
  } = useLocation();
  const [razorpayDetails, setRazorpayDetails] = useState(paymentData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!razorpayDetails.keyId) newErrors.keyId = 'Api Key Id is required';
    if (!razorpayDetails.keySecret) newErrors.keySecret = 'Api Secret is required';
    if (!razorpayDetails.environment) newErrors.environment = 'Environment is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await updatePaymentIntegrationApi(siteId, { razorpay: razorpayDetails });
      if (status) {
        showNotification('success', data.message);
        navigate('/apps/app');
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">Razorpay Configuration</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <FormButtons to={`/apps/integration/${siteId}`} onClick={handleSubmit} disabled={isLoading} />
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Basic Information</span>
          </div>
          <div className="w-full">
            <DropDown
              name="environment"
              dropdownList={[
                { id: 0, showName: 'Development', name: 'development' },
                { id: 1, showName: 'Production', name: 'production' }
              ]}
              selected={razorpayDetails?.environment}
              search={true}
              commonFunction={(e) => setRazorpayDetails((prev) => ({ ...prev, environment: e.name }))}
              error={errors.environment}
            />
            <FormField
              label="Key Id"
              type="text"
              id="keyId"
              name="keyId"
              placeholder="Key Id"
              onChange={(e) => {
                setRazorpayDetails((prev) => ({ ...prev, keyId: e.target.value }));
                if (errors.keyId) setErrors((prev) => ({ ...prev, keyId: '' }));
              }}
              value={razorpayDetails?.keyId}
              errorMessage={errors.keyId}
            />
            <FormField
              label="Secret key"
              type="text"
              id="keySecret"
              name="keySecret"
              placeholder="Secret key"
              onChange={(e) => {
                setRazorpayDetails((prev) => ({ ...prev, keySecret: e.target.value }));
                if (errors.keySecret) setErrors((prev) => ({ ...prev, keySecret: '' }));
              }}
              value={razorpayDetails?.keySecret}
              errorMessage={errors.keySecret}
            />

            <ToggleComponent
              label={'Turn On/Off Integration'}
              isEnableState={razorpayDetails?.isVerified}
              setIsEnableState={(value) => setRazorpayDetails((prev) => ({ ...prev, isVerified: value }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorpayIntegration;
