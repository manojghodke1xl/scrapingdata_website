import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import DropDown from '../../atoms/formFields/DropDown';
import useGlobalContext from '../../hooks/useGlobalContext';
import { updatePaymentIntegrationApi } from '../../apis/payment-integration-apis';
import { showNotification } from '../../utils/showNotification';

const ZoomIntegration = () => {
  const {
    auth: { allSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [zoomDetails, setZoomDetails] = useState(state?.integrationData?.social?.zoom || {});
  const [errors, setErrors] = useState({});
  const [siteData, setSiteData] = useState({ id: state?.siteId, name: state?.siteId, showName: '' });

  console.log('the site data', state);

  const validate = () => {
    const newErrors = {};
    if (!zoomDetails.clientId) newErrors.clientId = 'Client Id is required';
    if (!zoomDetails.clientSecret) newErrors.clientSecret = 'Client Secret is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await updatePaymentIntegrationApi(state.siteId, null, null, { zoom: { ...zoomDetails, isVerified: true } });
      if (data.link) window.open(data.link);
      if (status) navigate('/apps/app');
      else showNotification('warn', data);
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
          <span className="text-3xl font-semibold text-dark">Zoom Configuration</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <FormButtons to={`/apps/integration/${state?.siteId}`} loading={isLoading} btnLebal="Add" onClick={handleSubmit} />
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Basic Information</span>
          </div>
          <div className="w-full">
            <div className="-mb-4 text-primary">Select Site</div>
            <DropDown
              mt="mt-5"
              name="Sites"
              dropdownList={allSites
                // ?.filter((site) => site?.modules?.some((module) => module.zoom === true))
                ?.map((site) => ({ id: site?._id, showName: `${site?.name} (${site?.host})`, name: site?._id }))}
              SummaryChild={<h5 className="p-0 m-0 text-primary">{siteData?.showName || 'Sites'}</h5>}
              search={true}
              selected={siteData?.name}
              commonFunction={(e) => setSiteData(e)}
            />
            <FormField
              divClassName={'mt-5'}
              label="Account ID"
              type="text"
              id="accountId"
              name="accountId"
              placeholder="Account ID"
              onChange={(e) => {
                setZoomDetails((prev) => ({ ...prev, accountId: e.target.value }));
                if (errors.accountId) setErrors((prev) => ({ ...prev, accountId: '' }));
              }}
              value={zoomDetails?.accountId}
              errorMessage={errors.accountId}
            />
            <FormField
              divClassName={'mt-5'}
              label="Client ID"
              type="text"
              id="clientId"
              name="clientId"
              placeholder="Client ID"
              onChange={(e) => {
                setZoomDetails((prev) => ({ ...prev, clientId: e.target.value }));
                if (errors.clientId) setErrors((prev) => ({ ...prev, clientId: '' }));
              }}
              value={zoomDetails?.clientId}
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
                setZoomDetails((prev) => ({ ...prev, clientSecret: e.target.value }));
                if (errors.clientSecret) setErrors((prev) => ({ ...prev, clientSecret: '' }));
              }}
              value={zoomDetails?.clientSecret}
              errorMessage={errors.clientSecret}
            />
            {/* <FormField divClassName={'mt-5'} label="Frontend URI" type="text" placeholder="Frontend URI" disabled={true} value={import.meta.env.VITE_URL} />
            <FormField divClassName={'mt-5'} label="Redirect URI" type="text" placeholder="Redirect URI" disabled={true} value={`${import.meta.env.VITE_API_URL}/zohocallback`} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomIntegration;
