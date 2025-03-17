import { useEffect, useState } from 'react';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import FormField from '../../atoms/formFields/InputField';
import PhoneInputField from '../../atoms/formFields/PhoneInputField';
import { addContactApi, getContactByIdApi, updateContactApi } from '../../apis/contact-apis';

const AddContact = () => {
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [errors, setErrors] = useState({});
  const [customerSite, setCustomerSite] = useState({
    sites: [],
    email: '',
    name: '',
    phoneCode: '',
    phone: ''
  });
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getContactByIdApi(id);
        if (status) {
          const { sites, ...rest } = data.contact;
          setCustomerSite((prev) => ({ ...prev, ...rest, sites: sites?.map((site) => site?._id) }));
        } else showNotification('error', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  const handlePhoneChange = (value, countryData) => {
    const numericValue = value.replace(/\D/g, '');
    const mobile = numericValue.slice(countryData.dialCode.length);
    setCustomerSite((prevDetails) => ({ ...prevDetails, phone: mobile, phoneCode: countryData.dialCode }));
    setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!customerSite.email.trim()) newErrors.email = 'Email is required';
    if (!customerSite.name.trim()) newErrors.name = 'Name is required';
    if (customerSite.sites.length === 0) newErrors.sites = 'At least one site must be selected';
    if (!customerSite.phone) newErrors.phone = 'Contact number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addContactApi(customerSite) : updateContactApi(id, customerSite)) : addContactApi(customerSite));
      if (status) {
        showNotification('success', data.message);
        navigate('/contact/contact-list');
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
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
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Contact</span>
        </div>
        <FormButtons to="/contact/contact-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} disabled={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Access Settings</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <MultiSelectCheckbox
              options={availableSites.map((site) => ({ name: `${site.name} (${site.host})`, _id: site._id }))}
              formLabel={'Select Sites'}
              label="Sites"
              onChange={(selected) => {
                setCustomerSite((prev) => ({ ...prev, sites: selected }));
                if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
              }}
              selected={customerSite.sites}
              error={errors.sites}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Contact Details</span>
          </div>
          <div className=" w-full flex flex-col gap-y-5">
            <FormField
              label="Name"
              type="text"
              id="name"
              name="name"
              required
              placeholder="Name"
              onChange={(e) => {
                setCustomerSite((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              value={customerSite.name}
              errorMessage={errors.name}
            />
            <FormField
              label="Email ID"
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email ID"
              onChange={(e) => {
                setCustomerSite((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              value={customerSite.email}
              errorMessage={errors.email}
            />
            <PhoneInputField
              label="Contact Number"
              placeholder="Contact Number"
              name="mobile"
              required
              value={customerSite.phoneCode + customerSite.phone}
              handlePhoneChange={handlePhoneChange}
              phoneError={errors.phone}
            />
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/contact/contact-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} disabled={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddContact;
