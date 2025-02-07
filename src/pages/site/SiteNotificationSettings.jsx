import { useEffect, useState } from 'react';
import FormButtons from '../../atoms/formFields/FormButtons';
import useGlobalContext from '../../hooks/useGlobalContext';
import DropDown from '../../atoms/formFields/DropDown';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import { RiDeleteBinLine } from 'react-icons/ri';
import { showNotification } from '../../utils/showNotification';
import { updateSiteNotificationsApi } from '../../apis/site-apis';

const SitesNotificationSettings = () => {
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();

  const [errors, setErrors] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);
  const [siteNotification, setSiteNotification] = useState({
    site: '',
    sendUserEnquiry: false,
    // userEnquiryMailData: { subject: "", body: "" },

    sendUserMailingList: false,
    // userMailingListMailData: { subject: "", body: "" },

    sendAdminEnquiry: false,
    // adminEnquiryMailData: { subject: "", body: "" },
    adminEnquiryEmails: [],

    sendAdminMailingList: false,
    // adminMailingListMailData: { subject: "", body: "" },
    adminMailingListEmails: []
  });

  const [emailInput, setEmailInput] = useState('');

  const validate = () => {
    const newErrors = {};
    if (siteNotification.sendUserEnquiry) {
      if (!siteNotification.userEnquiryMailData?.subject.trim()) newErrors.subject = 'Subject is required';
      if (!siteNotification.userEnquiryMailData?.body) newErrors.body = 'Body is required';
    }

    if (siteNotification.sendUserMailingList) {
      if (!siteNotification.userMailingListMailData?.subject.trim()) newErrors.subject = 'Subject is required';
      if (!siteNotification.userMailingListMailData?.body) newErrors.body = 'Body is required';
    }

    if (siteNotification.sendAdminEnquiry) {
      if (!siteNotification.adminEnquiryMailData?.subject.trim()) newErrors.subject = 'Subject is required';
      if (!siteNotification.adminEnquiryMailData?.body) newErrors.body = 'Body is required';
      if (!siteNotification.adminEnquiryEmails.length) newErrors.adminEnquiryEmails = 'At least one email is required';
    }

    if (siteNotification.sendAdminMailingList) {
      if (!siteNotification.adminMailingListMailData?.subject.trim()) newErrors.subject = 'Subject is required';
      if (!siteNotification.adminMailingListMailData?.body) newErrors.body = 'Body is required';
      if (!siteNotification.adminMailingListEmails.length) newErrors.adminMailingListEmails = 'At least one email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await updateSiteNotificationsApi(siteNotification);
      if (status) {
        showNotification('success', data.message);
        setSiteNotification({
          site: '',
          sendUserEnquiry: false,
          sendUserMailingList: false,
          sendAdminEnquiry: false,
          adminEnquiryEmails: [],
          sendAdminMailingList: false,
          adminMailingListEmails: []
        });
      } else showNotification('error', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMailDataChange = (field, type, value) => setSiteNotification((prev) => ({ ...prev, [field]: { ...prev[field], [type]: value } }));

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

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">Site Notifications</span>
        </div>
        <FormButtons to="/site/site-list" type="submit" onClick={handleSubmit} btnLebal={'Save Changes'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Site Association</span>
          </div>
          <div className="w-full">
            <div>
              <DropDown
                name="Sites"
                dropdownList={availableSites.map((site) => ({ id: site._id, showName: `${site.name} (${site.host})`, name: site._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Sites</h5>}
                search={true}
                selected={siteNotification.site}
                commonFunction={(e) => {
                  setSiteNotification((prev) => ({ ...prev, site: e.name }));
                  if (errors.site) setErrors((prev) => ({ ...prev, site: '' }));
                }}
                error={errors.site}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">User Preferences</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-5">
              <ToggleComponent
                bgColor={'bg-grey'}
                label={'Send User Enquiry Notification'}
                isEnableState={siteNotification.sendUserEnquiry}
                setIsEnableState={(value) => setSiteNotification((prev) => ({ ...prev, sendUserEnquiry: value, userEnquiryMailData: undefined }))}
              />
              {siteNotification.sendUserEnquiry && (
                <div>
                  <FormField
                    divClassName={'mt-5'}
                    label="Subject"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={siteNotification.userEnquiryMailData?.subject ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('userEnquiryMailData', 'subject', e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                    }}
                    errorMessage={errors.subject}
                  />
                  <TextareaComponent
                    divClassName={'mt-5'}
                    label="Body"
                    placeholder="Body"
                    id="body"
                    name="body"
                    value={siteNotification.userEnquiryMailData?.body ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('userEnquiryMailData', 'body', e.target.value);
                      if (errors.body) setErrors((prev) => ({ ...prev, body: '' }));
                    }}
                    errorMessage={errors.body}
                  />
                </div>
              )}

              <ToggleComponent
                bgColor={'bg-grey'}
                label={'Send User Subscriber Notification'}
                isEnableState={siteNotification.sendUserMailingList}
                setIsEnableState={(value) => setSiteNotification((prev) => ({ ...prev, sendUserMailingList: value, userMailingListMailData: undefined }))}
              />
              {siteNotification.sendUserMailingList && (
                <div>
                  <FormField
                    divClassName={'mt-5'}
                    label="Subject"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={siteNotification.userMailingListMailData?.subject ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('userMailingListMailData', 'subject', e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                    }}
                    errorMessage={errors.subject}
                  />
                  <TextareaComponent
                    divClassName={'mt-5'}
                    label="Body"
                    placeholder="Body"
                    id="body"
                    name="body"
                    value={siteNotification.userMailingListMailData?.body ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('userMailingListMailData', 'body', e.target.value);
                      if (errors.body) setErrors((prev) => ({ ...prev, body: '' }));
                    }}
                    errorMessage={errors.body}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Admin Preferences</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-5">
              <ToggleComponent
                bgColor={'bg-grey'}
                label={'Send Admin Enquiry'}
                isEnableState={siteNotification.sendAdminEnquiry}
                setIsEnableState={(value) => setSiteNotification((prev) => ({ ...prev, sendAdminEnquiry: value, adminEnquiryEmails: [], adminEnquiryMailData: undefined }))}
              />
              {siteNotification.sendAdminEnquiry && (
                <div>
                  <FormField
                    divClassName={'mt-5'}
                    label="Subject"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={siteNotification.adminEnquiryMailData?.subject ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('adminEnquiryMailData', 'subject', e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                    }}
                    errorMessage={errors.subject}
                  />
                  <TextareaComponent
                    divClassName={'mt-5'}
                    label="Body"
                    placeholder="Body"
                    id="body"
                    name="body"
                    value={siteNotification.adminEnquiryMailData?.body ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('adminEnquiryMailData', 'body', e.target.value);
                      if (errors.body) setErrors((prev) => ({ ...prev, body: '' }));
                    }}
                    errorMessage={errors.body}
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
                    className="px-4 py-2 text-white font-medium bg-primary hover:bg-primary-hover rounded-xl whitespace-nowrap mt-5"
                    onClick={(e) => validateAndAddInput(e, emailInput, setEmailInput, setSiteNotification, 'adminEnquiryEmails', emailRegex)}
                  >
                    Add Email
                  </button>

                  <ul className="space-y-2 my-5">
                    {siteNotification.adminEnquiryEmails.map((email, index) => (
                      <li key={index} className="flex justify-between items-center p-2 bg-inherit border border-primary text-primary shadow rounded-xl">
                        {email}
                        <RiDeleteBinLine size={20} className="text-failed" onClick={() => removeItemAtIndex(setSiteNotification, 'adminEnquiryEmails', index)} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ToggleComponent
                bgColor={'bg-grey'}
                label={'Send Admin Mailing List'}
                isEnableState={siteNotification.sendAdminMailingList}
                setIsEnableState={(value) =>
                  setSiteNotification((prev) => ({ ...prev, sendAdminMailingList: value, adminMailingListEmails: [], adminMailingListMailData: undefined }))
                }
              />

              {siteNotification.sendAdminMailingList && (
                <div>
                  <FormField
                    divClassName={'mt-5'}
                    label="Subject"
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={siteNotification.adminMailingListMailData?.subject}
                    onChange={(e) => {
                      handleMailDataChange('adminMailingListMailData', 'subject', e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                    }}
                    errorMessage={errors.subject}
                  />
                  <TextareaComponent
                    divClassName={'mt-5'}
                    label="Body"
                    placeholder="Body"
                    id="body"
                    name="body"
                    value={siteNotification.adminMailingListMailData?.body ?? ''}
                    onChange={(e) => {
                      handleMailDataChange('adminMailingListMailData', 'body', e.target.value);
                      if (errors.body) setErrors((prev) => ({ ...prev, body: '' }));
                    }}
                    errorMessage={errors.body}
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
                    className="px-4 py-2 text-white font-medium bg-primary hover:bg-primary-hover rounded-xl whitespace-nowrap mt-5"
                    onClick={(e) => validateAndAddInput(e, emailInput, setEmailInput, setSiteNotification, 'adminMailingListEmails', emailRegex)}
                  >
                    Add Email
                  </button>

                  <ul className="space-y-2 mt-5">
                    {siteNotification.adminMailingListEmails.map((email, index) => (
                      <li key={index} className="flex justify-between items-center p-2 bg-inherit border border-primary text-primary shadow rounded-xl">
                        {email}
                        <RiDeleteBinLine size={20} className="text-failed" onClick={() => removeItemAtIndex(setSiteNotification, 'adminMailingListEmails', index)} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/site/site-list" type="submit" onClick={handleSubmit} btnLebal={'Save Changes'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default SitesNotificationSettings;
