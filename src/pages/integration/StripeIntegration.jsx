import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormField from '../../atoms/formFields/InputField';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { addPaymentIntegrationApi } from '../../apis/payment-integration-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import DropDown from '../../atoms/formFields/DropDown';

const StripeIntegration = () => {
  const navigate = useNavigate();
  const { setLoading } = useGlobalContext();
  const {
    state: { siteData }
  } = useLocation();
  const [stripeDetails, setStripeDetails] = useState({
    publicKey: '',
    secretKey: '',
    isVerified: true,
    environment: 'development'
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!stripeDetails.publicKey) newErrors.publicKey = 'Api Key Id is required';
    if (!stripeDetails.secretKey) newErrors.secretKey = 'Api Secret is required';
    if (!stripeDetails.environment) newErrors.environment = 'Environment is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await addPaymentIntegrationApi(siteData.id, { stripe: stripeDetails });
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
          <span className="text-3xl font-semibold text-dark">Razorpay Configure</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <FormButtons to="/apps/app" onClick={handleSubmit} />
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
              SummaryChild={<h5 className="p-0 m-0 text-primary">{stripeDetails.envObject?.showName || 'Development'}</h5>}
              dropdownList={[
                { id: 0, showName: 'Development', name: 'development' },
                { id: 1, showName: 'Production', name: 'production' }
              ]}
              selected={stripeDetails.environment || 'development'}
              search={true}
              commonFunction={(e) => setStripeDetails((prev) => ({ ...prev, environment: e.id, envObject: e }))}
              error={errors.environment}
            />
            <FormField
              label="Public Key"
              type="text"
              id="publicKey"
              name="publicKey"
              placeholder="Public Key"
              onChange={(e) => {
                setStripeDetails((prev) => ({ ...prev, publicKey: e.target.value }));
                if (errors.publicKey) setErrors((prev) => ({ ...prev, publicKey: '' }));
              }}
              value={stripeDetails.publicKey}
              errorMessage={errors.publicKey}
            />
            <FormField
              label="Secret Key"
              type="text"
              id="secretKey"
              name="secretKey"
              placeholder="Secret Key"
              onChange={(e) => {
                setStripeDetails((prev) => ({ ...prev, secretKey: e.target.value }));
                if (errors.secretKey) setErrors((prev) => ({ ...prev, secretKey: '' }));
              }}
              value={stripeDetails.secretKey}
              errorMessage={errors.secretKey}
            />

            <ToggleComponent
              label={'Turn On/Off Integration'}
              isEnableState={stripeDetails.isVerified}
              setIsEnableState={(value) => setStripeDetails((prev) => ({ ...prev, isVerified: value }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeIntegration;
