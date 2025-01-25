import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useCallback, useEffect, useState } from 'react';
import { addPackageApi, getPackageByIdApi, updatePackageApi } from '../../apis/package-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import { getAllEventsApi } from '../../apis/event-apis';
import DropDown from '../../atoms/formFields/DropDown';
import { getIntegrationByEvent } from '../../apis/payment-integration-apis';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import { getTemplateByEventApi } from '../../apis/templates/email-template-apis';

const AddPackage = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading, isLoading } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [packageDetails, setPackageDetails] = useState({
    title: '',
    description: '',
    ticketIdPattern: '',
    currencyNotes: {
      INR: false,
      AED: false,
      USD: false
    },
    currencies: {
      INR: 0,
      AED: 0,
      USD: 0
    },
    maxLimit: '',
    event: ''
  });
  const [events, setEvents] = useState([]);
  const [paymentData, setPaymentData] = useState({});
  const [templates, setTemplates] = useState([]);

  const validate = () => {
    const newErrors = {};

    if (!packageDetails.title.trim()) newErrors.title = 'Name is required';
    if (packageDetails.maxLimit < 0 || !packageDetails.maxLimit) newErrors.maxLimit = 'Max limit should be greater than 0';
    if (!packageDetails.event) newErrors.event = 'Event is required';
    if (!packageDetails.ticketIdPattern) newErrors.ticketIdPattern = 'Ticket ID Pattern is required';
    if (!packageDetails.ticketIdPattern?.trim()) newErrors.ticketIdPattern = 'Ticket ID Pattern is required';
    if (packageDetails.event && !packageDetails.template) newErrors.template = 'Template is required';

    if (
      (paymentData?.razorpay?.supports?.INR || paymentData?.stripe?.supports?.INR || paymentData?.paypal?.supports?.INR) &&
      (!packageDetails.currencies.INR || packageDetails.currencies.INR <= 0) &&
      packageDetails.currencyNotes.INR
    ) {
      newErrors.currencies = { ...newErrors.currencies, INR: 'AED is required' };
    }

    if (
      (paymentData?.razorpay?.supports?.AED || paymentData?.stripe?.supports?.AED || paymentData?.paypal?.supports?.AED) &&
      (!packageDetails.currencies.AED || packageDetails.currencies.AED <= 0) &&
      packageDetails.currencyNotes.AED
    ) {
      newErrors.currencies = { ...newErrors.currencies, AED: 'AED is required' };
    }

    if (
      (paymentData?.razorpay?.supports?.USD || paymentData?.stripe?.supports?.USD || paymentData?.paypal?.supports?.USD) &&
      (!packageDetails.currencies.USD || packageDetails.currencies.USD <= 0) &&
      packageDetails.currencyNotes.USD
    ) {
      newErrors.currencies = { ...newErrors.currencies, USD: 'USD is required' };
    }

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

  useEffect(() => {
    if (packageDetails.event) {
      (async () => {
        try {
          const { status, data } = await getTemplateByEventApi(packageDetails.event);
          if (status) setTemplates(data.emailTemplates);
          else showNotification('warn', data);
        } catch (error) {
          showNotification('error', error.message);
        }
      })();
    }
  }, [packageDetails.event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addPackageApi(packageDetails) : updatePackageApi(id, packageDetails)) : addPackageApi(packageDetails));
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

  const getIntegration = useCallback(async () => {
    try {
      setLoading(true);
      const { status, data } = await getIntegrationByEvent(packageDetails.event);
      if (status) setPaymentData(data?.integration?.payment);
      else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  }, [packageDetails.event, setLoading]);

  useEffect(() => {
    if (packageDetails.event) getIntegration();
  }, [getIntegration, packageDetails.event, setLoading]);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Package</span>
        </div>
        <FormButtons to="/packages/package-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
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
                selected={packageDetails.event}
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
                value={packageDetails.title}
                errorMessage={errors.title}
              />
              <TextareaComponent
                divClassName="mt-5"
                label="Description"
                placeholder="Enter a description..."
                id="description"
                name="description"
                value={packageDetails?.description}
                onChange={(e) => setPackageDetails((prev) => ({ ...prev, description: e.target.value }))}
                charCount={false}
              />

              <FormField
                divClassName={'mt-5'}
                label="Ticket ID Pattern"
                type="text"
                id="ticketIdPattern"
                name="ticketIdPattern"
                placeholder="Ticket ID Pattern"
                onChange={(e) => {
                  setPackageDetails((prev) => ({ ...prev, ticketIdPattern: e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() }));
                  if (errors.ticketIdPattern) setErrors((prev) => ({ ...prev, ticketIdPattern: '' }));
                }}
                value={packageDetails.ticketIdPattern}
                preview={packageDetails.ticketIdPattern ? `${packageDetails.ticketIdPattern}_001` : ''}
                errorMessage={errors.ticketIdPattern}
              />
              {id && <p className="text-secondary text-sm mt-4"> If you change ticket pattern it won&apos;t any impact on existing tickets already generated in this package.</p>}
            </div>
          </div>
        </div>
      </div>

      {packageDetails.event && (
        <>
          <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
            <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
              <div className="sm:w-7/12 w-full flex flex-col">
                <span className=" text-primary">Template Details</span>
              </div>
              <div className="w-full">
                <div>
                  <DropDown
                    label={'Select Template'}
                    name="Template"
                    dropdownList={templates?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">Templates</h5>}
                    search={true}
                    selected={packageDetails.template}
                    commonFunction={(e) => {
                      setPackageDetails((prev) => ({ ...prev, template: e.name }));
                      if (errors.template) setErrors((prev) => ({ ...prev, template: '' }));
                    }}
                    error={errors.template}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
            <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
              <div className="sm:w-7/12 w-full flex flex-col">
                <span className=" text-primary">Additional Details</span>
              </div>
              <div className="w-full">
                <div>
                  <>
                    <MultiSelectCheckbox
                      divClassName={'mt-5'}
                      options={[
                        { _id: 'INR', name: 'INR' },
                        { _id: 'AED', name: 'AED' },
                        { _id: 'USD', name: 'USD' }
                      ]}
                      formLabel="Currencies"
                      label="Select Currencies"
                      onChange={(selected) => {
                        let error = '';
                        const updatedCurrencyNotes = {};

                        const supportedCurrencies = {
                          INR: paymentData?.razorpay?.supports?.INR || paymentData?.stripe?.supports?.INR || paymentData?.paypal?.supports?.INR,
                          AED: paymentData?.razorpay?.supports?.AED || paymentData?.stripe?.supports?.AED || paymentData?.paypal?.supports?.AED,
                          USD: paymentData?.razorpay?.supports?.USD || paymentData?.stripe?.supports?.USD || paymentData?.paypal?.supports?.USD
                        };

                        selected.forEach((currency) => {
                          if (supportedCurrencies[currency]) updatedCurrencyNotes[currency] = true;
                          else error = `Please add support for ${currency} currency in your payment gateway configuration`;
                        });

                        setErrors((prev) => ({ ...prev, currencyNotes: error }));
                        setPackageDetails((prevDetails) => ({
                          ...prevDetails,
                          currencyNotes: updatedCurrencyNotes
                        }));

                        if (!error) setErrors((prev) => ({ ...prev, currencyNotes: '' }));
                      }}
                      selected={Object.entries(packageDetails?.currencyNotes ?? {})
                        .filter(([, value]) => value)
                        .map(([key]) => key)}
                      error={errors?.currencyNotes}
                    />

                    {(paymentData?.razorpay?.supports?.INR || paymentData?.stripe?.supports?.INR || paymentData?.paypal?.supports?.INR) && packageDetails?.currencyNotes?.INR && (
                      <FormField
                        divClassName={'mt-5'}
                        label="Amount (in INR)"
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="Amount (in INR)"
                        onChange={(e) => {
                          setPackageDetails((prev) => ({ ...prev, currencies: { ...prev.currencies, INR: e.target.value } }));
                          if (errors.currencies?.INR) setErrors((prev) => ({ ...prev, currencies: { INR: '' } }));
                        }}
                        value={packageDetails.currencies?.INR}
                        errorMessage={errors.currencies?.INR}
                      />
                    )}
                    {(paymentData?.razorpay?.supports?.AED || paymentData?.stripe?.supports?.AED || paymentData?.paypal?.supports?.AED) && packageDetails?.currencyNotes?.AED && (
                      <FormField
                        divClassName={'mt-5'}
                        label="Amount (in AED)"
                        type="number"
                        id="currencies"
                        name="currencies"
                        placeholder="Amount (in AED)"
                        onChange={(e) => {
                          setPackageDetails((prev) => ({ ...prev, currencies: { ...prev.currencies, AED: e.target.value } }));
                          if (errors.currencies) setErrors((prev) => ({ ...prev, currencies: { AED: '' } }));
                        }}
                        value={packageDetails.currencies?.AED}
                        errorMessage={errors.currencies?.AED}
                      />
                    )}

                    {(paymentData?.razorpay?.supports?.USD || paymentData?.stripe?.supports?.USD || paymentData?.paypal?.supports?.USD) && packageDetails?.currencyNotes?.USD && (
                      <FormField
                        divClassName={'mt-5'}
                        label="USD Amount"
                        type="number"
                        id="currencies"
                        name="currencies"
                        placeholder="USD Amount"
                        onChange={(e) => {
                          setPackageDetails((prev) => ({ ...prev, currencies: { ...prev.currencies, USD: e.target.value } }));
                          if (errors.currencies) setErrors((prev) => ({ ...prev, currencies: { USD: '' } }));
                        }}
                        value={packageDetails.currencies?.USD}
                        errorMessage={errors.currencies?.USD}
                      />
                    )}

                    {(packageDetails?.currencyNotes?.INR || packageDetails?.currencyNotes?.AED || packageDetails?.currencyNotes?.USD) && (
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
                        value={packageDetails.maxLimit}
                        errorMessage={errors.maxLimit}
                      />
                    )}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
<NoteComponent note={id ? editAdminNote : addAdminNote} />
</div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/packages/package-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddPackage;
