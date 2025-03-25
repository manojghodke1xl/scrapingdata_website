import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import DropDown from '../../atoms/formFields/DropDown';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import { updatePaymentIntegrationApi } from '../../apis/payment-integration-apis';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';

const PhonepeIntegration = () => {
  const navigate = useNavigate();
  const { setLoading, isLoading } = useGlobalContext();
  const { state } = useLocation();
  const [phonepeDetails, setPhonepeDetails] = useState(
    state?.integrationData?.payment?.phonepe || {
      merchantId: '',
      saltKey: '',
      environment: 'development',
      supports: {
        INR: false,
        AED: false,
        USD: false,
        EUR: false,
        JPY: false,
        GBP: false
      },
      redirectUrl: {
        success: '',
        failure: ''
      }
    }
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!phonepeDetails.merchantId) newErrors.merchantId = 'Merchant Id is required.';
    if (!phonepeDetails.saltKey) newErrors.saltKey = 'Salt Key is required.';
    if (!phonepeDetails.environment) newErrors.environment = 'Environment is required.';
    if (!phonepeDetails.redirectUrl?.success) newErrors.redirectUrlsuccess = 'Succes URL is required.';
    if (!phonepeDetails.redirectUrl?.failure) newErrors.redirectUrlfailure = 'Failure URL is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCurrencyChange = (selected) => {
    setPhonepeDetails((prevDetails) => ({
      ...prevDetails,
      supports: {
        ...prevDetails.supports,
        INR: selected.includes('INR')
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await updatePaymentIntegrationApi(state.siteId, { phonepe: phonepeDetails });
      if (status) {
        showNotification('success', data.message);
        navigate(`/apps/integration/${state?.siteId}`);
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
          <span className="text-3xl font-semibold text-dark">PhonePe Configuration</span>
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
          <div className="w-full flex flex-col gap-y-5">
            <DropDown
              name="environment"
              SummaryChild={<h5 className="p-0 m-0 text-primary">Select Environment</h5>}
              dropdownList={[
                { id: 0, showName: 'Development', name: 'development' },
                { id: 1, showName: 'Production', name: 'production' }
              ]}
              selected={phonepeDetails?.environment}
              search={true}
              commonFunction={(e) => setPhonepeDetails((prev) => ({ ...prev, environment: e.name }))}
              error={errors.environment}
            />
            <FormField
              label="Merchant Id"
              type="text"
              id="merchantId"
              name="merchantId"
              placeholder="Merchant Id"
              onChange={(e) => {
                setPhonepeDetails((prev) => ({ ...prev, merchantId: e.target.value }));
                if (errors.merchantId) setErrors((prev) => ({ ...prev, merchantId: '' }));
              }}
              value={phonepeDetails?.merchantId}
              errorMessage={errors.merchantId}
            />

            <FormField
              label="Key Secret"
              type="text"
              id="saltKey"
              name="saltKey"
              placeholder="Key Secret"
              onChange={(e) => {
                setPhonepeDetails((prev) => ({ ...prev, saltKey: e.target.value }));
                if (errors.saltKey) setErrors((prev) => ({ ...prev, saltKey: '' }));
              }}
              value={phonepeDetails?.saltKey}
              errorMessage={errors.saltKey}
            />

            <ToggleComponent
              label={'Turn On/Off Integration'}
              isEnableState={phonepeDetails?.isVerified}
              tooltipContent={'If you turn off this integration, you will not be able to use it.'}
              setIsEnableState={(value) => setPhonepeDetails((prev) => ({ ...prev, isVerified: value }))}
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
                { _id: 'INR', name: 'INR' },
                { _id: 'AED', name: 'AED' },
                { _id: 'USD', name: 'USD' },
                { _id: 'EUR', name: 'EUR' },
                { _id: 'JPY', name: 'JPY' },
                { _id: 'GBP', name: 'GBP' }
              ]}
              formLabel="Supported Currencies"
              label="Select Currencies"
              onChange={handleCurrencyChange}
              selected={Object.entries(phonepeDetails?.supports ?? {})
                .filter(([, value]) => value)
                .map(([key]) => key)}
              error={errors?.supports}
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
                setPhonepeDetails((prev) => ({ ...prev, redirectUrl: { ...prev.redirectUrl, success: e.target.value } }));
                if (errors.redirectUrlsuccess) setErrors((prev) => ({ ...prev, redirectUrlsuccess: '' }));
              }}
              value={phonepeDetails?.redirectUrl?.success}
              errorMessage={errors.redirectUrlsuccess}
            />
            <FormField
              label="Failure URL"
              type="url"
              id="failure"
              name="failure"
              placeholder="Failure URL"
              onChange={(e) => {
                setPhonepeDetails((prev) => ({ ...prev, redirectUrl: { ...prev.redirectUrl, failure: e.target.value } }));
                if (errors.redirectUrlfailure) setErrors((prev) => ({ ...prev, redirectUrlfailure: '' }));
              }}
              value={phonepeDetails?.redirectUrl?.failure}
              errorMessage={errors.redirectUrlfailure}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonepeIntegration;
