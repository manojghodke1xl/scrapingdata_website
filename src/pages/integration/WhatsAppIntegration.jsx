import { useLocation } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useState } from 'react';
import FormButtons from '../../atoms/formFields/FormButtons';
import PhoneInputField from '../../atoms/formFields/PhoneInputField';
import FormField from '../../atoms/formFields/InputField';
import { updatePaymentIntegrationApi, whatsAppOauthoApi } from '../../apis/payment-integration-apis';
import { showNotification } from '../../utils/showNotification';

const WhatsAppIntegration = () => {
  const { setLoading, isLoading } = useGlobalContext();
  const { state } = useLocation();
  console.log('state', state);

  const [errors, setErrors] = useState([{}]);
  const [whatsappDetails, setWhatsappDetails] = useState(
    state?.integrationData?.social?.whatsapp || [
      {
        phoneNumber: '',
        ccode: '',
        phoneNumberId: '',
        appId: '',
        appSecret: ''
      }
    ]
  );

  const validate = () => {
    const newErrors = {};
    whatsappDetails.forEach((whatsapp, index) => {
      if (!whatsapp.phoneNumber) newErrors[index] = { ...newErrors[index], phoneNumber: 'Mobile number is required' };
      if (!whatsapp.phoneNumberId) newErrors[index] = { ...newErrors[index], phoneNumberId: 'Mobile ID is required' };
      if (!whatsapp.accessToken) newErrors[index] = { ...newErrors[index], accessToken: 'Token is required' };
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('the details', whatsappDetails);
    // if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await updatePaymentIntegrationApi(state.siteId, null, null, { whatsapp: whatsappDetails });
      // const { status: status2, data: data2 } = await whatsAppOauthoApi();
      if (status) window.location.href = data.data.oauthUrl;
      // navigate(data.data.oauthUrl);
      // else showNotification('error', data.message);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (index, value, countryData) => {
    const numericValue = value.replace(/\D/g, '');
    const minLength = countryData.format.replace(/[^.]/g, '').length - countryData.dialCode.length;

    const mobile = numericValue.slice(countryData.dialCode.length);

    setWhatsappDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], phoneNumber: mobile, ccode: countryData.dialCode };
      return updated;
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: {
        ...prevErrors[index],
        number: numericValue.length < minLength ? `Mobile number must be at least ${minLength} digits` : ''
      }
    }));
  };

  const handleVariableChange = (index, field, value) => {
    setWhatsappDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeVariable = (index) => {
    if (whatsappDetails.length === 1) return;
    setWhatsappDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariable = () => {
    setWhatsappDetails((prev) => [...prev, { number: '', ccode: '', mobileId: '', token: '' }]);
  };

  console.log('whatsappDetails', whatsappDetails);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">WhatsApp Configuration</span>
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
            {whatsappDetails.map((whatsapp, index) => (
              <div key={index}>
                <PhoneInputField
                  divClassName="mt-5"
                  label="Mobile Number"
                  placeholder="Mobile number"
                  name="phoneNumber"
                  phoneError={errors[index]?.phoneNumber}
                  handlePhoneChange={(value, countryData) => handlePhoneChange(index, value, countryData)}
                />
                <FormField
                  divClassName={'mt-5'}
                  label="Mobile Number ID"
                  placeholder="Mobile Number ID"
                  type="text"
                  name="phoneNumberId"
                  value={whatsapp.phoneNumberId}
                  onChange={(e) => handleVariableChange(index, 'phoneNumberId', e.target.value)}
                  errorMessage={errors[index]?.phoneNumberId}
                />
                <FormField
                  divClassName={'mt-5'}
                  label="App ID"
                  placeholder="App ID"
                  type="text"
                  name="appId"
                  value={whatsapp.appId}
                  onChange={(e) => handleVariableChange(index, 'appId', e.target.value)}
                  errorMessage={errors[index]?.appId}
                />
                <FormField
                  divClassName={'mt-5'}
                  label="App Secret"
                  placeholder="App Secret"
                  type="text"
                  name="appSecret"
                  value={whatsapp.appSecret}
                  onChange={(e) => handleVariableChange(index, 'appSecret', e.target.value)}
                  errorMessage={errors[index]?.appSecret}
                />
                <button type="button" onClick={() => removeVariable(index)} className="px-4 py-2 mt-5 bg-red text-white rounded-xl">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addVariable} className="px-4 py-2 mt-5 bg-primary text-white rounded-xl hover:bg-blue-600">
              Add New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;
