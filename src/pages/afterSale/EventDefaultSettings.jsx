import { useState } from 'react';
import FormButtons from '../../atoms/formFields/FormButtons';
import useGlobalContext from '../../hooks/useGlobalContext';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import DropDown from '../../atoms/formFields/DropDown';
import { showNotification } from '../../utils/showNotification';
import { addAfterSaleApi, getAfterSaleTemplateApi } from '../../apis/after-sale-apis';
import { IoCloseSharp } from 'react-icons/io5';
import { handleTimeConversion } from '../../constants/comon';

const EventDefaultSettings = () => {
  const { isLoading, setLoading } = useGlobalContext();

  const [settings, setSettings] = useState([
    {
      channels: [],
      emailTemplate: '',
      smsTemplate: '',
      whatsappTemplate: '',
      delay: { unit: 'Days', value: '', custom: '', ms: '' }
    }
  ]);
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [whatsappTemplate, setWhatsappTemplate] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const { status, data } = await getAfterSaleTemplateApi({ site: '', event: '', type: 'event' });
  //     if (status) {
  //       setEmailTemplate(data.emailTemplates);
  //       setWhatsappTemplate(data.waTemplates);
  //     } else showNotification('error', data);
  //   })();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { status, data } = addAfterSaleApi({ followUps: settings });
      if (status) {
        showNotification('success', data.message);
      } else showNotification('error', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVariableChange = (index, field, value) => {
    setSettings((prev) => {
      const updated = [...prev];
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        updated[index] = {
          ...updated[index],
          [parent]: { ...updated[index][parent], [child]: value }
        };
      } else updated[index] = { ...updated[index], [field]: value };

      return updated;
    });
  };

  const handleCustomScheduleChange = (value, unit, index) => {
    const msValue = handleTimeConversion(value, unit);
    handleVariableChange(index, 'delay.ms', msValue.toString());
  };

  const removeVariable = (index) => {
    if (settings.length === 1) return;
    setSettings((prev) => prev.filter((_, i) => i !== index));
  };
  const addVariable = () => {
    setSettings((prev) => [...prev, { channels: [], delay: { unit: 'Days', value: '', custom: '', ms: '' } }]);
  };
  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark"> Event Default Settings</span>
        </div>
        <FormButtons to="" type="submit" onClick={handleSubmit} btnLebal={'Save Changes'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Follow - up</span>
          </div>
          <div className="w-full">
            {settings.map((item, index) => (
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
                  selected={item.delay.custom === 'custom' ? 'custom' : item.delay.ms}
                  SummaryChild={<h5 className="p-0 m-0 text-primary">Custom</h5>}
                />

                {item.delay.custom === 'custom' && (
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-primary mb-2">Custom Duration</label>
                    <div className="flex gap-2 items-center mt-1 rounded-xl border border-primary bg-white overflow-hidden">
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
                        className="w-30 border-0 focus:outline-none focus:ring-0 py-2.5 bg-white mr-2 text-dark font-medium"
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
                      <div key={channelIndex} className="mt-5">
                        <DropDown
                          mt="mt-5"
                          name={`${channel}Template`}
                          label={`Select ${channel.charAt(0).toUpperCase() + channel.slice(1)} Template`}
                          dropdownList={
                            channel === 'email'
                              ? emailTemplate.map((template) => ({ id: template._id, name: template._id, showName: template.name }))
                              : channel === 'sms'
                              ? [
                                  { id: 'sms1', name: 'sms1', showName: 'SMS Template 1' },
                                  { id: 'sms2', name: 'sms2', showName: 'SMS Template 2' }
                                ]
                              : whatsappTemplate.map((template) => ({ id: template._id, name: template._id, showName: template.name }))
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

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editFaqCategoryNote : addFaqCategoryNote} />
      </div> */}
    </div>
  );
};

export default EventDefaultSettings;
