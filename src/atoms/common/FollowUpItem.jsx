import { IoCloseSharp } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';
import DropDown from '../formFields/DropDown';
import MultiSelectCheckbox from '../formFields/MultiSelectCheckBox';

const FollowUpItem = ({ item, index, removeVariable, handleVariableChange, handleCustomScheduleChange, handleFindTemplate, formState }) => {
  return (
    <div className="flex flex-col border border-primary bg-grey p-4 rounded-xl mt-5">
      <div className="flex justify-end items-center">
        <IoCloseSharp className="cursor-pointer" onClick={() => removeVariable(index)} />
      </div>

      <DropDown
        name="when"
        label="When to send follow-up"
        SummaryChild={<h5 className="p-0 m-0 text-primary">When to send follow - up</h5>}
        search={true}
        dropdownList={[
          { id: 'beforeEvent', name: 'beforeEvent', showName: 'Before Event' },
          { id: 'afterEvent', name: 'afterEvent', showName: 'After Event' },
          { id: 'instant', name: 'instant', showName: 'Instant' }
        ]}
        selected={item.when}
        commonFunction={(e) => handleVariableChange(index, 'when', e.name)}
      />

      <MultiSelectCheckbox
        divClassName={'mt-5'}
        formLabel="Channels Available"
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
        name="schedule"
        label="Schedule Follow - Up"
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
              className="w-30 border-0 focus:outline-none focus:ring-0 py-2.5 bg-grey mr-2 text-primary"
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

      <DropDown
        mt="mt-5"
        name="when"
        label="Participant Type"
        SummaryChild={<h5 className="p-0 m-0 text-primary">When to send follow - up</h5>}
        search={true}
        dropdownList={[
          { id: 'joined', name: 'joined', showName: 'Joined' },
          { id: 'notJoined', name: 'notJoined', showName: 'Not Joined' },
          { id: 'all', name: 'all', showName: 'All' }
        ]}
        selected={item.when}
        commonFunction={(e) => handleVariableChange(index, 'when', e.name)}
      />

      {item.channels.length > 0 && (
        <div>
          {item.channels.map((channel, channelIndex) => (
            <div key={channelIndex} className="mt-5 relative">
              {item[`${channel}Template`] && (
                <button type="button" className="absolute right-2" onClick={() => handleFindTemplate(channel, item[`${channel}Template`])}>
                  <FaEye size={20} />
                </button>
              )}
              <DropDown
                mt="mt-5"
                name={`${channel}Template`}
                label={`Select ${channel.charAt(0).toUpperCase() + channel.slice(1)} Template`}
                dropdownList={
                  channel === 'email'
                    ? formState.emailTemplate.map((template) => ({
                        id: template._id,
                        name: template._id,
                        showName: template.name
                      }))
                    : channel === 'sms'
                    ? [
                        { id: 'sms1', name: 'sms1', showName: 'SMS Template 1' },
                        { id: 'sms2', name: 'sms2', showName: 'SMS Template 2' }
                      ]
                    : formState.whatsAppTemplate.map((template) => ({
                        id: template._id,
                        name: template._id,
                        showName: template.name
                      }))
                }
                commonFunction={(e) => handleVariableChange(index, `${channel}Template`, e.name)}
                selected={item[`${channel}Template`]}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Select Template</h5>}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowUpItem;
