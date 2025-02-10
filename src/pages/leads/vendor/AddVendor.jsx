import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { useEffect, useState } from 'react';
import { addVendorApi } from '../../../apis/leads/vendor-apis';
import { showNotification } from '../../../utils/showNotification';
import FormButtons from '../../../atoms/formFields/FormButtons';
import FormField from '../../../atoms/formFields/InputField';
import PhoneInputField from '../../../atoms/formFields/PhoneInputField';
import TextareaComponent from '../../../atoms/formFields/TextareaComponent';
import DropDown from '../../../atoms/formFields/DropDown';
import PhoneInput from '../../../atoms/formFields/PhoneInput';

const AddVendor = () => {
  const navigate = useNavigate();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [vendorDetails, setVendorDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    ccode: '',
    vendorMessage: '',
    service: '',
    subject: '',
    site: ''
  });

  const handlePhoneDataChange = (updatedPhoneData) => {
    setVendorDetails((prevDetails) => ({ ...prevDetails, mobile: updatedPhoneData.phoneNumber, ccode: updatedPhoneData.dialingCode }));
  };

  const validate = () => {
    const newErrors = {};
    if (!vendorDetails.name.trim()) newErrors.name = 'Name is required';
    if (!vendorDetails.email.trim()) newErrors.email = 'Email is required';
    if (!vendorDetails.mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!vendorDetails.site) newErrors.site = 'Site is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await addVendorApi(vendorDetails);
      if (status) {
        showNotification('success', data.message);
        navigate('/vendor/vendor-list');
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

  const handlePhoneChange = (value, countryData) => {
    const numericValue = value.replace(/\D/g, '');
    const requiredLength = countryData.format.replace(/[^.]/g, '').length;
    if (numericValue.length < requiredLength)
      setErrors((prevErrors) => ({ ...prevErrors, mobile: `Mobile number must be at least ${requiredLength - countryData.dialCode.length} digits` }));
    else setErrors((prevErrors) => ({ ...prevErrors, mobile: '' }));

    const mobile = numericValue.slice(countryData.dialCode.length);
    setVendorDetails((prevDetails) => ({ ...prevDetails, mobile, ccode: countryData.dialCode }));
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
          <span className="text-3xl font-semibold text-dark">{'Add'} Vendor</span>
        </div>
        <FormButtons to="/vendor/vendor-list" type="submit" onClick={handleSubmit} btnLebal={'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Customer Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Name"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                onChange={(e) => {
                  setVendorDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={vendorDetails.name}
                errorMessage={errors.name}
              />

              <FormField
                divClassName={'mt-5'}
                label="Email ID"
                type="email"
                id="email"
                name="email"
                placeholder="Email ID"
                onChange={(e) => {
                  setVendorDetails((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                value={vendorDetails.email}
                errorMessage={errors.email}
              />

              <PhoneInput
                phoneDataState={{ phoneNumber: vendorDetails.mobile, dialingCode: vendorDetails.ccode }}
                handlePhoneDataChange={handlePhoneDataChange}
                id={'mobile'}
                label={'Mobile Number'}
                name={'mobile'}
                divClassName={'mt-5'}
              />

              <FormField
                divClassName={'mt-5'}
                label="Subject"
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                onChange={(e) => {
                  setVendorDetails((prev) => ({ ...prev, subject: e.target.value }));
                  if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                }}
                value={vendorDetails.subject}
                errorMessage={errors.subject}
              />

              <TextareaComponent
                divClassName="mt-5"
                label="Service"
                placeholder="Enter a service..."
                id="service"
                name="service"
                value={vendorDetails.service}
                onChange={(e) => setVendorDetails((prev) => ({ ...prev, service: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Additional Information</span>
          </div>
          <div className="w-full">
            <div>
              <DropDown
                name="Sites"
                label={'Select Site'}
                dropdownList={availableSites
                  .filter((site) => site.modules?.some((module) => module.events === true))
                  .map((site) => ({ id: site._id, showName: `${site.name} (${site.host})`, name: site._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Sites</h5>}
                search={true}
                selected={vendorDetails.site}
                commonFunction={(e) => {
                  setVendorDetails((prev) => ({ ...prev, site: e.name }));
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
            <span className=" text-primary">Vendor Message</span>
          </div>
          <div className="w-full">
            <div>
              <TextareaComponent
                divClassName="mt-5"
                label="Message"
                maxLength={100}
                placeholder="Enter a message..."
                id="vendorMessage"
                name="vendorMessage"
                value={vendorDetails.vendorMessage}
                onChange={(e) => setVendorDetails((prev) => ({ ...prev, vendorMessage: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/vendor/vendor-list" type="submit" onClick={handleSubmit} btnLebal={'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddVendor;
