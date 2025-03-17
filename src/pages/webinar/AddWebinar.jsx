import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import DropDown from '../../atoms/formFields/DropDown';
import { getEventBySiteIdApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import { formatDateTime } from '../../utils/dateFormats';
import { addWebinarApi, getWebinarByIdApi, updateWebinarApi } from '../../apis/webinar-apis';
import { IoCloseSharp } from 'react-icons/io5';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import { handleTimeConversion } from '../../constants/comon';
import { FaEye } from 'react-icons/fa';

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
    event: '',
    links: [
      {
        link: '',
        site: '',
        limit: 1
      }
    ],
    notification: false,
    emailTemplate: null,
    whatsAppTemplate: null,
    followUps: [
      {
        channels: [],
        delay: { unit: 'Days', value: '', custom: '', ms: '' },
        when: '',
        type: '',
        emailTemplate: null,
        smsTemplate: null,
        whatsappTemplate: null
      }
    ]
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
          getEventBySiteIdApi(webinarDetials.site)
          // getTemplateBySiteApi(webinarDetials.site),
          // getWhatsAppTemplateBySiteApi(webinarDetials.site)
        ]);

        if (eventsResponse.status) setFormState((prev) => ({ ...prev, events: eventsResponse.data.events }));
        else showNotification('warn', eventsResponse.data);
        // if (emailTemplateResponse.status) setFormState((prev) => ({ ...prev, emailTemplate: emailTemplateResponse?.data?.emailTemplates }));
        // else showNotification('error', emailTemplateResponse.data);
        // if (whatsAppTemplateResponse.status) setFormState((prev) => ({ ...prev, whatsAppTemplate: whatsAppTemplateResponse?.data?.whatsAppTemplates }));
        // else showNotification('error', whatsAppTemplateResponse.data);
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

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getWebinarByIdApi(id);
        if (status) setWebinarDetials(data.webinarDetails);
        else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const handleAddLink = () => {
    setWebinarDetials((prev) => ({
      ...prev,
      links: [...prev.links, { link: '', site: '', limit: 1 }]
    }));
  };

  const removeLink = (index) => {
    if (webinarDetials.length === 1) return;
    setWebinarDetials((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const handleDropdownChange = (index, selected) => {
    setWebinarDetials((prev) => {
      const updatedLinkDetails = [...prev.links];
      updatedLinkDetails[index] = { ...updatedLinkDetails[index], type: selected.name };
      return { ...prev, links: updatedLinkDetails };
    });
  };

  const handleInputChange = (index, field, value) => {
    setWebinarDetials((prev) => {
      const updatedLinkDetails = [...prev.links];
      updatedLinkDetails[index] = { ...updatedLinkDetails[index], [field]: value };
      return { ...prev, links: updatedLinkDetails };
    });
  };

  const removeVariable = (index) => {
    if (webinarDetials.followUps.length === 1) return;
    setWebinarDetials((prev) => ({
      ...prev,
      followUps: prev.followUps.filter((_, i) => i !== index)
    }));
  };
  const addVariable = () => {
    setWebinarDetials((prev) => ({
      ...prev,
      followUps: prev.followUps
        ? [...prev.followUps, { channels: [], delay: { unit: 'Days', value: '', custom: '', ms: '' } }]
        : [{ channels: [], delay: { unit: 'Days', value: '', custom: '', ms: '' } }]
    }));
  };

  const handleVariableChange = (index, field, value) => {
    setWebinarDetials((prev) => {
      const updated = [...prev.followUps];
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        updated[index] = {
          ...updated[index],
          [parent]: { ...updated[index][parent], [child]: value }
        };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, followUps: updated };
    });
  };

  const [displayTemplate, setDisplayTemplate] = useState(null);

  const handleCustomScheduleChange = (value, unit, index) => {
    const msValue = handleTimeConversion(value, unit);
    handleVariableChange(index, 'delay.ms', msValue.toString());
  };

  const handleFindTemplate = (type, id) => {
    if (displayTemplate && displayTemplate.type === type && displayTemplate.template._id === id) {
      // If the template is already displayed, reset it to null
      setDisplayTemplate(null);
    } else {
      // Otherwise, find and set the template
      let template;
      if (type === 'email') template = formState.emailTemplate.find((template) => template._id === id);
      if (type === 'whatsapp') template = formState.whatsAppTemplate.find((template) => template._id === id);
      setDisplayTemplate({ type: type, template });
    }
  };

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
              <FormField
                label="Name"
                type="text"
                id="name"
                name="name"
                required
                placeholder="Name"
                onChange={(e) => {
                  setWebinarDetials((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={webinarDetials.name}
                errorMessage={errors.name}
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
          <div className="w-full flex flex-col gap-y-5">
            {webinarDetials.links?.map((item, index) => (
              <div key={index} className="flex flex-col border border-primary bg-grey p-4 rounded-xl ">
                <div className="flex justify-end items-center">
                  {webinarDetials.links.length > 1 && <IoCloseSharp className="cursor-pointer" onClick={() => removeLink(index)} />}
                </div>
                <DropDown
                  name="type"
                  label={'Select Type'}
                  SummaryChild={<h5 className="text-primary p-0 m-0">Type</h5>}
                  dropdownList={[
                    { id: 'zoom', showName: 'Zoom', name: 'zoom' },
                    { id: 'youtubeLive', showName: 'Youtube Live', name: 'youtubeLive' }
                  ]}
                  selected={item.type}
                  search={true}
                  commonFunction={(e) => handleDropdownChange(index, e)}
                />
                <FormField label="Link" type="url" id="link" name="link" placeholder="Link" onChange={(e) => handleInputChange(index, 'link', e.target.value)} value={item.link} />
                <FormField
                  label={'Limit'}
                  type="number"
                  id="limit"
                  name="limit"
                  min={1}
                  placeholder="Limit"
                  onChange={(e) => handleInputChange(index, 'limit', e.target.value)}
                  value={item.limit}
                />
              </div>
            ))}
            <div className="mt-5 flex justify-center">
              <button className="flex items-center justify-center w-full border border-primary rounded-xl p-2" onClick={handleAddLink}>
                + Add More Links
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Notification Settings</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            {webinarDetials.followUps?.map((item, index) => (
              <div key={index} className="flex flex-col border border-primary bg-grey p-4 rounded-xl mt-5">
                <div className="flex justify-end items-center">
                  <IoCloseSharp className="cursor-pointer" onClick={() => removeVariable(index)} />
                </div>

                <DropDown
                  name="when"
                  label="When to send follow-up"
                  SummaryChild={<h5 className="p-0 m-0 text-primary">When to send follow-up</h5>}
                  search={true}
                  dropdownList={[
                    { id: 'beforeEvent', name: 'beforeEvent', showName: 'Before Event' },
                    { id: 'afterEvent', name: 'afterEvent', showName: 'After Event' },
                    { id: 'instant', name: 'instant', showName: 'Instant' }
                  ]}
                  selected={item.when}
                  commonFunction={(e) => handleVariableChange(index, 'when', e.name)}
                />

                <DropDown
                  mt="mt-5"
                  name="type"
                  label="Participant Type"
                  SummaryChild={<h5 className="p-0 m-0 text-primary">Participant Type</h5>}
                  search={true}
                  dropdownList={[
                    { id: 'joined', name: 'joined', showName: 'Joined' },
                    { id: 'notJoined', name: 'notJoined', showName: 'Not Joined' },
                    { id: 'all', name: 'all', showName: 'All' }
                  ]}
                  selected={item.type}
                  commonFunction={(e) => handleVariableChange(index, 'type', e.name)}
                />

                <MultiSelectCheckbox
                  formLabel={'Channels Available'}
                  options={[
                    { _id: 'email', name: 'Email' },
                    { _id: 'sms', name: 'SMS' },
                    { _id: 'whatsapp', name: 'WhatsApp' }
                  ]}
                  label="Channels Available"
                  onChange={(selected) => handleVariableChange(index, 'channels', selected)}
                  selected={item.channels}
                />
                <DropDown
                  mt="mt-5"
                  name={'schedule'}
                  label={'Schedule Follow - Up'}
                  search={true}
                  dropdownList={[
                    { id: '10800000', name: '10800000', showName: '3 Hours' },
                    { id: '21600000', name: '21600000', showName: '6 Hours' },
                    { id: '43200000', name: '43200000', showName: '12 Hours' },
                    { id: '86400000', name: '86400000', showName: '24 Hours' },
                    { id: '172800000', name: '172800000', showName: '2 Days' },
                    { id: 'custom', name: 'custom', showName: 'Custom' }
                  ]}
                  commonFunction={(e) => {
                    if (e.name === 'custom') handleVariableChange(index, 'delay.custom', e.name);
                    else {
                      // Reset custom values when selecting a predefined time
                      handleVariableChange(index, 'delay.custom', '');
                      handleVariableChange(index, 'delay.value', '');
                      handleVariableChange(index, 'delay.unit', 'Days');
                      handleVariableChange(index, 'delay.ms', e.name);
                    }
                  }}
                  selected={item.delay.custom === 'custom' || item.delay.value ? 'custom' : item.delay.ms}
                  SummaryChild={<h5 className="p-0 m-0 text-primary">Custom</h5>}
                />

                {(item.delay.custom === 'custom' || item.delay.value) && (
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-primary mb-2">Custom Duration</label>
                    <div className="flex gap-2 items-center mt-1 rounded-xl border border-primary bg-inherit overflow-hidden">
                      <input
                        type="number"
                        min="0"
                        placeholder="Duration"
                        value={item.delay.value}
                        onChange={(e) => {
                          handleVariableChange(index, 'delay.value', e.target.value);
                          handleCustomScheduleChange(e.target.value, item.delay.unit, index);
                        }}
                        className="w-full border-0 focus:outline-none focus:ring-0 px-4 py-2.5 placeholder:text-secondary text-primary bg-transparent"
                      />
                      <select
                        value={item.delay.unit}
                        onChange={(e) => {
                          handleVariableChange(index, 'delay.unit', e.target.value);
                          handleCustomScheduleChange(item.delay.value, e.target.value, index);
                        }}
                        className="w-30 border-0 focus:outline-none focus:ring-0 py-2.5 bg-grey mr-2 text-primary  "
                      >
                        {['Days', 'Seconds', 'Hours', 'Weeks', 'Months', 'Years'].map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {item.channels.length > 0 && (
                  <div>
                    {item.channels.map((channel, channelIndex) => (
                      <div key={channelIndex} className="mt-5 relative">
                        {item[`${channel}Template`] && (
                          <button type="button" className="absolute  right-2" onClick={() => handleFindTemplate(channel, item[`${channel}Template`])}>
                            <FaEye size={20} />
                          </button>
                        )}
                        <DropDown
                          mt="mt-5"
                          name={`${channel}Template`}
                          label={`Select ${channel.charAt(0).toUpperCase() + channel.slice(1)} Template`}
                          dropdownList={
                            channel === 'email'
                              ? formState.emailTemplate.map((template) => ({ id: template._id, name: template._id, showName: template.name }))
                              : channel === 'sms'
                              ? [
                                  { id: 'sms1', name: 'sms1', showName: 'SMS Template 1' },
                                  { id: 'sms2', name: 'sms2', showName: 'SMS Template 2' }
                                ]
                              : formState.whatsAppTemplate.map((template) => ({ id: template._id, name: template._id, showName: template.name }))
                          }
                          commonFunction={(e) => {
                            handleVariableChange(index, `${channel}Template`, e.name);
                          }}
                          selected={item[`${channel}Template`]}
                          SummaryChild={<h5 className="p-0 m-0 text-primary">Select Template</h5>}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-5 flex justify-center">
              <button className="flex items-center justify-center w-full border border-primary rounded-xl p-2" onClick={addVariable}>
                + Add More Follow - Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
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
      </div> */}

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-4 border- border-primary">
          <FormButtons to="/webinar/webinar-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddWebinar;
