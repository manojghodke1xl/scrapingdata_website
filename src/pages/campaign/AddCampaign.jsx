import { useEffect, useState } from 'react';
import FormButtons from '../../atoms/formFields/FormButtons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import DropDown from '../../atoms/formFields/DropDown';
import { showNotification } from '../../utils/showNotification';
import { IoCloseSharp } from 'react-icons/io5';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import { getAfterSaleTemplateApi } from '../../apis/after-sale-apis';
import CommonModal from '../../atoms/modal/CommonModal';
import { FaEye } from 'react-icons/fa';
import EmailPreview from '../../atoms/templatePreview/EmailPreview';
import WhatsAppPreview from '../../atoms/templatePreview/WhatsAppPreview';
import { MdEdit } from 'react-icons/md';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { handleTimeConversion } from '../../constants/comon';
import { getEventBySiteIdApi } from '../../apis/event-apis';
import { getProductsBySiteApi } from '../../apis/product-apis';
import { addCampaignApi, getCampaignByIdApi, getExistingCampaignsApi, updateCampaignApi } from '../../apis/campaign-apis';
import { getContactApi } from '../../apis/contact-apis';

const AddCampaign = () => {
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

  const [campaignDetails, setCampaignDetails] = useState({
    site: '',
    contacts: [],
    campaigns: [
      {
        channels: [],
        emailTemplate: null,
        smsTemplate: null,
        whatsappTemplate: null,
        isSendInstantly: true,
        delay: { unit: 'Seconds', value: '', ms: '' }
      }
    ]
  });

  const [formState, setFormState] = useState({
    list: [],
    emailTemplate: [],
    whatsAppTemplate: []
  });

  const [existingCampaign, setExistingCampaign] = useState({
    modelOpen: false,
    campaignId: ''
  });

  const [displayTemplate, setDisplayTemplate] = useState(null);

  const [allContacts, setAllContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      const { status, data } = await getContactApi();
      if (status) setAllContacts(data?.contacts);
      else showNotification('error', data);
    };
    if (campaignDetails.site) getContacts();
  }, [campaignDetails.site]);

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

    if (campaignDetails.target === 'Event') fetchData(getEventBySiteIdApi, campaignDetails.site, 'events');
    else if (campaignDetails.target === 'Product') fetchData(getProductsBySiteApi, campaignDetails.site, 'products');
  }, [campaignDetails.site, campaignDetails.target, setLoading]);

  useEffect(() => {
    if (campaignDetails.site) {
      (async () => {
        const { status, data } = await getAfterSaleTemplateApi({ site: campaignDetails.site });
        if (status) setFormState((prev) => ({ ...prev, emailTemplate: data.emailTemplates, whatsAppTemplate: data.waTemplates }));
        else showNotification('error', data);
      })();
    }
  }, [campaignDetails.site]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getCampaignByIdApi(id);
        if (status) {
          const { site, ...rest } = data.campaign;
          setCampaignDetails((prev) => ({
            ...prev,
            ...rest,
            site: site._id,
            siteData: site
          }));
        } else showNotification('error', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  useEffect(() => {
    if (!id && !isDuplicate && campaignDetails.site) {
      (async () => {
        const { status, data } = await getExistingCampaignsApi(campaignDetails.site);
        if (status) if (data.campaign) setExistingCampaign((prev) => ({ ...prev, modelOpen: true, campaignId: data.campaign._id }));
      })();
    }
  }, [campaignDetails.site, id, isDuplicate]);

  const validate = () => {
    const newErrors = {};
    if (!campaignDetails.site) newErrors.site = 'Site is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addCampaignApi(campaignDetails) : updateCampaignApi(id, campaignDetails)) : addCampaignApi(campaignDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/campaign/campaign-list');
      } else showNotification('error', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomScheduleChange = (value, unit, index) => {
    const msValue = handleTimeConversion(value, unit);
    handleVariableChange(index, 'delay.ms', msValue.toString());
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
    setCampaignDetails((prev) => {
      const updated = [...prev.campaigns];

      if (field === 'channels') {
        const prevChannels = updated[index].channels;
        const removedChannels = prevChannels.filter((channel) => !value.includes(channel));
        const newCampaign = { ...updated[index], channels: value };

        removedChannels.forEach((channel) => {
          if (channel === 'email') newCampaign.emailTemplate = null;
          if (channel === 'sms') newCampaign.smsTemplate = null;
          if (channel === 'whatsapp') newCampaign.whatsappTemplate = null;
        });

        updated[index] = newCampaign;
      } else if (field.includes('.')) {
        const [parent, child] = field.split('.');
        updated[index] = {
          ...updated[index],
          [parent]: { ...updated[index][parent], [child]: value }
        };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }

      return { ...prev, campaigns: updated };
    });
  };

  const removeVariable = (index) => {
    if (campaignDetails.campaigns.length === 1) return;
    setCampaignDetails((prev) => ({
      ...prev,
      campaigns: prev.campaigns.filter((_, i) => i !== index)
    }));
  };
  const addVariable = () => {
    setCampaignDetails((prev) => ({
      ...prev,
      campaigns: [...prev.campaigns, { channels: [], isSendInstantly: true, delay: { unit: 'Days', value: '', custom: '', ms: '' } }]
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

  const handleRedirectEdit = (channel, index) => {
    const template = formState.emailTemplate.find((template) => template._id === campaignDetails.campaigns[index].emailTemplate);
    if (template) navigate(`/templates/edit-email-template/${template._id}`);
  };

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark"> {id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Campaign </span>
        </div>
        <FormButtons to="/campaign/campaign-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Site Details</span>
          </div>
          <div className="w-full">
            {id && !isDuplicate ? (
              <h1 className="text-xl flex items-center justify-between gap-2 font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-primary">Site:</span>
                  <span className="text-primary font-semibold">{`${campaignDetails?.siteData?.name} ( ${campaignDetails?.siteData?.host} )`}</span>
                </div>
              </h1>
            ) : (
              <DropDown
                name="sites"
                label={'Select Site'}
                dropdownList={availableSites?.map((site) => ({ name: site._id, showName: `${site.name} (${site.host})`, id: site._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Sites</h5>}
                search={true}
                selected={campaignDetails.site}
                commonFunction={(e) => {
                  setCampaignDetails((prev) => ({ ...prev, site: e.name }));
                  if (errors.site) setErrors((prev) => ({ ...prev, site: '' }));
                }}
                error={errors.site}
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Contacts</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <MultiSelectCheckbox
              options={allContacts.map((contact) => ({ name: contact.name, _id: contact._id }))}
              formLabel={'Select Contacts'}
              label={'Select Contacts'}
              onChange={(e) => setCampaignDetails((prev) => ({ ...prev, contacts: e }))}
              selected={campaignDetails.contacts}
            />
          </div>
        </div>
      </div>

      <div className="w-full  justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full  flex flex-col gap-y-2 md:flex-row gap-4 justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary">Follow - up</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            {campaignDetails.campaigns.map((item, index) => (
              <div key={index} className="flex flex-col border border-primary bg-grey p-4 rounded-xl gap-y-5">
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
                  onChange={(selected) => {
                    handleVariableChange(index, 'channels', selected);
                  }}
                  selected={item.channels}
                />

                {item.channels.length > 0 && (
                  <div>
                    {item.channels.map((channel, channelIndex) => (
                      <div key={channelIndex} className="relative">
                        {item[`${channel}Template`] && (
                          <div className="absolute flex items-center justify-center gap-3 right-2">
                            <button onClick={() => handleRedirectEdit(channel, index)} className="hover:bg-hover" type="button">
                              {channel === 'email' && <MdEdit size={20} />}
                            </button>
                            <button type="button" onClick={() => handleFindTemplate(channel, item[`${channel}Template`])}>
                              <FaEye size={20} />
                            </button>
                          </div>
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

                <ToggleComponent
                  label={'Send Instantly?'}
                  tooltipContent="Toggle to send the campaign instantly without any delay"
                  isEnableState={item.isSendInstantly}
                  setIsEnableState={(value) => handleVariableChange(index, 'isSendInstantly', value)}
                />
                {console.log('item.delay', item.delay)}
                {!item.isSendInstantly && (
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Custom Duration</label>
                    <div className="flex gap-2 items-center mt-1 rounded-xl border border-primary bg-inherit overflow-hidden">
                      <input
                        type="number"
                        min="0"
                        placeholder="Duration"
                        value={item?.delay?.value}
                        onChange={(e) => {
                          handleVariableChange(index, 'delay.value', e.target.value);
                          handleCustomScheduleChange(e.target.value, item.delay.unit, index);
                        }}
                        className="w-full border-0 focus:outline-none focus:ring-0 px-4 py-2.5 placeholder:text-secondary text-primary bg-transparent"
                      />
                      <select
                        value={item?.delay?.unit}
                        onChange={(e) => {
                          handleVariableChange(index, 'delay.unit', e.target.value);
                          handleCustomScheduleChange(item.delay.value, e.target.value, index);
                        }}
                        className="w-30 border-0 focus:outline-none focus:ring-0 py-2.5 bg-grey mr-2 text-primary  "
                      >
                        {['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years'].map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-center">
              <button className="flex items-center justify-center w-full border border-primary rounded-xl p-2" onClick={addVariable}>
                + Add More Follow - Up
              </button>
            </div>
          </div>
          <div className="w-full">
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

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/reminder/reminder-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}

      <CommonModal
        isModalVisible={existingCampaign.modelOpen}
        onConfirm={() => navigate(`/campaign/edit-campaign/${existingCampaign.campaignId}`)}
        onCancel={() => navigate(`/campaign/campaign-list`)}
        setModalVisibility={() => setExistingCampaign({ ...existingCampaign, modelOpen: false })}
        label={'Existing Campaign Present'}
        message={'You cannot create two same Campaign. Please edit the previous one instead. Click Confirm to proceed.'}
      />
    </div>
  );
};

export default AddCampaign;
