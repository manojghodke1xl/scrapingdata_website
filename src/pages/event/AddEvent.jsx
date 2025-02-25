import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import DateTimePicker from '../../atoms/formFields/DateTimePicker';
import { adjustDateForTimezone, formatDateTime } from '../../utils/dateFormats';
import DropDown from '../../atoms/formFields/DropDown';
import { showNotification } from '../../utils/showNotification';
import { addEventApi, getEventByIdApi, updateEventApi } from '../../apis/event-apis';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { MdDeleteForever } from 'react-icons/md';

var tzInts = [
  { name: '(GMT-12:00) International Date Line West', value: '-12' },
  { name: '(GMT-11:00) Midway Island, Samoa', value: '-11' },
  { name: '(GMT-10:00) Hawaii', value: '-10' },
  { name: '(GMT-09:00) Alaska', value: '-9' },
  { name: '(GMT-08:00) Pacific Time (US & Canada)', value: '-8' },
  { name: '(GMT-08:00) Tijuana, Baja California', value: '-8' },
  { name: '(GMT-07:00) Arizona', value: '-7' },
  { name: '(GMT-07:00) Chihuahua, La Paz, Mazatlan', value: '-7' },
  { name: '(GMT-07:00) Mountain Time (US & Canada)', value: '-7' },
  { name: '(GMT-06:00) Central America', value: '-6' },
  { name: '(GMT-06:00) Central Time (US & Canada)', value: '-6' },
  { name: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco', value: '-5' },
  { name: '(GMT-05:00) Eastern Time (US & Canada)', value: '-5' },
  { name: '(GMT-05:00) Indiana (East)', value: '-5' },
  { name: '(GMT-04:00) Atlantic Time (Canada)', value: '-4' },
  { name: '(GMT-04:00) Caracas, La Paz', value: '-4' },
  { name: '(GMT-04:00) Manaus', value: '-4' },
  { name: '(GMT-04:00) Santiago', value: '-4' },
  { name: '(GMT-03:30) Newfoundland', value: '-3.5' },
  { name: '(GMT-03:00) Brasilia', value: '-3' },
  { name: '(GMT-03:00) Buenos Aires, Georgetown', value: '-3' },
  { name: '(GMT-03:00) Greenland', value: '-3' },
  { name: '(GMT-03:00) Montevideo', value: '-3' },
  { name: '(GMT-02:00) Mid-Atlantic', value: '-2' },
  { name: '(GMT-01:00) Cape Verde Is.', value: '-1' },
  { name: '(GMT-01:00) Azores', value: '-1' },
  { name: '(GMT+00:00) Casablanca, Monrovia, Reykjavik', value: '0' },
  { name: '(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London', value: '0' },
  { name: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna', value: '1' },
  { name: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague', value: '1' },
  { name: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris', value: '1' },
  { name: '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb', value: '1' },
  { name: '(GMT+01:00) West Central Africa', value: '1' },
  { name: '(GMT+02:00) Amman', value: '2' },
  { name: '(GMT+02:00) Athens, Bucharest, Istanbul', value: '2' },
  { name: '(GMT+02:00) Beirut', value: '2' },
  { name: '(GMT+02:00) Cairo', value: '2' },
  { name: '(GMT+02:00) Harare, Pretoria', value: '2' },
  { name: '(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius', value: '2' },
  { name: '(GMT+02:00) Jerusalem', value: '2' },
  { name: '(GMT+02:00) Minsk', value: '2' },
  { name: '(GMT+02:00) Windhoek', value: '2' },
  { name: '(GMT+03:00) Kuwait, Riyadh, Baghdad', value: '3' },
  { name: '(GMT+03:00) Moscow, St. Petersburg, Volgograd', value: '3' },
  { name: '(GMT+03:00) Nairobi', value: '3' },
  { name: '(GMT+03:00) Tbilisi', value: '3' },
  { name: '(GMT+03:30) Tehran', value: '3.5' },
  { name: '(GMT+04:00) Abu Dhabi, Muscat', value: '4' },
  { name: '(GMT+04:00) Baku', value: '4' },
  { name: '(GMT+04:00) Yerevan', value: '4' },
  { name: '(GMT+04:30) Kabul', value: '4.5' },
  { name: '(GMT+05:00) Yekaterinburg', value: '5' },
  { name: '(GMT+05:00) Islamabad, Karachi, Tashkent', value: '5' },
  { name: '(GMT+05:30) Sri Jayawardenapura', value: '5.5' },
  { name: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi', value: '5.5' },
  { name: '(GMT+05:45) Kathmandu', value: '5.75' },
  { name: '(GMT+06:00) Almaty, Novosibirsk', value: '6' },
  { name: '(GMT+06:00) Astana, Dhaka', value: '6' },
  { name: '(GMT+06:30) Yangon (Rangoon)', value: '6.5' },
  { name: '(GMT+07:00) Bangkok, Hanoi, Jakarta', value: '7' },
  { name: '(GMT+07:00) Krasnoyarsk', value: '7' },
  { name: '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi', value: '8' },
  { name: '(GMT+08:00) Kuala Lumpur, Singapore', value: '8' },
  { name: '(GMT+08:00) Irkutsk, Ulaan Bataar', value: '8' },
  { name: '(GMT+08:00) Perth', value: '8' },
  { name: '(GMT+08:00) Taipei', value: '8' },
  { name: '(GMT+09:00) Osaka, Sapporo, Tokyo', value: '9' },
  { name: '(GMT+09:00) Seoul', value: '9' },
  { name: '(GMT+09:00) Yakutsk', value: '9' },
  { name: '(GMT+09:30) Adelaide', value: '9.5' },
  { name: '(GMT+09:30) Darwin', value: '9.5' },
  { name: '(GMT+10:00) Brisbane', value: '10' },
  { name: '(GMT+10:00) Canberra, Melbourne, Sydney', value: '10' },
  { name: '(GMT+10:00) Hobart', value: '10' },
  { name: '(GMT+10:00) Guam, Port Moresby', value: '10' },
  { name: '(GMT+10:00) Vladivostok', value: '10' },
  { name: '(GMT+11:00) Magadan, Solomon Is., New Caledonia', value: '11' },
  { name: '(GMT+12:00) Auckland, Wellington', value: '12' },
  { name: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.', value: '12' },
  { name: "(GMT+13:00) Nuku'alofa", value: '13' }
];

const AddEvent = () => {
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
  const [eventDetails, setEventDetails] = useState({
    name: '',
    venue: '',
    date: '',
    endDate: '',
    lastBookingDate: '',
    mapLink: '',
    sendAdminEmails: false,
    adminEmails: [],
    site: ''
  });
  const [emailInput, setEmailInput] = useState('');

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

  const validate = () => {
    const newErrors = {};
    if (!eventDetails.name.trim()) newErrors.name = 'Name is required';
    if (!eventDetails.date) newErrors.date = 'Start Date is required';
    if (!eventDetails.endDate) newErrors.endDate = 'End date is required';
    if (!eventDetails.lastBookingDate) newErrors.lastBookingDate = 'Last booking date is required';
    if (!eventDetails.venue.trim()) newErrors.venue = 'Venue is required';
    if (!eventDetails.site) newErrors.site = 'Site is required';
    if (!eventDetails.timeZone) newErrors.timeZone = 'Timezone is required';

    if (eventDetails.sendAdminEmails) {
      if (!eventDetails.adminEmails.length) newErrors.adminEmails = 'At least one email is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getEventByIdApi(id);
          const { site, ...rest } = data.event;
          if (status) setEventDetails((prev) => ({ ...prev, ...rest, site: site._id }));
          else showNotification('warn', data);
        } catch (error) {
          showNotification('error', error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addEventApi(eventDetails) : updateEventApi(id, eventDetails)) : addEventApi(eventDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/events/event-list');
      } else showNotification('warn', data);
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

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Event</span>
        </div>
        <FormButtons to="/events/event-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Event Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Event Name"
                type="text"
                id="name"
                name="name"
                placeholder="Event Name"
                onChange={(e) => {
                  setEventDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={eventDetails.name}
                errorMessage={errors.name}
              />
              <TextareaComponent
                divClassName="mt-5"
                label="Venue"
                placeholder="Venue..."
                id="info"
                name="info"
                value={eventDetails.venue}
                onChange={(e) => {
                  setEventDetails((prev) => ({ ...prev, venue: e.target.value }));
                  if (errors.venue) setErrors((prev) => ({ ...prev, venue: '' }));
                }}
                errorMessage={errors.venue}
              />

              <FormField
                label={'Google Map link'}
                type="url"
                id="mapLink"
                name="mapLink"
                placeholder={'Google Map link'}
                value={eventDetails.mapLink}
                onChange={(e) => setEventDetails((prev) => ({ ...prev, mapLink: e.target.value }))}
              />

              <FormField
                label={'Event Homepage link'}
                divClassName={'mt-5'}
                type="url"
                id="landingPageUrl"
                name="landingPageUrl"
                placeholder={'Event Homepage link'}
                value={eventDetails.landingPageUrl}
                onChange={(e) => setEventDetails((prev) => ({ ...prev, landingPageUrl: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Site Details</span>
          </div>
          <div className="w-full">
            <div>
              <DropDown
                name="Sites"
                dropdownList={availableSites
                  .filter((site) => site.modules?.some((module) => module.events === true))
                  .map((site) => ({ id: site._id, showName: `${site.name} (${site.host})`, name: site._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Sites</h5>}
                search={true}
                selected={eventDetails.site}
                commonFunction={(e) => {
                  setEventDetails((prev) => ({ ...prev, site: e.name }));
                  if (errors.site) setErrors((prev) => ({ ...prev, site: '' }));
                }}
                error={errors.site}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Validity Period</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <DropDown
              name="Time Zone"
              dropdownList={tzInts.map((tz, index) => {
                return { id: index, showName: tz.name, name: tz.name, value: tz.value };
              })}
              SummaryChild={<h5 className="p-0 m-0 text-primary">Time Zone</h5>}
              search={true}
              selected={eventDetails.timeZone?.label}
              commonFunction={(e) => {
                setEventDetails((prev) => ({ ...prev, timeZone: { label: e.name, value: e.value } }));
                if (errors.timeZone) setErrors((prev) => ({ ...prev, timeZone: '' }));
              }}
              error={errors.timeZone}
            />

            <DateTimePicker
              id={'date'}
              label={'Start Date'}
              placeholder={adjustDateForTimezone(eventDetails.date, eventDetails.timezone)} // Pass timezone here
              selectedDateTime={adjustDateForTimezone(eventDetails.date, eventDetails.timezone)}
              setSelectedDateTime={(e) => {
                console.log('eventDetails.timeZone', eventDetails.timeZone);
                const adjustedDate = adjustDateForTimezone(e, eventDetails.timezone);

                setEventDetails((prev) => ({ ...prev, date: adjustedDate }));

                if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
              }}
              errorMessage={errors.date}
            />

            <DateTimePicker
              id={'endDate'}
              label={'End Date'}
              placeholder={formatDateTime(new Date())}
              selectedDateTime={eventDetails.endDate}
              setSelectedDateTime={(e) => {
                setEventDetails((prev) => ({ ...prev, endDate: e }));
                if (errors.endDate) setErrors((prev) => ({ ...prev, endDate: '' }));
              }}
              errorMessage={errors.endDate}
            />
            <DateTimePicker
              id={'lastBookingDate'}
              label={'Last Booking Date'}
              placeholder={formatDateTime(new Date())}
              selectedDateTime={eventDetails.lastBookingDate}
              setSelectedDateTime={(e) => {
                setEventDetails((prev) => ({ ...prev, lastBookingDate: e }));
                if (errors.lastBookingDate) setErrors((prev) => ({ ...prev, lastBookingDate: '' }));
              }}
              errorMessage={errors.lastBookingDate}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Notification Preferences</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <ToggleComponent
              bgColor={'bg-grey'}
              label={'Send Admin Emails'}
              isEnableState={eventDetails.sendAdminEmails}
              setIsEnableState={(value) => setEventDetails((prev) => ({ ...prev, sendAdminEmails: value, adminEmails: [] }))}
            />

            {eventDetails.sendAdminEmails && (
              <div>
                <FormField
                  label="Email ID"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email ID"
                  value={emailInput}
                  onChange={(e) => {
                    if (errors.forwardEmails) setErrors((prev) => ({ ...prev, forwardEmails: '' }));
                    if (errors.adminEmails) setErrors((prev) => ({ ...prev, adminEmails: '' }));
                    setEmailInput(e.target.value);
                  }}
                  errorMessage={errors.forwardEmails || errors.adminEmails}
                />

                <button
                  type="button"
                  className="px-4 py-2 text-white font-medium bg-primary hover:bg-primary-hover rounded-xl whitespace-nowrap mt-5"
                  onClick={(e) => validateAndAddInput(e, emailInput, setEmailInput, setEventDetails, 'adminEmails', emailRegex)}
                >
                  Add Email
                </button>

                <ul className="space-y-2 mt-5">
                  {eventDetails.adminEmails.map((email, index) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-main shadow rounded-md">
                      {email}
                      <MdDeleteForever className="text-danger text-3xl gap-2" onClick={() => removeItemAtIndex(setEventDetails, 'adminEmails', index)} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/events/event-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddEvent;
