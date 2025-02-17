import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { addNotifAgentApi, getNotifAgentByIdApi, updateNotifAgentApi } from '../../apis/notif-agent-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import PhoneInputField from '../../atoms/formFields/PhoneInputField';

const AddNotifAgent = () => {
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const navigate = useNavigate();
  const { id = '' } = useParams();

  const [notifAgentDetials, setNotifAgentDetails] = useState({
    email: '',
    name: '',
    phoneCode: '',
    phoneNumber: '',
    sites: [],
    isBlocked: false
  });

  const [errors, setErrors] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getNotifAgentByIdApi(id);
        if (status) setNotifAgentDetails(data.notifAgent);
        else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!notifAgentDetials.email.trim()) newErrors.email = 'Email is required';
    if (!notifAgentDetials.name.trim()) newErrors.name = 'Name is required';
    if (notifAgentDetials.sites.length === 0) newErrors.sites = 'At least one site must be selected';
    if (!notifAgentDetials.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addNotifAgentApi(notifAgentDetials) : updateNotifAgentApi(id, notifAgentDetials)) : addNotifAgentApi(notifAgentDetials));
      if (status) {
        showNotification('success', data.message);
        navigate('/notification-agent/notification-agent-list');
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value, countryData) => {
    const numericValue = value.replace(/\D/g, '');
    const mobile = numericValue.slice(countryData.dialCode.length);
    setNotifAgentDetails((prevDetails) => ({ ...prevDetails, phoneNumber: mobile, phoneCode: countryData.dialCode }));
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
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Notification Agent</span>
        </div>
        <FormButtons
          to="/notification-agent/notification-agent-list"
          type="submit"
          onClick={handleSubmit}
          btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'}
          disabled={isLoading}
        />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Notification Agent Details</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-y-5">
              <FormField
                label="Agent Name"
                type="text"
                id="name"
                name="name"
                placeholder="Agent Name"
                onChange={(e) => {
                  setNotifAgentDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={notifAgentDetials.name}
                errorMessage={errors.name}
              />
              <FormField
                label="Agent Email ID"
                type="email"
                id="email"
                name="email"
                placeholder="Agent Email ID"
                onChange={(e) => {
                  setNotifAgentDetails((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                value={notifAgentDetials.email}
                errorMessage={errors.email}
              />
              <PhoneInputField
                label="Mobile Number"
                placeholder="Mobile Number"
                name="mobile"
                value={notifAgentDetials.phoneCode + notifAgentDetials.phoneNumber}
                handlePhoneChange={handlePhoneChange}
                phoneError={errors.phoneNumber}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Access Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <MultiSelectCheckbox
                options={availableSites.map((site) => ({ name: `${site.name} (${site.host})`, _id: site._id }))}
                label="Select Sites"
                onChange={(selected) => {
                  setNotifAgentDetails((prev) => ({ ...prev, sites: selected }));
                  if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
                }}
                isSuperAdmin={notifAgentDetials.isSuperAdmin}
                selected={notifAgentDetials.sites}
                error={errors.sites}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Account Status</span>
          </div>
          <div className="dropdown-container relative w-full mt-2">
            <ToggleComponent
              label={'Is Agent Blocked?'}
              isEnableState={notifAgentDetials.isBlocked}
              setIsEnableState={(value) => setNotifAgentDetails((prev) => ({ ...prev, isBlocked: value }))}
            />
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons
            to="/notification-agent/notification-agent-list"
            type="submit"
            onClick={handleSubmit}
            btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default AddNotifAgent;
