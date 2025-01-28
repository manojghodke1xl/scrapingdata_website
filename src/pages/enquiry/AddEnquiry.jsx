import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import useGlobalContext from '../../hooks/useGlobalContext';
import FormField from '../../atoms/formFields/InputField';
import PhoneInputField from '../../atoms/formFields/PhoneInputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import DropDown from '../../atoms/formFields/DropDown';
import { addEnquiryApi } from '../../apis/enquiry-apis';
import { showNotification } from '../../utils/showNotification';

const AddEnquiry = () => {
  const navigate = useNavigate();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [enquiryDetails, setEnquiryDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    ccode: '',
    message: '',
    service: '',
    subject: '',
    site: ''
  });

  const validate = () => {
    const newErrors = {};
    if (!enquiryDetails.name.trim()) newErrors.name = 'Name is required';
    if (!enquiryDetails.email.trim()) newErrors.email = 'Email is required';
    if (!enquiryDetails.mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!enquiryDetails.site) newErrors.site = 'Site is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await addEnquiryApi(enquiryDetails);
      if (status) {
        showNotification('success', data.message);
        navigate('/enquiry/enquiry-list');
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
    setEnquiryDetails((prevDetails) => ({ ...prevDetails, mobile, ccode: countryData.dialCode }));
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
          <span className="text-3xl font-semibold text-dark">{'Add'} Enquiry</span>
        </div>
        <FormButtons to="/enquiry/enquiry-list" type="submit" onClick={handleSubmit} btnLebal={'Add'} loading={isLoading} />
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
                  setEnquiryDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={enquiryDetails.name}
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
                  setEnquiryDetails((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                value={enquiryDetails.email}
                errorMessage={errors.email}
              />

              <PhoneInputField
                divClassName="mt-5"
                label="Mobile Number"
                placeholder="Mobile Number"
                id="mobile"
                name="mobile"
                value={enquiryDetails.ccode + enquiryDetails.mobile}
                handlePhoneChange={handlePhoneChange}
                phoneError={errors.mobile}
              />

              <FormField
                label="Subject"
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                onChange={(e) => {
                  setEnquiryDetails((prev) => ({ ...prev, subject: e.target.value }));
                  if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                }}
                value={enquiryDetails.subject}
                errorMessage={errors.subject}
              />

              <TextareaComponent
                divClassName="mt-5"
                label="Service"
                placeholder="Enter a service..."
                id="service"
                name="service"
                value={enquiryDetails.service}
                onChange={(e) => setEnquiryDetails((prev) => ({ ...prev, service: e.target.value }))}
                charCount={false}
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
                selected={enquiryDetails.site}
                commonFunction={(e) => {
                  setEnquiryDetails((prev) => ({ ...prev, site: e.name }));
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
            <span className=" text-primary">Enquiry Message</span>
          </div>
          <div className="w-full">
            <div>
              <TextareaComponent
                divClassName="mt-5"
                label="Message"
                maxLength={100}
                placeholder="Enter a message..."
                id="message"
                name="message"
                value={enquiryDetails.message}
                onChange={(e) => setEnquiryDetails((prev) => ({ ...prev, message: e.target.value }))}
                charCount={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editCouponNote : addCouponNote} />
      </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/enquiry/enquiry-list" type="submit" onClick={handleSubmit} btnLebal={'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddEnquiry;
