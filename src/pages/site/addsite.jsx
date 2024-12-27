import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import { getAllSmtpsApi } from '../../apis/smtp-apis';
import { showNotification } from '../../utils/showNotification';
import { addSiteApi, getSiteByIdApi, updateSiteApi } from '../../apis/site-apis';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import DropDown from '../../atoms/formFields/DropDown';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import ApiIntegrationModal from '../../atoms/modal/ApiIntegrationModal';

const AddSite = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading } = useContext(GlobalContext);

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({ forwardEmails: '' });
  const [smtpOptions, setSmtpOptions] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [isEnquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [isMailingListModalOpen, setMailingListModalOpen] = useState(false);

  const [siteDetails, setSiteDetails] = useState({
    name: '',
    host: '',
    isActive: true,
    smtp: '',
    sendUserEnquiry: false,
    // sendUserEnquiryData: { subject: "", body: "" },
    sendUserMailingList: false,
    // sendUserMailingListData: { subject: "", body: "" },
    sendAdminEnquiry: false,
    // sendAdminEnquiryData: { subject: "", body: "" },
    adminEnquiryEmails: [],
    sendAdminMailingList: false,
    // sendAdminMailingListData: { subject: "", body: "" },
    adminMailingListEmails: [],
    sendCRM: false,
    // sendCRMData: { clientId: "", clientSecret: "" },
    enquiryWebhookUrl: '',
    mailinglistWebhookUrl: ''
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
    if (!siteDetails.name) newErrors.name = 'Name is required';
    if (!siteDetails.host) newErrors.host = 'Host is required';
    if (!siteDetails.smtp) newErrors.smtp = 'SMTP is required';

    if (siteDetails.sendUserEnquiry) {
      if (!siteDetails.userEnquiryMailData?.subject) newErrors.subject = 'Subject is required';
      if (!siteDetails.userEnquiryMailData?.body) newErrors.body = 'Body is required';
    }

    if (siteDetails.sendUserMailingList) {
      if (!siteDetails.userMailingListMailData?.subject) newErrors.subject = 'Subject is required';
      if (!siteDetails.userMailingListMailData?.body) newErrors.body = 'Body is required';
    }

    if (siteDetails.sendAdminEnquiry) {
      if (!siteDetails.adminEnquiryMailData?.subject) newErrors.subject = 'Subject is required';
      if (!siteDetails.adminEnquiryMailData?.body) newErrors.body = 'Body is required';
      if (!siteDetails.adminEnquiryEmails.length) newErrors.adminEnquiryEmails = 'At least one email is required';
    }

    if (siteDetails.sendAdminMailingList) {
      if (!siteDetails.adminMailingListMailData?.subject) newErrors.subject = 'Subject is required';
      if (!siteDetails.adminMailingListMailData?.body) newErrors.body = 'Body is required';
      if (!siteDetails.adminMailingListEmails.length) newErrors.adminMailingListEmails = 'At least one email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMailDataChange = (field, type, value) => setSiteDetails((prev) => ({ ...prev, [field]: { ...prev[field], [type]: value } }));

  const removeItemAtIndex = (setDetails, key, indexToRemove) => setDetails((prev) => ({ ...prev, [key]: prev[key].filter((_, index) => index !== indexToRemove) }));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateAndAddInput = (e, inputValue, setInputValue, setStateDetails, key, regexPattern) => {
    e.preventDefault();
    if (inputValue && regexPattern.test(inputValue)) {
      setStateDetails((prev) => ({ ...prev, [key]: [...(prev[key] || []), inputValue] }));
      setInputValue('');
      setErrors((prev) => ({ ...prev, forwardEmails: '' }));
    } else setErrors((prev) => ({ ...prev, forwardEmails: 'Please enter a valid email address.' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateSiteApi(id, siteDetails) : addSiteApi(siteDetails));
      if (status) {
        showNotification('success', data.message);
        if (siteDetails.sendCRM) return navigate(`/zoho-auth/${data?.data?.id}`);
        else return navigate('/website/website-list');
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
        <FormButtons to="/website/website-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Basic Information</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Site Name"
                type="text"
                id="name"
                name="name"
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
                type="text"
                id="host"
                name="host"
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
                setIsEnableState={(value) => setSiteDetails((prev) => ({ ...prev, isActive: value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Notification Preferences</span>
          </div>
          <div className="w-full">
            <div>
              <ToggleComponent
                bgColor={'bg-grey'}
                label={'Send User Enquiry Notification'}
                isEnableState={siteDetails.sendUserEnquiry}
                setIsEnableState={(value) => setSiteDetails((prev) => ({ ...prev, sendUserEnquiry: value, userEnquiryMailData: undefined }))}
              />
              {siteDetails.sendUserEnquiry && (
                <div>
                  <FormField
                    label="Subject"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={siteDetails.userEnquiryMailData?.subject ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('userEnquiryMailData', 'subject', e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                    }}
                    errorMessage={errors.subject}
                  />
                  <TextareaComponent
                    label="Body"
                    placeholder="Body"
                    id="body"
                    name="body"
                    value={siteDetails.userEnquiryMailData?.body ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('userEnquiryMailData', 'body', e.target.value);
                      if (errors.body) setErrors((prev) => ({ ...prev, body: '' }));
                    }}
                    errorMessage={errors.body}
                    charCount={false}
                  />
                </div>
              )}

              <ToggleComponent
                bgColor={'bg-grey'}
                label={'Send User Mailing Notification'}
                isEnableState={siteDetails.sendUserMailingList}
                setIsEnableState={(value) => setSiteDetails((prev) => ({ ...prev, sendUserMailingList: value, userMailingListMailData: undefined }))}
              />
              {siteDetails.sendUserMailingList && (
                <div>
                  <FormField
                    label="Subject"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={siteDetails.userMailingListMailData?.subject ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('userMailingListMailData', 'subject', e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                    }}
                    errorMessage={errors.subject}
                  />
                  <TextareaComponent
                    label="Body"
                    placeholder="Body"
                    id="body"
                    name="body"
                    value={siteDetails.userMailingListMailData?.body ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('userMailingListMailData', 'body', e.target.value);
                      if (errors.body) setErrors((prev) => ({ ...prev, body: '' }));
                    }}
                    errorMessage={errors.body}
                    charCount={false}
                  />
                </div>
              )}

              <ToggleComponent
                bgColor={'bg-grey'}
                label={'Send Admin Enquiry'}
                isEnableState={siteDetails.sendAdminEnquiry}
                setIsEnableState={(value) => setSiteDetails((prev) => ({ ...prev, sendAdminEnquiry: value, adminEnquiryEmails: [], adminEnquiryMailData: undefined }))}
              />
              {siteDetails.sendAdminEnquiry && (
                <div>
                  <FormField
                    label="Subject"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={siteDetails.adminEnquiryMailData?.subject ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('adminEnquiryMailData', 'subject', e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                    }}
                    errorMessage={errors.subject}
                  />
                  <TextareaComponent
                    label="Body"
                    placeholder="Body"
                    id="body"
                    name="body"
                    value={siteDetails.adminEnquiryMailData?.body ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('adminEnquiryMailData', 'body', e.target.value);
                      if (errors.body) setErrors((prev) => ({ ...prev, body: '' }));
                    }}
                    errorMessage={errors.body}
                    charCount={false}
                  />

                  <FormField
                    label="Email ID"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email ID"
                    value={emailInput}
                    onChange={(e) => {
                      if (errors.forwardEmails) setErrors((prev) => ({ ...prev, forwardEmails: '' }));
                      if (errors.adminEnquiryEmails) setErrors((prev) => ({ ...prev, adminEnquiryEmails: '' }));
                      setEmailInput(e.target.value);
                    }}
                    errorMessage={errors.forwardEmails || errors.adminEnquiryEmails}
                  />

                  <button
                    type="button"
                    className="px-4 py-2 text-white font-medium bg-primary hover:bg-hover rounded-xl whitespace-nowrap mt-5"
                    onClick={(e) => validateAndAddInput(e, emailInput, setEmailInput, setSiteDetails, 'adminEnquiryEmails', emailRegex)}
                  >
                    Add Email
                  </button>

                  <ul className="space-y-2 mt-5">
                    {siteDetails.adminEnquiryEmails.map((email, index) => (
                      <li key={index} className="flex justify-between items-center p-2 bg-white shadow rounded-md">
                        {email}
                        <button
                          type="button"
                          className="px-2 py-1 text-white bg-danger hover:bg-danger rounded"
                          onClick={() => removeItemAtIndex(setSiteDetails, 'adminEnquiryEmails', index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ToggleComponent
                bgColor={'bg-grey'}
                label={'Send Admin Mailing List'}
                isEnableState={siteDetails.sendAdminMailingList}
                setIsEnableState={(value) => setSiteDetails((prev) => ({ ...prev, sendAdminMailingList: value, adminMailingListEmails: [], adminMailingListMailData: undefined }))}
              />

              {siteDetails.sendAdminMailingList && (
                <div>
                  <FormField
                    label="Subject"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={siteDetails.adminMailingListMailData?.subject}
                    onChange={(e) => {
                      handleMailDataChange('adminMailingListMailData', 'subject', e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                    }}
                    errorMessage={errors.subject}
                  />
                  <TextareaComponent
                    label="Body"
                    placeholder="Body"
                    id="body"
                    name="body"
                    value={siteDetails.adminMailingListMailData?.body ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('adminMailingListMailData', 'body', e.target.value);
                      if (errors.body) setErrors((prev) => ({ ...prev, body: '' }));
                    }}
                    errorMessage={errors.body}
                    charCount={false}
                  />

                  <FormField
                    label="Email ID"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email ID"
                    value={emailInput}
                    onChange={(e) => {
                      if (errors.forwardEmails) setErrors((prev) => ({ ...prev, forwardEmails: '' }));
                      if (errors.adminMailingListEmails) setErrors((prev) => ({ ...prev, adminMailingListEmails: '' }));
                      setEmailInput(e.target.value);
                    }}
                    errorMessage={errors.forwardEmails || errors.adminMailingListEmails}
                  />

                  <button
                    type="button"
                    className="px-4 py-2 text-white font-medium bg-primary hover:bg-hover rounded-xl whitespace-nowrap mt-5"
                    onClick={(e) => validateAndAddInput(e, emailInput, setEmailInput, setSiteDetails, 'adminMailingListEmails', emailRegex)}
                  >
                    Add Email
                  </button>

                  <ul className="space-y-2 mt-5">
                    {siteDetails.adminMailingListEmails.map((email, index) => (
                      <li key={index} className="flex justify-between items-center p-2 bg-white shadow rounded-md">
                        {email}
                        <button
                          type="button"
                          className="px-2 py-1 text-white bg-danger hover:bg-danger rounded"
                          onClick={() => removeItemAtIndex(setSiteDetails, 'adminMailingListEmails', index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        adminEnquiryEmails
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Integration Settings</span>
          </div>
          <div className="w-full">
            <div>
              <ToggleComponent
                label={'Send CRM'}
                isEnableState={siteDetails.sendCRM}
                setIsEnableState={(value) => setSiteDetails((prev) => ({ ...prev, sendCRM: value, sendCRMData: undefined }))}
              />
              <DropDown
                name="SMTP"
                SummaryChild={<h5 className="p-0 m-0 text-primary">{siteDetails.smtpObj ? siteDetails.smtpObj.showName : 'SMTP'}</h5>}
                dropdownList={smtpOptions.map((option) => ({ id: option._id, showName: option.name, name: option._id }))}
                selected={siteDetails.smtp}
                search={true}
                commonFunction={(e) => setSiteDetails((prev) => ({ ...prev, smtp: e.id, smtpObj: e }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Webhook URLs</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Enquiry Webhook URL"
                type="url"
                id="enquiryWebhookUrl"
                name="enquiryWebhookUrl"
                placeholder="Enquiry Webhook URL"
                onChange={(e) => setSiteDetails((prev) => ({ ...prev, enquiryWebhookUrl: e.target.value }))}
                value={siteDetails.enquiryWebhookUrl}
              />
              <button onClick={() => setEnquiryModalOpen(true)} className="w-1/4 rounded-xl bg-darkblue text-white py-2 mt-2">
                Preview Data
              </button>
              <FormField
                label="Mailing List Webhook URL"
                type="url"
                id="mailinglistWebhookUrl"
                name="mailinglistWebhookUrl"
                placeholder="Mailing List Webhook URL"
                onChange={(e) => setSiteDetails((prev) => ({ ...prev, mailinglistWebhookUrl: e.target.value }))}
                value={siteDetails.mailinglistWebhookUrl}
              />
              <button onClick={() => setMailingListModalOpen(true)} className="w-1/4 rounded-xl bg-darkblue text-white py-2 mt-2">
                Preview Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editAdminNote : addAdminNote} />
        </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/website/website-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
        </div>
      )}
      <ApiIntegrationModal
        isIntegrationModalOpen={isEnquiryModalOpen}
        setIntegrationModalOpen={setEnquiryModalOpen}
        sections={[
          {
            title: 'Request Method',
            content: 'POST'
          },
          {
            title: 'Response Details',
            content: `{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "mobile": "+1234567890",
  "ccode": "91",
  "message": "This is a sample message.",
  "service": "Web Development",
  "subject": "Enquiry about services",
  "header": "Content-Type: application/json",
  "uastring": "userAgent",
  "ipaddress": "192.168.1.1",
  "site": "website key"
}`
          }
        ]}
      />

      <ApiIntegrationModal
        isIntegrationModalOpen={isMailingListModalOpen}
        setIntegrationModalOpen={setMailingListModalOpen}
        sections={[
          {
            title: 'Request Method',
            content: 'POST'
          },
          {
            title: 'Response Details',
            content: `{
  "email": "john.doe@example.com",
  "list": "Updates",
  "header": "Content-Type: application/json",
  "uastring": "userAgent",
  "ipaddress": "192.168.1.1",
  "site": "website key"
}`
          }
        ]}
      />
    </div>
  );
};

export default AddSite;
