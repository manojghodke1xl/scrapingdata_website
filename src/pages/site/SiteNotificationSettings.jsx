import { useEffect, useState } from 'react';
import FormButtons from '../../atoms/formFields/FormButtons';
import useGlobalContext from '../../hooks/useGlobalContext';
import DropDown from '../../atoms/formFields/DropDown';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { showNotification } from '../../utils/showNotification';
import { getTemplateBySiteApi, getWhatsAppTemplateBySiteApi } from '../../apis/templates/template-apis';
import { addAndUpdateSiteNotificationApi, getSiteNotificationByIdApi } from '../../apis/site-notification-apis';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import { getNotifAgentBySiteApi } from '../../apis/notif-agent-apis';

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
    userEnquiryEmailTemplate: null,
    userEnquriyWhatsAppTemplate: null,

    sendUserSubscriber: false,
    userSubscriberEmailTemplate: null,
    userSubscriberWhatsAppTemplate: null,

    sendAdminEnquiry: false,
    adminEnquiryEmails: [],
    adminEnquiryEmailTemplate: null,
    adminEnquiryPhoneNumber: [],
    adminEnquiryWhatsAppTemplate: null,

    sendAdminSubscriber: false,
    adminSubscriberEmails: [],
    adminSubscriberEmailTemplate: null,
    adminSubscriberPhoneNumber: [],
    adminSubscriberWhatsAppTemplate: null,

    sendUserDonation: false,
    userDonationEmailTemplate: null,
    userDonationWhatsAppTemplate: null
  });

  const [templateState, setTemplateState] = useState({
    emailTemplate: [],
    whatsAppTemplate: [],
    notificationAgent: []
  });

  useEffect(() => {
    if (siteNotification.site) {
      (async () => {
        const { status, data } = await getSiteNotificationByIdApi(siteNotification.site);
        if (status) setSiteNotification(data.siteNotification);
      })().catch((error) => showNotification('error', error.message));
    }
  }, [siteNotification.site]);

  const validate = () => {
    const newErrors = {};
    if (!siteNotification.site) newErrors.site = 'Please select a site.';
    if (siteNotification.adminEnquiryEmailTemplate && siteNotification.adminEnquiryEmails.length === 0) newErrors.forwardEmails = 'Please enter at least one email.';
    if (siteNotification.adminEnquiryWhatsAppTemplate && siteNotification.adminEnquiryPhoneNumber.length === 0) newErrors.phoneError = 'Please enter at least one phone number.';
    if (siteNotification.adminSubscriberEmailTemplate && siteNotification.adminSubscriberEmails.length === 0) newErrors.forwardEmails = 'Please enter at least one email.';
    if (siteNotification.adminSubscriberWhatsAppTemplate && siteNotification.adminSubscriberPhoneNumber.length === 0)
      newErrors.phoneError = 'Please enter at least one phone number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await addAndUpdateSiteNotificationApi(siteNotification);
      if (status) showNotification('success', data.message);
      else showNotification('error', data);
      setSiteNotification({});
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (siteNotification.site) {
      (async () => {
        try {
          const [emailTemplateResponse, whatsAppTemplateResponse, notifAgentResponse] = await Promise.all([
            getTemplateBySiteApi(siteNotification.site),
            getWhatsAppTemplateBySiteApi(siteNotification.site),
            getNotifAgentBySiteApi(siteNotification.site)
          ]);

          if (emailTemplateResponse.status) setTemplateState((prev) => ({ ...prev, emailTemplate: emailTemplateResponse?.data?.emailTemplates }));
          else showNotification('error', emailTemplateResponse.data);
          if (whatsAppTemplateResponse.status) setTemplateState((prev) => ({ ...prev, whatsAppTemplate: whatsAppTemplateResponse?.data?.whatsAppTemplates }));
          else showNotification('error', whatsAppTemplateResponse.data);
          if (notifAgentResponse.status) setTemplateState((prev) => ({ ...prev, notificationAgent: notifAgentResponse?.data?.notifAgents }));
          else showNotification('error', notifAgentResponse.data);
        } catch (error) {
          showNotification('error', error.message);
        }
      })();
    }
  }, [siteNotification.site]);

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
        <FormButtons type="submit" onClick={handleSubmit} btnLebal={'Save Changes'} loading={isLoading} />
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

      {siteNotification.site && (
        <>
          <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
            <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
              <div className="sm:w-7/12 w-full flex flex-col">
                <span className=" text-primary ">User Enquiry Preferences</span>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-y-5">
                  <ToggleComponent
                    bgColor={'bg-grey'}
                    label={'Send User Enquiry Notification'}
                    isEnableState={siteNotification.sendUserEnquiry}
                    setIsEnableState={(value) =>
                      setSiteNotification((prev) => ({ ...prev, sendUserEnquiry: value, userEnquiryEmailTemplate: null, userEnquriyWhatsAppTemplate: null }))
                    }
                  />
                  {siteNotification.sendUserEnquiry && (
                    <>
                      <DropDown
                        label={'Select Email Template'}
                        name="Template"
                        dropdownList={templateState.emailTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">Email Templates</h5>}
                        search={true}
                        selected={siteNotification.userEnquiryEmailTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, userEnquiryEmailTemplate: e.name }));
                          if (errors.userEnquiryEmailTemplate) setErrors((prev) => ({ ...prev, userEnquiryEmailTemplate: '' }));
                        }}
                        error={errors.userEnquiryEmailTemplate}
                      />

                      <DropDown
                        label={'Select WhatsApp Template'}
                        name="whatsappTemplate"
                        dropdownList={templateState.whatsAppTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">WhatsApp Templates</h5>}
                        search={true}
                        selected={siteNotification.userEnquriyWhatsAppTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, userEnquriyWhatsAppTemplate: e.name }));
                          if (errors.userEnquriyWhatsAppTemplate) setErrors((prev) => ({ ...prev, userEnquriyWhatsAppTemplate: '' }));
                        }}
                        error={errors.userEnquriyWhatsAppTemplate}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
            <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
              <div className="sm:w-7/12 w-full flex flex-col">
                <span className=" text-primary ">User Subscriber Preferences</span>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-y-5">
                  <ToggleComponent
                    bgColor={'bg-grey'}
                    label={'Send User Subscriber Notification'}
                    isEnableState={siteNotification.sendUserSubscriber}
                    setIsEnableState={(value) =>
                      setSiteNotification((prev) => ({ ...prev, sendUserSubscriber: value, userSubscriberEmailTemplate: null, userSubscriberWhatsAppTemplate: null }))
                    }
                  />
                  {siteNotification.sendUserSubscriber && (
                    <>
                      <DropDown
                        label={'Select Email Template'}
                        name="Template"
                        dropdownList={templateState.emailTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">Email Templates</h5>}
                        search={true}
                        selected={siteNotification.userSubscriberEmailTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, userSubscriberEmailTemplate: e.name }));
                          if (errors.userSubscriberEmailTemplate) setErrors((prev) => ({ ...prev, userSubscriberEmailTemplate: '' }));
                        }}
                        error={errors.userSubscriberEmailTemplate}
                      />

                      <DropDown
                        label={'Select WhatsApp Template'}
                        name="whatsappTemplate"
                        dropdownList={templateState.whatsAppTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">WhatsApp Templates</h5>}
                        search={true}
                        selected={siteNotification.userSubscriberWhatsAppTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, userSubscriberWhatsAppTemplate: e.name }));
                          if (errors.userSubscriberWhatsAppTemplate) setErrors((prev) => ({ ...prev, userSubscriberWhatsAppTemplate: '' }));
                        }}
                        error={errors.userSubscriberWhatsAppTemplate}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
            <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
              <div className="sm:w-7/12 w-full flex flex-col">
                <span className=" text-primary ">User Donation Preferences</span>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-y-5">
                  <ToggleComponent
                    bgColor={'bg-grey'}
                    label={'Send User Donation Notification'}
                    isEnableState={siteNotification.sendUserDonation || siteNotification.userDonationEmailTemplate || siteNotification.userDonationWhatsAppTemplate}
                    setIsEnableState={(value) =>
                      setSiteNotification((prev) => ({ ...prev, sendUserDonation: value, userDonationEmailTemplate: null, userDonationWhatsAppTemplate: null }))
                    }
                  />
                  {(siteNotification.sendUserDonation || siteNotification.userDonationEmailTemplate || siteNotification.userDonationWhatsAppTemplate) && (
                    <>
                      <DropDown
                        label={'Select Email Template'}
                        name="Template"
                        dropdownList={templateState.emailTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">Email Templates</h5>}
                        search={true}
                        selected={siteNotification.userDonationEmailTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, userDonationEmailTemplate: e.name }));
                          if (errors.userDonationEmailTemplate) setErrors((prev) => ({ ...prev, userDonationEmailTemplate: '' }));
                        }}
                        error={errors.userDonationEmailTemplate}
                      />

                      <DropDown
                        label={'Select WhatsApp Template'}
                        name="whatsappTemplate"
                        dropdownList={templateState.whatsAppTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">WhatsApp Templates</h5>}
                        search={true}
                        selected={siteNotification.userDonationWhatsAppTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, userDonationWhatsAppTemplate: e.name }));
                          if (errors.userDonationWhatsAppTemplate) setErrors((prev) => ({ ...prev, userDonationWhatsAppTemplate: '' }));
                        }}
                        error={errors.userDonationWhatsAppTemplate}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
            <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
              <div className="sm:w-7/12 w-full flex flex-col">
                <span className=" text-primary ">Admin Enquiry Preferences</span>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-y-5">
                  <ToggleComponent
                    bgColor={'bg-grey'}
                    label={'Send Admin Enquiry Notification'}
                    isEnableState={siteNotification.sendAdminEnquiry}
                    setIsEnableState={(value) =>
                      setSiteNotification((prev) => ({
                        ...prev,
                        sendAdminEnquiry: value,
                        adminEnquiryEmails: [],
                        adminEnquiryEmailTemplate: null,
                        adminEnquiryWhatsAppTemplate: null
                      }))
                    }
                  />

                  {siteNotification.sendAdminEnquiry && (
                    <>
                      <DropDown
                        label={'Select Email Template'}
                        name="Template"
                        dropdownList={templateState.emailTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">Email Templates</h5>}
                        search={true}
                        selected={siteNotification.adminEnquiryEmailTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, adminEnquiryEmailTemplate: e.name, adminEnquiryEmails: [] }));
                          if (errors.adminEnquiryEmailTemplate) setErrors((prev) => ({ ...prev, adminEnquiryEmailTemplate: '' }));
                        }}
                        error={errors.adminEnquiryEmailTemplate}
                      />

                      <MultiSelectCheckbox
                        formLabel={'Select Admin Enquiry Emails'}
                        options={templateState.notificationAgent?.map((agent) => ({ name: `${agent.name} (${agent.email})`, _id: agent._id }))}
                        label="Select Email IDs"
                        onChange={(selected) => {
                          setSiteNotification((prev) => ({ ...prev, adminEnquiryEmails: selected }));
                          if (errors.adminEnquiryEmails) setErrors((prev) => ({ ...prev, adminEnquiryEmails: '' }));
                        }}
                        selected={siteNotification.adminEnquiryEmails}
                        error={errors.adminEnquiryEmails}
                      />

                      <DropDown
                        label={'Select WhatsApp Template'}
                        name="whatsappTemplate"
                        dropdownList={templateState.whatsAppTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">WhatsApp Templates</h5>}
                        search={true}
                        selected={siteNotification.adminEnquiryWhatsAppTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, adminEnquiryWhatsAppTemplate: e.name }));
                          if (errors.adminEnquiryWhatsAppTemplate) setErrors((prev) => ({ ...prev, adminEnquiryWhatsAppTemplate: '' }));
                        }}
                        error={errors.adminEnquiryWhatsAppTemplate}
                      />

                      <MultiSelectCheckbox
                        formLabel={'Select Admin Enquiry Mobile Numbers'}
                        options={templateState.notificationAgent?.map((agent) => ({
                          name: `${agent.name} (${agent.phoneCode ? (agent.phoneCode?.startsWith('+') ? agent.phoneCode : `+${agent.phoneCode}`) : ''} ${
                            agent.phoneNumber ? agent.phoneNumber : '-'
                          })`,
                          _id: agent._id
                        }))}
                        label="Select Mobile Number"
                        onChange={(selected) => {
                          setSiteNotification((prev) => ({ ...prev, adminEnquiryPhoneNumber: selected }));
                          if (errors.adminEnquiryPhoneNumber) setErrors((prev) => ({ ...prev, adminEnquiryPhoneNumber: '' }));
                        }}
                        selected={siteNotification.adminEnquiryPhoneNumber}
                        error={errors.adminEnquiryPhoneNumber}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
            <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
              <div className="sm:w-7/12 w-full flex flex-col">
                <span className=" text-primary ">Admin Subscriber Preferences</span>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-y-5">
                  <ToggleComponent
                    bgColor={'bg-grey'}
                    label={'Send Admin Subscriber Notification'}
                    isEnableState={siteNotification.sendAdminSubscriber}
                    setIsEnableState={(value) =>
                      setSiteNotification((prev) => ({
                        ...prev,
                        sendAdminSubscriber: value,
                        adminSubscriberEmails: [],
                        adminSubscriberEmailTemplate: null,
                        adminSubscriberWhatsAppTemplate: null
                      }))
                    }
                  />

                  {siteNotification.sendAdminSubscriber && (
                    <>
                      <DropDown
                        label={'Select Email Template'}
                        name="Template"
                        dropdownList={templateState.emailTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">Email Templates</h5>}
                        search={true}
                        selected={siteNotification.adminSubscriberEmailTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, adminSubscriberEmailTemplate: e.name, adminSubscriberEmails: [] }));
                          if (errors.adminSubscriberEmailTemplate) setErrors((prev) => ({ ...prev, adminSubscriberEmailTemplate: '' }));
                        }}
                        error={errors.adminSubscriberEmailTemplate}
                      />

                      <MultiSelectCheckbox
                        formLabel={'Select Admin Subscriber Emails'}
                        options={templateState.notificationAgent?.map((agent) => ({ name: `${agent.name} (${agent.email})`, _id: agent._id }))}
                        label="Select Email IDs"
                        onChange={(selected) => {
                          setSiteNotification((prev) => ({ ...prev, adminSubscriberEmails: selected }));
                          if (errors.adminSubscriberEmails) setErrors((prev) => ({ ...prev, adminSubscriberEmails: '' }));
                        }}
                        selected={siteNotification.adminSubscriberEmails}
                        error={errors.adminSubscriberEmails}
                      />

                      <DropDown
                        label={'Select WhatsApp Template'}
                        name="whatsappTemplate"
                        dropdownList={templateState.whatsAppTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                        SummaryChild={<h5 className="p-0 m-0 text-primary">WhatsApp Templates</h5>}
                        search={true}
                        selected={siteNotification.adminSubscriberWhatsAppTemplate}
                        commonFunction={(e) => {
                          setSiteNotification((prev) => ({ ...prev, adminSubscriberWhatsAppTemplate: e.name }));
                          if (errors.adminSubscriberWhatsAppTemplate) setErrors((prev) => ({ ...prev, adminSubscriberWhatsAppTemplate: '' }));
                        }}
                        error={errors.adminSubscriberWhatsAppTemplate}
                      />

                      <MultiSelectCheckbox
                        formLabel={'Select Admin Subscriber Mobile Numbers'}
                        options={templateState.notificationAgent?.map((agent) => ({
                          name: `${agent.name} (${agent.phoneCode ? (agent.phoneCode?.startsWith('+') ? agent.phoneCode : `+${agent.phoneCode}`) : ''} ${
                            agent.phoneNumber ? agent.phoneNumber : '-'
                          })`,
                          _id: agent._id
                        }))}
                        label="Select Mobile Number"
                        onChange={(selected) => {
                          setSiteNotification((prev) => ({ ...prev, adminSubscriberPhoneNumber: selected }));
                          if (errors.adminSubscriberPhoneNumber) setErrors((prev) => ({ ...prev, adminSubscriberPhoneNumber: '' }));
                        }}
                        selected={siteNotification.adminSubscriberPhoneNumber}
                        error={errors.adminSubscriberPhoneNumber}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons type="submit" onClick={handleSubmit} btnLebal={'Save Changes'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default SitesNotificationSettings;
