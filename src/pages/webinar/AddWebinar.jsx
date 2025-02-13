import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import DropDown from '../../atoms/formFields/DropDown';
import { getEventBySiteIdApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import { formatDateTime } from '../../utils/dateFormats';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { getTemplateBySiteApi, getWhatsAppTemplateBySiteApi } from '../../apis/templates/template-apis';
import { addWebinarApi, updateWebinarApi } from '../../apis/webinar-apis';

const AddWebinar = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [webinarDetials, setWebinarDetials] = useState({
    name: '',
    type: '',
    link: '',
    event: '',
    site: '',
    notification: false,
    emailTemplate: null,
    whatsAppTemplate: null
  });

  const [formState, setFormState] = useState({
    events: [],
    emailTemplate: [],
    whatsAppTemplate: []
  });

  const validate = () => {
    const newErrors = {};
    if (!webinarDetials.name.trim()) newErrors.name = 'Name is required';
    if (!webinarDetials.type) newErrors.type = 'Type is required';
    if (!webinarDetials.event) newErrors.event = 'Event is required';
    if (!webinarDetials.site) newErrors.site = 'Site is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const { status, data } = await (id ? (isDuplicate ? addWebinarApi(webinarDetials) : updateWebinarApi(id, webinarDetials)) : addWebinarApi(webinarDetials));
      if (status) {
        showNotification('success', data.message);
        navigate('/webinar/webinar-list');
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    }
  };
  useEffect(() => {
    if (webinarDetials.site) {
      (async () => {
        const [eventsResponse, emailTemplateResponse, whatsAppTemplateResponse] = await Promise.all([
          getEventBySiteIdApi(webinarDetials.site),
          getTemplateBySiteApi(webinarDetials.site),
          getWhatsAppTemplateBySiteApi(webinarDetials.site)
        ]);

        if (eventsResponse.status) setFormState((prev) => ({ ...prev, events: eventsResponse.data.events }));
        else showNotification('warn', eventsResponse.data);
        if (emailTemplateResponse.status) setFormState((prev) => ({ ...prev, emailTemplate: emailTemplateResponse?.data?.emailTemplates }));
        else showNotification('error', emailTemplateResponse.data);
        if (whatsAppTemplateResponse.status) setFormState((prev) => ({ ...prev, whatsAppTemplate: whatsAppTemplateResponse?.data?.whatsAppTemplates }));
        else showNotification('error', whatsAppTemplateResponse.data);
      })();
    }
  }, [webinarDetials.site]);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [isScrollable]);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Webinar</span>
        </div>
        <FormButtons to="/webinar/webinar-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary">Site Association</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-5">
              <DropDown
                name="site"
                label={'Select Site'}
                SummaryChild={<h5 className="text-primary p-0 m-0">Sites</h5>}
                dropdownList={availableSites.map((site) => ({ id: site._id, showName: `${site.name} (${site.host})`, name: site._id }))}
                selected={webinarDetials.site}
                search={true}
                commonFunction={(e) => {
                  setWebinarDetials((prev) => ({ ...prev, site: e.name }));
                  if (errors.site) setErrors((prev) => ({ ...prev, site: '' }));
                }}
                error={errors.site}
              />

              <DropDown
                name="event"
                label={'Select Event'}
                SummaryChild={<h5 className="text-primary p-0 m-0">Events</h5>}
                dropdownList={formState.events.map((event) => ({ name: event._id, showName: `${event.name} (${formatDateTime(event.date)})`, id: event._id }))}
                selected={webinarDetials.event}
                search={true}
                commonFunction={(e) => {
                  setWebinarDetials((prev) => ({ ...prev, event: e.name }));
                  if (errors.event) setErrors((prev) => ({ ...prev, event: '' }));
                }}
                error={errors.event}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Webinar Details</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-5">
              <FormField
                label="Name"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                onChange={(e) => {
                  setWebinarDetials((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={webinarDetials.name}
                errorMessage={errors.name}
              />

              <DropDown
                name="type"
                label={'Select Type'}
                SummaryChild={<h5 className="text-primary p-0 m-0">Type</h5>}
                dropdownList={[
                  { id: 'zoom', showName: 'Zoom', name: 'zoom' },
                  { id: 'youtubeLive', showName: 'Youtube Live', name: 'youtubeLive' }
                ]}
                selected={webinarDetials.type}
                search={true}
                commonFunction={(e) => {
                  setWebinarDetials((prev) => ({ ...prev, type: e.name }));
                  if (errors.type) setErrors((prev) => ({ ...prev, type: '' }));
                }}
                error={errors.type}
              />
              <FormField
                label="Link"
                type="url"
                id="link"
                name="link"
                placeholder="Link"
                onChange={(e) => {
                  setWebinarDetials((prev) => ({ ...prev, link: e.target.value }));
                  if (errors.link) setErrors((prev) => ({ ...prev, link: '' }));
                }}
                value={webinarDetials.link}
                errorMessage={errors.link}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Notification Preferences</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-5">
              <ToggleComponent
                label={'Turn on notification?'}
                isEnableState={webinarDetials.notification}
                setIsEnableState={(value) => setWebinarDetials((prev) => ({ ...prev, notification: value }))}
              />

              {(webinarDetials.notification || webinarDetials.emailTemplate || webinarDetials.whatsAppTemplate) && (
                <>
                  <DropDown
                    label={'Select Email Template'}
                    name="Template"
                    dropdownList={formState.emailTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">Email Templates</h5>}
                    search={true}
                    selected={webinarDetials.emailTemplate}
                    commonFunction={(e) => {
                      setWebinarDetials((prev) => ({ ...prev, emailTemplate: e.name }));
                      if (errors.emailTemplate) setErrors((prev) => ({ ...prev, emailTemplate: '' }));
                    }}
                    error={errors.emailTemplate}
                  />

                  <DropDown
                    label={'Select WhatsApp Template'}
                    name="whatsappTemplate"
                    dropdownList={formState.whatsAppTemplate?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">WhatsApp Templates</h5>}
                    search={true}
                    selected={webinarDetials.whatsAppTemplate}
                    commonFunction={(e) => {
                      setWebinarDetials((prev) => ({ ...prev, whatsAppTemplate: e.name }));
                      if (errors.whatsAppTemplate) setErrors((prev) => ({ ...prev, whatsAppTemplate: '' }));
                    }}
                    error={errors.whatsAppTemplate}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-4 border- border-primary">
          <FormButtons to="/webinar/webinar-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddWebinar;
