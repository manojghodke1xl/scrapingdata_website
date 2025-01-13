import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import DateTimePicker from '../../atoms/formFields/DateTimePicker';
import { formatDateTime } from '../../utils/dateFormats';
import DropDown from '../../atoms/formFields/DropDown';
import { showNotification } from '../../utils/showNotification';
import { addEventApi, getEventByIdApi, updateEventApi } from '../../apis/event-apis';

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
    site: ''
  });

  const validate = () => {
    const newErrors = {};
    if (!eventDetails.name.trim()) newErrors.name = 'Name is required';
    if (!eventDetails.date) newErrors.date = 'Start Date is required';
    if (!eventDetails.endDate) newErrors.endDate = 'End date is required';
    if (!eventDetails.lastBookingDate) newErrors.lastBookingDate = 'Last booking date is required';
    if (!eventDetails.venue.trim()) newErrors.venue = 'Venue is required';
    if (!eventDetails.site) newErrors.site = 'Site is required';
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
                label="Venue"
                placeholder="Venue..."
                id="info"
                name="info"
                value={eventDetails.venue}
                onChange={(e) => {
                  setEventDetails((prev) => ({ ...prev, venue: e.target.value }));
                  if (errors.venue) setErrors((prev) => ({ ...prev, venue: '' }));
                }}
                charCount={false}
                errorMessage={errors.venue}
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
          <div className="dropdown-container relative w-full mt-2">
            <DateTimePicker
              id={'date'}
              label={'Start Date'}
              placeholder={formatDateTime(new Date())}
              selectedDateTime={eventDetails.date}
              setSelectedDateTime={(e) => {
                setEventDetails((prev) => ({ ...prev, date: e }));
                if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
              }}
              errorMessage={errors.date}
            />
            <DateTimePicker
              divClassName={'mt-5'}
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
              divClassName={'mt-5'}
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

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
<NoteComponent note={id ? editAdminNote : addAdminNote} />
</div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/events/event-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddEvent;
