import { useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useEffect, useState } from 'react';
import { addPackageApi, getPackageByIdApi, updatePackageApi } from '../../apis/package-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import { getAllEventsApi } from '../../apis/event-apis';
import DropDown from '../../atoms/formFields/DropDown';

const AddPackage = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading, isLoading } = useGlobalContext();
  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [packageDetials, setPackageDetails] = useState({
    title: '',
    description: '',
    amount: '',
    maxLimit: '',
    event: ''
  });

  const [events, setEvents] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!packageDetials.title.trim()) newErrors.title = 'Name is required';
    if (packageDetials.amount < 0 || !packageDetials.amount) newErrors.amount = 'Amount should be greater than 0';
    if (packageDetials.maxLimit < 0 || !packageDetials.maxLimit) newErrors.maxLimit = 'Max limit should be greater than 0';
    if (!packageDetials.event) newErrors.event = 'Event is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { status, data } = await getAllEventsApi();
        if (status) setEvents(data.events);
        else showNotification('warn', data);
      } catch (error) {
        showNotification('error', error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getPackageByIdApi(id);
          if (status) setPackageDetails(data.package);
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
      const { status, data } = await (id ? updatePackageApi(id, packageDetials) : addPackageApi(packageDetials));
      if (status) {
        showNotification('success', data.message);
        navigate('/packages/package-list');
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
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Package</span>
        </div>
        <FormButtons to="/packages/package-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Event Details</span>
          </div>
          <div className="w-full">
            <div>
              <DropDown
                name="Events"
                dropdownList={events?.map((event) => ({ name: event._id, showName: `${event.name} (${event.venue})`, id: event._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Events</h5>}
                search={true}
                selected={packageDetials.event}
                commonFunction={(e) => {
                  setPackageDetails((prev) => ({ ...prev, event: e.name }));
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
            <span className=" text-primary">Package Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Title"
                type="text"
                id="title"
                name="title"
                placeholder="Package Title"
                onChange={(e) => {
                  setPackageDetails((prev) => ({ ...prev, title: e.target.value }));
                  if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                }}
                value={packageDetials.title}
                errorMessage={errors.title}
              />
              <TextareaComponent
                label="Description"
                placeholder="Enter a description..."
                id="description"
                name="description"
                value={packageDetials?.description}
                onChange={(e) => setPackageDetails((prev) => ({ ...prev, description: e.target.value }))}
                charCount={false}
              />
              <FormField
                label="Amount"
                type="number"
                id="amount"
                name="amount"
                placeholder="Amount"
                onChange={(e) => {
                  setPackageDetails((prev) => ({ ...prev, amount: e.target.value }));
                  if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
                }}
                value={packageDetials.amount}
                errorMessage={errors.amount}
              />
              <FormField
                divClassName={'mt-5'}
                label="Max Limit"
                type="number"
                id="maxLimit"
                name="maxLimit"
                placeholder="Max Limit"
                onChange={(e) => {
                  setPackageDetails((prev) => ({ ...prev, maxLimit: e.target.value }));
                  if (errors.maxLimit) setErrors((prev) => ({ ...prev, maxLimit: '' }));
                }}
                value={packageDetials.maxLimit}
                errorMessage={errors.maxLimit}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
<NoteComponent note={id ? editAdminNote : addAdminNote} />
</div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/packages/package-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddPackage;
