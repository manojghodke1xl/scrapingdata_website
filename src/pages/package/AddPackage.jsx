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
import { getTemplateByEventApi, getWhatsAppTemplateByEventApi } from '../../apis/templates/template-apis';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import DateTimePicker from '../../atoms/formFields/DateTimePicker';
import { formatDateTime } from '../../utils/dateFormats';
import { getAllTicketsApi } from '../../apis/event-ticket-apis';
import { getAllCertificatesApi } from '../../apis/certificate-apis';

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
    onSale: false,
    saleEndDate: '',
    ticket: '',
    template: null,
    whatsAppTemplate: null,
    certificate: null,
    certificateTemplate: null,
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
    salePrice: {
      INR: 0,
      AED: 0,
      USD: 0
    },
    maxLimit: '',
    event: ''
  });

  const [showTicket, setShowTicket] = useState(packageDetails.ticket ? true : false);

  const [events, setEvents] = useState([]);
  const [paymentData, setPaymentData] = useState({});
  const [templates, setTemplates] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [whatsappTemplates, setWhatsAppTemplates] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!packageDetails.title.trim()) newErrors.title = 'Title is required';
    if (!packageDetails.event) newErrors.event = 'Events is required';
    if (packageDetails.onSale && !packageDetails.saleEndDate) newErrors.saleEndDate = 'Sale end date is required';

    if (!showTicket) packageDetails.ticket = null;

    if (Object.values(packageDetails.currencyNotes).filter(Boolean).length === 0) newErrors.currencyNotes = 'Please select at least one currency';

    if (Object.values(packageDetails.currencyNotes).some(Boolean) && (packageDetails.maxLimit < 0 || !packageDetails.maxLimit))
      newErrors.maxLimit = 'Max limit should be greater than 0';

    const supportedCurrencies = ['INR', 'AED', 'USD'];

    supportedCurrencies.forEach((currency) => {
      if (
        (paymentData?.razorpay?.supports?.[currency] || paymentData?.stripe?.supports?.[currency] || paymentData?.paypal?.supports?.[currency]) &&
        packageDetails.currencyNotes[currency] &&
        packageDetails.currencies[currency] < 0
      ) {
        newErrors.currencies = { ...newErrors.currencies, [currency]: `Price in (${currency}) cannot be negative` };
        if (packageDetails.onSale && packageDetails.salePrice[currency] < 0)
          newErrors.salePrice = { ...newErrors.salePrice, [currency]: `Sale Price in (${currency}) cannot be negative` };
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
          if (status) {
            setPackageDetails(data.package);
            setShowTicket(data.package.ticket ? true : false);
          } else showNotification('warn', data);
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
          const [templateResponse, whatsappTemplateResponse, ticketsResponse, certificatesResponse] = await Promise.all([
            getTemplateByEventApi(packageDetails.event),
            getWhatsAppTemplateByEventApi(packageDetails.event),
            getAllTicketsApi(),
            getAllCertificatesApi()
          ]);

          if (ticketsResponse.status) setTickets(ticketsResponse.data.tickets);
          else showNotification('warn', ticketsResponse.data);

          if (templateResponse.status) setTemplates(templateResponse.data.emailTemplates);
          else showNotification('warn', templateResponse.data);

          if (whatsappTemplateResponse.status) setWhatsAppTemplates(whatsappTemplateResponse.data.whatsappTemplate);
          else showNotification('warn', whatsappTemplateResponse.data);

          if (certificatesResponse.status) setCertificates(certificatesResponse.data.certificates);
          else showNotification('warn', certificatesResponse.data);
        } catch (error) {
          showNotification('error', error.message);
        }
      })();
    }
  }, [packageDetails.event]);

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
                label={'Select Event'}
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
            <div className="flex flex-col gap-5">
              <FormField
                label="Title"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                onChange={(e) => {
                  setPackageDetails((prev) => ({ ...prev, title: e.target.value }));
                  if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                }}
                value={packageDetails.title}
                errorMessage={errors.title}
              />
              <TextareaComponent
                label="Description"
                placeholder="Enter a description..."
                id="description"
                name="description"
                value={packageDetails?.description}
                onChange={(e) => setPackageDetails((prev) => ({ ...prev, description: e.target.value }))}
              />

              <FormField
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

              <ToggleComponent
                label={'Product on Sale ?'}
                isEnableState={packageDetails.onSale}
                tooltipContent={'If you enable this option, then you can set the product on sale.'}
                setIsEnableState={(e) => setPackageDetails((prev) => ({ ...prev, onSale: e, salePrice: {}, saleEndDate: '' }))}
                errorMessage={errors.onSale}
              />

              {packageDetails.onSale && (
                <DateTimePicker
                  divClassName={'mt-5'}
                  id={'saleEndDate'}
                  label="Sale End Date"
                  placeholder={formatDateTime(new Date())}
                  selectedDateTime={packageDetails.saleEndDate}
                  setSelectedDateTime={(date) => {
                    setPackageDetails((prev) => ({ ...prev, saleEndDate: date }));
                    if (errors.saleEndDate) setErrors((prev) => ({ ...prev, saleEndDate: '' }));
                  }}
                  errorMessage={errors.saleEndDate}
                />
              )}
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
                <div className="flex flex-col gap-5">
                  <DropDown
                    label={'Select Email Template'}
                    name="Template"
                    dropdownList={templates?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">Email Templates</h5>}
                    search={true}
                    selected={packageDetails.template}
                    commonFunction={(e) => {
                      setPackageDetails((prev) => ({ ...prev, template: e.name }));
                      if (errors.template) setErrors((prev) => ({ ...prev, template: '' }));
                    }}
                    error={errors.template}
                  />

                  <DropDown
                    label={'Select WhatsApp Template'}
                    name="whatsappTemplate"
                    dropdownList={whatsappTemplates?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">WhatsApp Templates</h5>}
                    search={true}
                    selected={packageDetails.whatsAppTemplate}
                    commonFunction={(e) => {
                      setPackageDetails((prev) => ({ ...prev, whatsAppTemplate: e.name }));
                      if (errors.whatsAppTemplate) setErrors((prev) => ({ ...prev, whatsAppTemplate: '' }));
                    }}
                    error={errors.whatsAppTemplate}
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
                <div className="flex flex-col gap-5">
                  <MultiSelectCheckbox
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
                      const updatedCurrencies = { ...packageDetails.currencies };
                      const updatedSalePrice = { ...packageDetails.salePrice };

                      const supportedCurrencies = {
                        INR: paymentData?.razorpay?.supports?.INR || paymentData?.stripe?.supports?.INR || paymentData?.paypal?.supports?.INR,
                        AED: paymentData?.razorpay?.supports?.AED || paymentData?.stripe?.supports?.AED || paymentData?.paypal?.supports?.AED,
                        USD: paymentData?.razorpay?.supports?.USD || paymentData?.stripe?.supports?.USD || paymentData?.paypal?.supports?.USD
                      };

                      selected.forEach((currency) => {
                        if (supportedCurrencies[currency]) updatedCurrencyNotes[currency] = true;
                        else error = `Please add support for ${currency} currency in your payment gateway configuration`;
                      });

                      Object.keys(packageDetails.currencies).forEach((currency) => {
                        if (!selected.includes(currency)) {
                          updatedCurrencies[currency] = 0;
                          updatedSalePrice[currency] = 0;
                        }
                      });

                      setErrors((prev) => ({ ...prev, currencyNotes: error }));
                      setPackageDetails((prevDetails) => ({
                        ...prevDetails,
                        currencyNotes: updatedCurrencyNotes,
                        currencies: updatedCurrencies,
                        salePrice: updatedSalePrice
                      }));

                      if (!error) setErrors((prev) => ({ ...prev, currencyNotes: '' }));
                    }}
                    selected={Object.entries(packageDetails?.currencyNotes ?? {})
                      .filter(([, value]) => value)
                      .map(([key]) => key)}
                    error={errors?.currencyNotes}
                  />
                  {(paymentData?.razorpay?.supports?.INR || paymentData?.stripe?.supports?.INR || paymentData?.paypal?.supports?.INR) && packageDetails?.currencyNotes?.INR && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <FormField
                        label="Price (in INR) is inclusive of tax"
                        type="number"
                        id="currencies-INR"
                        name="currencies-INR"
                        min={0}
                        placeholder="Price (in INR) is inclusive of tax"
                        onChange={(e) => {
                          setPackageDetails((prev) => ({ ...prev, currencies: { ...prev.currencies, INR: e.target.value } }));
                          if (errors.currencies?.INR) setErrors((prev) => ({ ...prev, currencies: { INR: '' } }));
                        }}
                        value={packageDetails.currencies?.INR}
                        errorMessage={errors.currencies?.INR}
                      />
                      {packageDetails.onSale && (
                        <FormField
                          label={`Sale Price (in INR)`}
                          type="number"
                          id={`salePrice-INR`}
                          name={`salePrice-INR`}
                          min={0}
                          placeholder={`Sale Price (INR)`}
                          onChange={(e) => {
                            setPackageDetails((prev) => ({ ...prev, salePrice: { ...prev.salePrice, INR: e.target.value } }));
                            if (errors.salePrice?.INR) setErrors((prev) => ({ ...prev, salePrice: { ...prev.salePrice, INR: '' } }));
                          }}
                          value={packageDetails.salePrice?.INR ?? ''}
                          errorMessage={errors.salePrice?.INR}
                        />
                      )}
                    </div>
                  )}
                  {(paymentData?.razorpay?.supports?.AED || paymentData?.stripe?.supports?.AED || paymentData?.paypal?.supports?.AED) && packageDetails?.currencyNotes?.AED && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <FormField
                        label="Price (in AED) is inclusive of tax"
                        type="number"
                        id="currencies-AED"
                        name="currencies-AED"
                        min={0}
                        placeholder="Price (in AED) is inclusive of tax"
                        onChange={(e) => {
                          setPackageDetails((prev) => ({ ...prev, currencies: { ...prev.currencies, AED: e.target.value } }));
                          if (errors.currencies) setErrors((prev) => ({ ...prev, currencies: { AED: '' } }));
                        }}
                        value={packageDetails.currencies?.AED}
                        errorMessage={errors.currencies?.AED}
                      />

                      {packageDetails.onSale && (
                        <FormField
                          label={`Sale Price (in AED)`}
                          type="number"
                          id={`salePrice-AED`}
                          name={`salePrice-AED`}
                          min={0}
                          placeholder={`Sale Price (AED)`}
                          onChange={(e) => {
                            setPackageDetails((prev) => ({ ...prev, salePrice: { ...prev.salePrice, AED: e.target.value } }));
                            if (errors.salePrice?.AED) setErrors((prev) => ({ ...prev, salePrice: { ...prev.salePrice, AED: '' } }));
                          }}
                          value={packageDetails.salePrice?.AED ?? ''}
                          errorMessage={errors.salePrice?.AED}
                        />
                      )}
                    </div>
                  )}
                  {(paymentData?.razorpay?.supports?.USD || paymentData?.stripe?.supports?.USD || paymentData?.paypal?.supports?.USD) && packageDetails?.currencyNotes?.USD && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <FormField
                        label="Price (in USD) is inclusive of tax"
                        type="number"
                        id="currencies-USD"
                        name="currencies-USD"
                        min={0}
                        placeholder="Price (in USD) is inclusive of tax"
                        onChange={(e) => {
                          setPackageDetails((prev) => ({ ...prev, currencies: { ...prev.currencies, USD: e.target.value } }));
                          if (errors.currencies) setErrors((prev) => ({ ...prev, currencies: { USD: '' } }));
                        }}
                        value={packageDetails.currencies?.USD}
                        errorMessage={errors.currencies?.USD}
                      />

                      {packageDetails.onSale && (
                        <FormField
                          label={`Sale Price (in USD)`}
                          type="number"
                          id={`salePrice-USD`}
                          name={`salePrice-USD`}
                          min={0}
                          placeholder={`Sale Price (USD)`}
                          onChange={(e) => {
                            setPackageDetails((prev) => ({ ...prev, salePrice: { ...prev.salePrice, USD: e.target.value } }));
                            if (errors.salePrice?.USD) setErrors((prev) => ({ ...prev, salePrice: { ...prev.salePrice, USD: '' } }));
                          }}
                          value={packageDetails.salePrice?.USD ?? ''}
                          errorMessage={errors.salePrice?.USD}
                        />
                      )}
                    </div>
                  )}
                  {(packageDetails?.currencyNotes?.INR || packageDetails?.currencyNotes?.AED || packageDetails?.currencyNotes?.USD) && (
                    <FormField
                      label="Max Limit"
                      type="number"
                      id="maxLimit"
                      name="maxLimit"
                      placeholder="Max Limit"
                      min={0}
                      onChange={(e) => {
                        setPackageDetails((prev) => ({ ...prev, maxLimit: e.target.value }));
                        if (errors.maxLimit) setErrors((prev) => ({ ...prev, maxLimit: '' }));
                      }}
                      value={packageDetails.maxLimit}
                      errorMessage={errors.maxLimit}
                    />
                  )}

                  <DropDown
                    label={'Select Certificate'}
                    name="certificate"
                    dropdownList={certificates?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">Certificates</h5>}
                    search={true}
                    selected={packageDetails.certificate}
                    commonFunction={(e) => {
                      setPackageDetails((prev) => ({ ...prev, certificate: e.name }));
                      if (errors.certificate) setErrors((prev) => ({ ...prev, certificate: '' }));
                    }}
                    error={errors.certificate}
                  />

                  {packageDetails.certificate && (
                    <DropDown
                      label={'Select Certificate Email Template'}
                      name="CertificateTemplate"
                      dropdownList={templates?.map((template) => ({ name: template._id, showName: template.name, id: template._id }))}
                      SummaryChild={<h5 className="p-0 m-0 text-primary">Email Templates</h5>}
                      search={true}
                      selected={packageDetails.certificateTemplate}
                      commonFunction={(e) => {
                        setPackageDetails((prev) => ({ ...prev, certificateTemplate: e.name }));
                        if (errors.certificateTemplate) setErrors((prev) => ({ ...prev, certificateTemplate: '' }));
                      }}
                      error={errors.certificateTemplate}
                    />
                  )}

                  <ToggleComponent
                    label={'Do you want to add ticket?'}
                    isEnableState={showTicket}
                    tooltipContent={'If checked, then you can add a ticket'}
                    setIsEnableState={(e) => setShowTicket(e)}
                  />
                  {showTicket && (
                    <DropDown
                      name="Tickets"
                      label={'Select Ticket'}
                      dropdownList={tickets?.map((event) => ({ name: event._id, showName: event.name, id: event._id }))}
                      SummaryChild={<h5 className="p-0 m-0 text-primary">Ticket</h5>}
                      search={true}
                      selected={packageDetails.ticket}
                      commonFunction={(e) => {
                        setPackageDetails((prev) => ({ ...prev, ticket: e.name }));
                        if (errors.ticket) setErrors((prev) => ({ ...prev, ticket: '' }));
                      }}
                      error={errors.ticket}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/packages/package-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddPackage;
