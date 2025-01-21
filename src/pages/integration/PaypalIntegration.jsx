import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormButtons from '../../atoms/formFields/FormButtons';
import DropDown from '../../atoms/formFields/DropDown';
import FormField from '../../atoms/formFields/InputField';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { showNotification } from '../../utils/showNotification';
import { updatePaymentIntegrationApi } from '../../apis/payment-integration-apis';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';

const PaypalIntegration = () => {
  const navigate = useNavigate();
  const { setLoading, isLoading } = useGlobalContext();
  const { state } = useLocation();

  const [paypalDetails, setPaypalDetails] = useState(
    state?.paymentData || {
      clientId: '',
      clientSecret: '',
      environment: 'development',
      supports: {
        INR: false,
        AED: false,
        USD: false
      },
      redirectUrl: {
        success: '',
        failure: ''
      }
    }
  );
  const [errors, setErrors] = useState({});

  const handleCurrencyChange = (selected) => {
    setPaypalDetails((prevDetails) => ({
      ...prevDetails,
      supports: {
        ...prevDetails.supports,
        AED: selected.includes('AED'),
        USD: selected.includes('USD')
      }
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!paypalDetails.clientId) newErrors.clientId = 'Client Id is required';
    if (!paypalDetails.clientSecret) newErrors.clientSecret = 'Client Secret is required';
    if (!paypalDetails.environment) newErrors.environment = 'Environment is required';
    if (!paypalDetails.redirectUrl?.success) newErrors.redirectUrlsuccess = 'Succes Redirect URL is required';
    if (!paypalDetails.redirectUrl?.failure) newErrors.redirectUrlfailure = 'Failure Redirect URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await updatePaymentIntegrationApi(state.siteId, { paypal: paypalDetails });
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

  useEffect(() => {
    if (!state) navigate('/apps/app');
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">PayPal Configuration</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <FormButtons to={`/apps/integration/${state?.siteId}`} onClick={handleSubmit} loading={isLoading} btnLebal="Save" />
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
              SummaryChild={<h5 className="p-0 m-0 text-primary">Select Environment</h5>}
              dropdownList={[
                { id: 0, showName: 'Development', name: 'development' },
                { id: 1, showName: 'Production', name: 'production' }
              ]}
              selected={paypalDetails?.environment || 'development'}
              search={true}
              commonFunction={(e) => setPaypalDetails((prev) => ({ ...prev, environment: e.name }))}
              error={errors.environment}
            />
            <FormField
              divClassName={'mt-5'}
              label="Client Id"
              type="text"
              id="clientId"
              name="clientId"
              placeholder="Client Id"
              onChange={(e) => {
                setPaypalDetails((prev) => ({ ...prev, clientId: e.target.value }));
                if (errors.clientId) setErrors((prev) => ({ ...prev, clientId: '' }));
              }}
              value={paypalDetails?.clientId}
              errorMessage={errors.clientId}
            />
            <FormField
              divClassName={'mt-5'}
              label="Client Secret"
              type="text"
              id="clientSecret"
              name="clientSecret"
              placeholder="Client Secret"
              onChange={(e) => {
                setPaypalDetails((prev) => ({ ...prev, clientSecret: e.target.value }));
                if (errors.clientSecret) setErrors((prev) => ({ ...prev, clientSecret: '' }));
              }}
              value={paypalDetails?.clientSecret}
              errorMessage={errors.clientSecret}
            />

            <ToggleComponent
              label={'Turn On/Off Integration'}
              isEnableState={paypalDetails?.isVerified}
              setIsEnableState={(value) => setPaypalDetails((prev) => ({ ...prev, isVerified: value }))}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Curreny Support</span>
          </div>
          <div className="w-full">
            <MultiSelectCheckbox
              options={[
                { _id: 'AED', name: 'AED' },
                { _id: 'USD', name: 'USD' }
              ]}
              formLabel="Supported Currencies"
              label="Select Currencies"
              onChange={handleCurrencyChange}
              selected={Object.entries(paypalDetails?.supports ?? {})
                .filter(([, value]) => value)
                .map(([key]) => key)}
              error={errors?.supports}
              divClassName="mb-4"
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Redirect URL Details</span>
          </div>
          <div className="w-full">
            <FormField
              label="Success URL"
              type="url"
              id="success"
              name="success"
              placeholder="Success URL"
              onChange={(e) => {
                setPaypalDetails((prev) => ({ ...prev, redirectUrl: { ...prev.redirectUrl, success: e.target.value } }));
                if (errors.redirectUrlsuccess) setErrors((prev) => ({ ...prev, redirectUrlsuccess: '' }));
              }}
              value={paypalDetails?.redirectUrl?.success}
              errorMessage={errors.redirectUrlsuccess}
            />
            <FormField
              divClassName={'mt-5'}
              label="Failure URL"
              type="url"
              id="failure"
              name="failure"
              placeholder="Failure URL"
              onChange={(e) => {
                setPaypalDetails((prev) => ({ ...prev, redirectUrl: { ...prev.redirectUrl, failure: e.target.value } }));
                if (errors.redirectUrlfailure) setErrors((prev) => ({ ...prev, redirectUrlfailure: '' }));
              }}
              value={paypalDetails?.redirectUrl?.failure}
              errorMessage={errors.redirectUrlfailure}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaypalIntegration;
