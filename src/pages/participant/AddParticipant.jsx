import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import DropDown from '../../atoms/formFields/DropDown';
import { getEventBySiteIdApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import { formatDateTime } from '../../utils/dateFormats';
import PhoneInputField from '../../atoms/formFields/PhoneInputField';
import { addParticipantApi } from '../../apis/participant-apis';
import { getPackageByEventIdApi } from '../../apis/package-apis';

const AddParticipant = () => {
  const navigate = useNavigate();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();

  const [errors, setErrors] = useState({});

  const [formState, setFormState] = useState({
    events: [],
    package: [],
    currency: []
  });

  const [isScrollable, setIsScrollable] = useState(false);
  const [participantDetails, setParticipantDetails] = useState({
    code: '',
    event: '',
    package: '',
    currency: '',
    userDetails: {
      name: '',
      email: '',
      phoneCode: '',
      phoneNumber: '',
      attendee: 1
    }
  });

  const validate = () => {
    const errors = {};
    if (!participantDetails.site) {
      errors.site = 'Please select site first before proceeding';
      errors.event = 'Please select site first';
    }

    if (!participantDetails.event) {
      errors.package = 'Please select event first';
      if (participantDetails.site) errors.event = 'Event is required';
    }

    if (participantDetails.event && !participantDetails.package) errors.package = 'Package is required';
    if (!participantDetails.currency) errors.currency = 'Currency is required';
    if (!participantDetails.userDetails.name) errors.name = 'Name is required';
    if (!participantDetails.userDetails.email) errors.email = 'Email is required';
    if (!participantDetails.userDetails.phoneNumber) errors.phoneNumber = 'Phone number is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = addParticipantApi(participantDetails);
      if (status) {
        showNotification('success', data.message);
        navigate('/participant/participant-list');
      } else showNotification('warn', data.message);
    } catch (error) {
      showNotification('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value, countryData) => {
    const numericValue = value.replace(/\D/g, '');
    const mobile = numericValue.slice(countryData.dialCode.length);
    setParticipantDetails((prev) => ({ ...prev, userDetails: { ...prev.userDetails, phoneCode: countryData.dialCode, phoneNumber: mobile } }));
  };

  useEffect(() => {
    if (participantDetails.site) {
      (async () => {
        const { status, data } = await getEventBySiteIdApi(participantDetails.site);
        if (status) setFormState((prev) => ({ ...prev, events: data.events }));
        else showNotification('error', data.message);
      })();
    }
  }, [participantDetails.site]);

  useEffect(() => {
    if (participantDetails.event) {
      (async () => {
        const { status, data } = await getPackageByEventIdApi(participantDetails.event);
        if (status) setFormState((prev) => ({ ...prev, package: data.packages }));
        else showNotification('error', data.message);
      })().catch((error) => showNotification('error', error.message));
    }
  }, [participantDetails.event]);

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
    const validCurrency = formState.package.find((p) => p._id === participantDetails.package)?.currencyNotes || {};
    const filteredCurrencies = Object.keys(validCurrency).filter((key) => validCurrency[key]);
    if (filteredCurrencies.length === 1) setParticipantDetails((prev) => ({ ...prev, currency: filteredCurrencies[0] }));
    else setFormState((prev) => ({ ...prev, currency: filteredCurrencies }));
  }, [formState.package, participantDetails.package]);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{'Add'} Participant</span>
        </div>
        <FormButtons to="/participants/participant-list" type="submit" onClick={handleSubmit} btnLebal={'Save Changes'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Site Association</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-5">
              <DropDown
                name="site"
                dropdownList={availableSites?.map((site) => ({ name: site._id, showName: site.name, id: site._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Select Site</h5>}
                search={true}
                selected={participantDetails.site}
                commonFunction={(e) => {
                  setParticipantDetails((prev) => ({ ...prev, site: e.name }));
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
            <span className=" text-primary ">Event Association</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-5">
              <DropDown
                name="event"
                dropdownList={formState.events?.map((event) => ({ name: event._id, showName: `${event.name} (${formatDateTime(event.date)})`, id: event._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Select Event</h5>}
                search={true}
                selected={participantDetails.event}
                commonFunction={(e) => {
                  setParticipantDetails((prev) => ({ ...prev, event: e.name }));
                  if (errors.event) setErrors((prev) => ({ ...prev, event: '' }));
                }}
                error={errors.event}
              />

              <DropDown
                name={'Package'}
                dropdownList={formState.package.map((p) => ({ name: p._id, showName: p.title, id: p._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary"> Select Package</h5>}
                search={true}
                selected={participantDetails.package}
                commonFunction={(e) => {
                  setParticipantDetails((prev) => ({ ...prev, package: e.name }));
                  if (errors.package) setErrors((prev) => ({ ...prev, package: '' }));
                }}
                error={errors.package}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Customer Details</span>
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
                  setParticipantDetails((prev) => ({ ...prev, userDetails: { ...prev.userDetails, name: e.target.value } }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={participantDetails.userDetails.name}
                errorMessage={errors.name}
              />
              <FormField
                label="Email ID"
                type="email"
                id="email"
                name="email"
                placeholder="Email ID"
                onChange={(e) => {
                  setParticipantDetails((prev) => ({ ...prev, userDetails: { ...prev.userDetails, email: e.target.value } }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                value={participantDetails.userDetails.email}
                errorMessage={errors.email}
              />
              <PhoneInputField
                label="Mobile Number"
                placeholder="Mobile number"
                name="phoneNumber"
                phoneError={errors.phoneNumber}
                handlePhoneChange={(value, countryData) => handlePhoneChange(value, countryData)}
                value={`+${participantDetails.phoneCode}${participantDetails.phoneNumber}`}
              />
              <FormField
                label="No of Attendee"
                type="number"
                id="attendee"
                name="attendee"
                placeholder="No of Attendee"
                min={1}
                onChange={(e) => {
                  setParticipantDetails((prev) => ({ ...prev, userDetails: { ...prev.userDetails, attendee: e.target.value } }));
                  if (errors.attendee) setErrors((prev) => ({ ...prev, attendee: '' }));
                }}
                value={participantDetails.userDetails.attendee}
                errorMessage={errors.attendee}
              />
              {formState.currency && (
                <DropDown
                  name={'currency'}
                  dropdownList={formState.currency.map((currency) => ({ name: currency, showName: currency, id: currency }))}
                  SummaryChild={<h5 className="p-0 m-0 text-primary">{participantDetails.currency || 'Select Currency'} </h5>}
                  selected={participantDetails.currency}
                  commonFunction={(e) => {
                    setParticipantDetails((prev) => ({ ...prev, currency: e.name }));
                    if (errors.currency) setErrors((prev) => ({ ...prev, currency: '' }));
                  }}
                  error={errors.currency}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/participants/participant-list" type="submit" onClick={handleSubmit} btnLebal={'Save Changes'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddParticipant;
