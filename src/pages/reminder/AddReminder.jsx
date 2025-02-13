import { useEffect, useState } from 'react';
import FormButtons from '../../atoms/formFields/FormButtons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import DropDown from '../../atoms/formFields/DropDown';
import { getEventBySiteIdApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import { getProductsBySiteApi } from '../../apis/product-apis';
import { IoCloseSharp } from 'react-icons/io5';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import { getAfterSaleTemplateApi } from '../../apis/after-sale-apis';
import CommonModal from '../../atoms/modal/CommonModal';
import { addReminderApi, getExistingReminderApi, getReminderByIdApi, updateReminderApi } from '../../apis/reminder-apis';
import { formatDateTime } from '../../utils/dateFormats';
import { FaEye } from 'react-icons/fa';
import EmailPreview from '../../atoms/templatePreview/EmailPreview';
import WhatsAppPreview from '../../atoms/templatePreview/WhatsAppPreview';

const AddReminder = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();

  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [reminderDetails, setReminderDetails] = useState({
    site: '',
    target: '',
    refTo: undefined,
    reminders: [
      {
        channels: [],
        when: 'beforeEvent',
        emailTemplate: null,
        smsTemplate: null,
        whatsappTemplate: null,
        delay: { unit: 'Days', value: '', custom: '', ms: '' }
      }
    ]
  });

  const [formState, setFormState] = useState({
    list: [],
    emailTemplate: [],
    whatsAppTemplate: []
  });

  const [existingReminder, setExistingReminder] = useState({
    modelOpen: false,
    reminderId: ''
  });
  const [displayTemplate, setDisplayTemplate] = useState(null);

  useEffect(() => {
    const fetchData = async (apiFunction, site, key) => {
      setLoading(true);
      try {
        const { status, data } = await apiFunction(site);
        if (status) setFormState((prev) => ({ ...prev, list: data[key] }));
        else showNotification('error', data);
      } catch (error) {
        showNotification('error', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (reminderDetails.target === 'Event') fetchData(getEventBySiteIdApi, reminderDetails.site, 'events');
    else if (reminderDetails.target === 'Product') fetchData(getProductsBySiteApi, reminderDetails.site, 'products');
  }, [reminderDetails.site, reminderDetails.target, setLoading]);

  useEffect(() => {
    if (reminderDetails.site && reminderDetails.refTo) {
      (async () => {
        const { status, data } = await getAfterSaleTemplateApi({ site: reminderDetails.site, event: reminderDetails.refTo });
        if (status) setFormState((prev) => ({ ...prev, emailTemplate: data.emailTemplates, whatsAppTemplate: data.waTemplates }));
        else showNotification('error', data);
      })();
    }
  }, [reminderDetails.refTo, reminderDetails.site]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getReminderByIdApi(id);
        if (status) {
          const { site, refTo, ...rest } = data.reminder;
          setReminderDetails((prev) => ({
            ...prev,
            ...rest,
            site: site._id,
            siteData: site,
            refTo: refTo._id,
            refToData: refTo
          }));
        } else showNotification('error', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  useEffect(() => {
    if (!id && !isDuplicate && reminderDetails.site && reminderDetails.refTo) {
      (async () => {
        const { status, data } = await getExistingReminderApi(reminderDetails.site, reminderDetails.refTo);
        if (status) if (data.reminder) setExistingReminder((prev) => ({ ...prev, modelOpen: true, reminderId: data.reminder._id }));
      })();
    }
  }, [reminderDetails.site, reminderDetails.refTo, id, isDuplicate]);

  const validate = () => {
    const newErrors = {};
    if (!reminderDetails.site) newErrors.site = 'Site is required';
    if (!reminderDetails.target) newErrors.target = 'Target is required';
    if (reminderDetails.target === 'Event' && !reminderDetails.refTo) newErrors.refTo = 'Event is required';
    if (reminderDetails.target === 'Product' && !reminderDetails.refTo) newErrors.refTo = 'Product is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addReminderApi(reminderDetails) : updateReminderApi(id, reminderDetails)) : addReminderApi(reminderDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/reminder/reminder-list');
      } else showNotification('error', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
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

  const handleVariableChange = (index, field, value) => {
    setReminderDetails((prev) => {
      const updated = [...prev.reminders];
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        updated[index] = {
          ...updated[index],
          [parent]: { ...updated[index][parent], [child]: value }
        };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return { ...prev, reminders: updated };
    });
  };

  const handleTimeConversion = (value, unit) => {
    const msConversions = {
      Seconds: 1000,
      Minutes: 60 * 1000,
      Hours: 60 * 60 * 1000,
      Days: 24 * 60 * 60 * 1000,
      Weeks: 7 * 24 * 60 * 60 * 1000,
      Months: 30 * 24 * 60 * 60 * 1000,
      Years: 365 * 24 * 60 * 60 * 1000
    };
    return value * msConversions[unit];
  };

  const handleCustomScheduleChange = (value, unit, index) => {
    const msValue = handleTimeConversion(value, unit);
    handleVariableChange(index, 'delay.ms', msValue.toString());
  };

  const removeVariable = (index) => {
    if (reminderDetails.reminders.length === 1) return;
    setReminderDetails((prev) => ({
      ...prev,
      reminders: prev.reminders.filter((_, i) => i !== index)
    }));
  };
  const addVariable = () => {
    setReminderDetails((prev) => ({
      ...prev,
      reminders: [...prev.reminders, { channels: [], delay: { unit: 'Days', value: '', custom: '', ms: '' } }]
    }));
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
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Reminder </span>
        </div>
        <FormButtons to="/reminder/reminder-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Site Details</span>
          </div>
          <div className="w-full">
            <div>
              {id && !isDuplicate ? (
                <h1 className="text-xl flex items-center justify-between gap-2 font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">Site:</span>
                    <span className="text-primary font-semibold">{`${reminderDetails?.siteData?.name} ( ${reminderDetails?.siteData?.host} )`}</span>
                  </div>
                </h1>
              ) : (
                <DropDown
                  name="sites"
                  dropdownList={availableSites?.map((site) => ({ name: site._id, showName: `${site.name} (${site.host})`, id: site._id }))}
                  SummaryChild={<h5 className="p-0 m-0 text-primary">Sites</h5>}
                  search={true}
                  selected={reminderDetails.site}
                  commonFunction={(e) => {
                    setReminderDetails((prev) => ({ ...prev, site: e.name }));
                    if (errors.site) setErrors((prev) => ({ ...prev, site: '' }));
                  }}
                  error={errors.site}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Target</span>
          </div>
          <div className="w-full">
            <div>
              {id && !isDuplicate ? (
                <h1 className="text-xl flex items-center gap-2 font-bold ">
                  <span className="text-primary">
                    {reminderDetails?.target}: &nbsp; {reminderDetails?.refToData?.name}
                  </span>
                </h1>
              ) : (
                <>
                  <DropDown
                    name="Events"
                    dropdownList={[
                      { id: 'Event', name: 'Event', showName: 'Event' },
                      { id: 'Product', name: 'Product', showName: 'Product' },
                      { id: 'Service', name: 'Service', showName: 'Service' }
                    ]}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">Target</h5>}
                    search={true}
                    selected={reminderDetails.target}
                    commonFunction={(e) => {
                      setReminderDetails((prev) => ({ ...prev, target: e.name, refTo: undefined }));
                      setFormState((prev) => ({ ...prev, list: [] }));
                      if (errors.target) setErrors((prev) => ({ ...prev, target: '' }));
                    }}
                    error={errors.target}
                  />

                  <DropDown
                    mt="mt-5"
                    name="refTo"
                    dropdownList={
                      reminderDetails.target === 'Event'
                        ? formState.list?.map((event) => ({ name: event._id, showName: `${event.name} (${formatDateTime(event.date)})`, id: event._id }))
                        : formState.list?.map((product) => ({ name: product._id, showName: product.name, id: product._id }))
                    }
                    SummaryChild={<h5 className="p-0 m-0 text-primary">Select {reminderDetails.target}</h5>}
                    search={true}
                    selected={reminderDetails.refTo}
                    commonFunction={(e) => {
                      setReminderDetails((prev) => ({ ...prev, refTo: e.name }));
                      if (errors.refTo) setErrors((prev) => ({ ...prev, refTo: '' }));
                    }}
                    error={errors.target}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full  flex flex-col gap-y-2 md:flex-row gap-4 justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Follow - up</span>
          </div>
          <div className="w-full">
            {reminderDetails.reminders.map((item, index) => (
              <div key={index} className="flex flex-col border border-primary bg-grey p-4 rounded-xl mt-5">
                <div className="flex justify-end items-center">
                  <IoCloseSharp className="cursor-pointer" onClick={() => removeVariable(index)} />
                </div>
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

                <DropDown
                  mt="mt-5"
                  name={'when'}
                  label={'When to send follow - up'}
                  SummaryChild={<h5 className="p-0 m-0 text-primary">When to send follow - up</h5>}
                  search={true}
                  dropdownList={[
                    { id: 'beforeEvent', name: 'beforeEvent', showName: 'Before Event' },
                    { id: 'afterEvent', name: 'afterEvent', showName: 'After Event' }
                  ]}
                  selected={item.when}
                  commonFunction={(e) => handleVariableChange(index, 'when', e.name)}
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
          <div className="w-full ">
            {displayTemplate?.type === 'email' ? (
              <EmailPreview emailTemplate={displayTemplate?.template} />
            ) : displayTemplate?.type === 'whatsapp' ? (
              <WhatsAppPreview message={displayTemplate?.template.message} placeholders={displayTemplate?.template.placeholders} />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editFaqCategoryNote : addFaqCategoryNote} />
      </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/reminder/reminder-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}

      <CommonModal
        isModalVisible={existingReminder.modelOpen}
        onConfirm={() => navigate(`/reminder/edit-reminder/${existingReminder.reminderId}`)}
        onCancel={() => navigate(`/reminder/reminder-list`)}
        setModalVisibility={() => setExistingReminder({ ...existingReminder, modelOpen: false })}
        label={'Existing Reminder Present'}
        message={'You cannot create two same Reminder. Please edit the previous one instead. Click Confirm to proceed.'}
      />
    </div>
  );
};

export default AddReminder;
