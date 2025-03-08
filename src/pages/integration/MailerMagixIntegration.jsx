import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import DropDown from '../../atoms/formFields/DropDown';
import useGlobalContext from '../../hooks/useGlobalContext';
import { updatePaymentIntegrationApi } from '../../apis/payment-integration-apis';
import { showNotification } from '../../utils/showNotification';

const MailerMagixIntegration = () => {
  const {
    auth: { allSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [mailerMagixDetails, setMailerMagixDetails] = useState(state?.integrationData?.social?.mailerMagix || {});
  const [errors, setErrors] = useState({});
  const [siteData, setSiteData] = useState({ id: state?.siteId, name: state?.siteId, showName: '' });

  const validate = () => {
    const newErrors = {};
    if (!mailerMagixDetails.api_token) newErrors.api_token = 'API Token is required.';
    if (!mailerMagixDetails.list_uid) newErrors.list_uid = 'List ID is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await updatePaymentIntegrationApi(state.siteId, null, null, { mailerMagix: { ...mailerMagixDetails, isVerified: true } });
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
          <span className="text-3xl font-semibold text-dark">Mailer Magix Configuration</span>
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
          <div className="w-full flex flex-col gap-y-5">
            <DropDown
              name="Sites"
              label={'Select Site'}
              dropdownList={allSites
                // ?.filter((site) => site?.modules?.some((module) => module.zoom === true))
                ?.map((site) => ({ id: site?._id, showName: `${site?.name} (${site?.host})`, name: site?._id }))}
              SummaryChild={<h5 className="p-0 m-0 text-primary">{siteData?.showName || 'Sites'}</h5>}
              search={true}
              selected={siteData?.name}
              commonFunction={(e) => setSiteData(e)}
            />
            <FormField
              label="API Token"
              type="text"
              id="api_token"
              name="api_token"
              placeholder="API Token"
              onChange={(e) => {
                setMailerMagixDetails((prev) => ({ ...prev, api_token: e.target.value }));
                if (errors.api_token) setErrors((prev) => ({ ...prev, api_token: '' }));
              }}
              value={mailerMagixDetails?.api_token}
              errorMessage={errors.api_token}
            />
            <FormField
              label="List ID"
              type="text"
              id="list_uid"
              name="list_uid"
              placeholder="List ID"
              onChange={(e) => {
                setMailerMagixDetails((prev) => ({ ...prev, list_uid: e.target.value }));
                if (errors.list_uid) setErrors((prev) => ({ ...prev, list_uid: '' }));
              }}
              value={mailerMagixDetails?.list_uid}
              errorMessage={errors.list_uid}
            />

            {/* <FormField  label="Frontend URI" type="text" placeholder="Frontend URI" disabled={true} value={import.meta.env.VITE_URL} />
            <FormField  label="Redirect URI" type="text" placeholder="Redirect URI" disabled={true} value={`${import.meta.env.VITE_API_URL}/zohocallback`} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailerMagixIntegration;
