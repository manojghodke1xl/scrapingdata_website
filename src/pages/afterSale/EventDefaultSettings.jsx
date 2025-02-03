import { useState } from 'react';
import FormButtons from '../../atoms/formFields/FormButtons';
import useGlobalContext from '../../hooks/useGlobalContext';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import DropDown from '../../atoms/formFields/DropDown';

const EventDefaultSettings = () => {
  const { isLoading } = useGlobalContext();

  const [settings, setSettings] = useState([
    {
      channels: [],
      schedule: ''
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log('settings', settings);

  const handleVariableChange = (index, field, value) => {
    setSettings((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
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
            <div className="border  border-primary bg-grey p-4 rounded-xl">
              {settings.map((item, index) => (
                <>
                  <MultiSelectCheckbox
                    formLabel={'Channels Avaiable'}
                    options={[
                      { _id: 'Email', name: 'Email' },
                      { _id: 'SMS', name: 'SMS' },
                      { _id: 'WhatsApp', name: 'WhatsApp' }
                    ]}
                    label="Channels Avaiable"
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
                    commonFunction={(e) => handleVariableChange(index, 'schedule', e.name)}
                    selected={item.schedule}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">Custom</h5>}
                  />
                  <DropDown
                    mt="mt-5"
                    name={'schedule'}
                    label={'Schedule Follow - Up'}
                    search={true}
                    dropdownList={[{ showName: '7 Days', id: '604800000', name: '604800000' }]}
                    commonFunction={(e) => handleVariableChange(index, 'schedule', e.name)}
                    selected={item.schedule}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">Custom</h5>}
                  />
                </>
              ))}
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
