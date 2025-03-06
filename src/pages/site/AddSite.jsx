import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { getAllSmtpsApi } from '../../apis/smtp-apis';
import { showNotification } from '../../utils/showNotification';
import { addSiteApi, getSiteByIdApi, updateSiteApi } from '../../apis/site-apis';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import DropDown from '../../atoms/formFields/DropDown';
import ApiIntegrationModal from '../../atoms/modal/ApiIntegrationModal';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addWebsiteNote, editWebsiteNote, enquiryIntegration, subscriberIntegration } from './SiteNotes';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';

const moduleOptions = [
  { _id: 'casestudy', name: 'Case Study' },
  { _id: 'guide', name: 'Guide' },
  { _id: 'popup', name: 'Popup' },
  { _id: 'coupon', name: 'Coupon' },
  { _id: 'recaptcha', name: 'reCAPTCHA' },
  { _id: 'clientlogo', name: 'Client Logo' },
  { _id: 'gallery', name: 'Gallery' },
  { _id: 'partnerlogo', name: 'Partner Logo' },
  { _id: 'events', name: 'Events' },
  { _id: 'faq', name: 'FAQ' },
  { _id: 'testimonial', name: 'Testimonial' },
  { _id: 'apps', name: 'Apps' }
];

const AddSite = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading, dispatch, isLoading } = useGlobalContext();

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({ forwardEmails: '' });
  const [smtpOptions, setSmtpOptions] = useState([]);
  const [isEnquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [isMailingListModalOpen, setMailingListModalOpen] = useState(false);

  const [siteDetails, setSiteDetails] = useState({
    name: '',
    host: '',
    isActive: true,
    smtp: '',
    enquiryWebhookUrl: '',
    mailinglistWebhookUrl: '',
    modules: moduleOptions.map((option) => ({ [option._id]: true }))
  });

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllSmtpsApi();
      if (status) setSmtpOptions(data.smtps);
      else showNotification('warn', data);
    })();
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getSiteByIdApi(id);
        if (status) setSiteDetails(data.site);
        else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z0-9-_]+( [a-zA-Z0-9-_]+)*$/;
    const hostRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)+.*)$/;

    if (!siteDetails.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(siteDetails.name)) {
      newErrors.name = 'Invalid name format';
    } else if (siteDetails.name.length > 30) {
      newErrors.name = 'Name must be 30 characters or less';
    }

    if (!siteDetails.host.trim()) {
      newErrors.host = 'Host is required';
    } else if (!hostRegex.test(siteDetails.host)) {
      newErrors.host = 'Invalid host format';
    } else if (siteDetails.host.length > 30) {
      newErrors.host = 'Host must be 30 characters or less';
    }

    if (!siteDetails.smtp) newErrors.smtp = 'SMTP is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateSiteApi(id, siteDetails) : addSiteApi(siteDetails));
      if (status) {
        showNotification('success', data.message);
        dispatch({ type: 'SET_ALL_SITES', payload: [] });
        navigate('/site/site-list');
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
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Site</span>
        </div>
        <FormButtons to="/site/site-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Basic Information</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <FormField
              label="Site Name"
              type="text"
              id="name"
              name="name"
              required
              placeholder="Site Name"
              onChange={(e) => {
                setSiteDetails((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              value={siteDetails.name}
              errorMessage={errors.name}
            />
            <FormField
              label="Site Host"
              type="url"
              id="host"
              name="host"
              required
              placeholder="Site Host"
              onChange={(e) => {
                setSiteDetails((prev) => ({ ...prev, host: e.target.value }));
                if (errors.host) setErrors((prev) => ({ ...prev, host: '' }));
              }}
              value={siteDetails.host}
              errorMessage={errors.host}
            />

            <ToggleComponent
              label={'Is Site Active?'}
              isEnableState={siteDetails.isActive}
              tooltipContent={'If Site is active, it will be visible to the users.'}
              setIsEnableState={(value) => setSiteDetails((prev) => ({ ...prev, isActive: value }))}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Integration Settings</span>
          </div>
          <div className="w-full">
            <DropDown
              name="SMTP"
              label={'Select SMTP'}
              SummaryChild={<h5 className="p-0 m-0 text-primary">{siteDetails.smtpObj ? siteDetails.smtpObj.showName : 'SMTP'}</h5>}
              dropdownList={smtpOptions.map((option) => ({ id: option._id, showName: option.name, name: option._id }))}
              selected={siteDetails.smtp}
              search={true}
              commonFunction={(e) => setSiteDetails((prev) => ({ ...prev, smtp: e.id, smtpObj: e }))}
              error={errors.smtp}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Module Information</span>
          </div>
          <div className="w-full">
            <MultiSelectCheckbox
              options={moduleOptions}
              label={'Select Modules'}
              formLabel={'Select Modules'}
              selected={siteDetails.modules}
              onChange={(newModules) => setSiteDetails((prev) => ({ ...prev, modules: newModules }))}
              mode="objects"
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Webhook URLs</span>
          </div>
          <div className="w-full">
            <FormField
              label="Enquiry Webhook URL"
              type="url"
              id="enquiryWebhookUrl"
              name="enquiryWebhookUrl"
              placeholder="Enquiry Webhook URL"
              onChange={(e) => setSiteDetails((prev) => ({ ...prev, enquiryWebhookUrl: e.target.value }))}
              value={siteDetails.enquiryWebhookUrl}
            />
            <button onClick={() => setEnquiryModalOpen(true)} className="w-fit whitespace-nowrap rounded-xl bg-primary hover:bg-primary-hover text-white p-2 mt-2">
              Preview Data
            </button>
            <FormField
              divClassName={'mt-5'}
              label="Mailing List Webhook URL"
              type="url"
              id="mailinglistWebhookUrl"
              name="mailinglistWebhookUrl"
              placeholder="Mailing List Webhook URL"
              onChange={(e) => setSiteDetails((prev) => ({ ...prev, mailinglistWebhookUrl: e.target.value }))}
              value={siteDetails.mailinglistWebhookUrl}
            />
            <button onClick={() => setMailingListModalOpen(true)} className="w-fit whitespace-nowrap rounded-xl bg-primary hover:bg-primary-hover text-white p-2 mt-2">
              Preview Data
            </button>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editWebsiteNote : addWebsiteNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/site/site-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
        </div>
      )}
      <ApiIntegrationModal isIntegrationModalOpen={isEnquiryModalOpen} setIntegrationModalOpen={setEnquiryModalOpen} sections={enquiryIntegration} />
      <ApiIntegrationModal isIntegrationModalOpen={isMailingListModalOpen} setIntegrationModalOpen={setMailingListModalOpen} sections={subscriberIntegration} />
    </div>
  );
};

export default AddSite;
