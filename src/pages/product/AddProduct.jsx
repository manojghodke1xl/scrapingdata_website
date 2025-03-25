import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import useGlobalContext from '../../hooks/useGlobalContext';
import DropDown from '../../atoms/formFields/DropDown';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import { FaRegImage } from 'react-icons/fa';
import FileUpload from '../../atoms/formFields/FileUpload';
import MultipleFileUpload from '../../atoms/formFields/MultiFileUpload';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import { acceptedExtensions, acceptedProductTypes } from './productStaticData';
import FileTypesTooltip from '../../atoms/formFields/FileTypesTooltip';
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import { IoIosArrowDown } from 'react-icons/io';
import DateTimePicker from '../../atoms/formFields/DateTimePicker';
import { formatDateTime } from '../../utils/dateFormats';
import { addProductApi, getProductByIdApi, getProductsBySiteApi, updateProductApi } from '../../apis/product-apis';
import { showNotification } from '../../utils/showNotification';
import { getIntegrationBySite } from '../../apis/payment-integration-apis';

const AddProduct = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');
  const [isOpen, setIsOpen] = useState(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [siteProducts, setSiteProducts] = useState([]);

  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    shortDescription: '',
    saleEndDate: '',
    sku: '',
    inStock: false,
    manageInventry: false,
    onSale: false,
    upsell: false,
    crossSell: false,
    postPurchase: false,
    maximumQuantity: '',
    upsellProducts: [],
    crossSellProducts: [],
    postPurchaseProducts: [],
    stock: '',
    type: 'Physical',
    shippingDetails: [],
    currencies: [],
    price: {},
    salePrice: {},
    image: undefined,
    gallery: [],
    digitalProducts: [],
    site: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getProductByIdApi(id);
          if (status) {
            const { image, digitalProducts, gallery, site, ...rest } = data.product;
            setProductDetails((prev) => ({
              ...prev,
              ...rest,
              site: site ? site._id : '',
              siteData: site ? site : {},
              image: image ? image._id : undefined,
              imageFile: image ? image : {},
              digitalProducts: digitalProducts.length > 0 ? digitalProducts.map((product) => product?._id) : [],
              digitalProductsFile: digitalProducts.length > 0 ? digitalProducts.map((product) => ({ _id: product?._id, name: product?.name, url: product?.url })) : null,
              gallery: gallery.length > 0 ? gallery.map((product) => product?._id) : [],
              galleryFile: gallery.length > 0 ? gallery.map((product) => ({ _id: product?._id, url: product?.url })) : null
            }));
          } else showNotification('warn', data);
        } catch (error) {
          showNotification('error', error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, setLoading]);

  const getProductsBySite = useCallback(async () => {
    try {
      const { status, data } = await getProductsBySiteApi(productDetails.site);
      if (status) setSiteProducts(data.products);
    } catch (error) {
      showNotification('error', error.message);
    }
  }, [productDetails.site]);

  useEffect(() => {
    if (productDetails.site && siteProducts.length === 0) getProductsBySite();
  }, [getProductsBySite, productDetails.site, siteProducts.length]);

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z0-9-_]+( [a-zA-Z0-9-_]+)*$/;
    if (!productDetails.name.trim()) newErrors.name = 'Name is required';
    else if (!nameRegex.test(productDetails.name)) newErrors.name = 'Invalid name format';
    else if (productDetails.name.length > 30) newErrors.name = 'Name must be 30 characters or less';
    if (!productDetails.sku.trim()) newErrors.sku = 'Product SKU is required';
    if (!productDetails.type) newErrors.type = 'Product Type is required.';
    if (!productDetails.site) newErrors.site = 'Site is required.';
    if (productDetails.currencies.length === 0) newErrors.currencies = 'Currencies are required.';
    if (productDetails.type === 'Digital' && productDetails.digitalProducts.length === 0) newErrors.digitalProducts = 'At least one digital product is required.';

    if (productDetails.type === 'Physical') {
      if (productDetails.shippingDetails.length === 0) newErrors.shippingDetails = 'Shipping details are required.';
    }
    if (productDetails.onSale && !productDetails.saleEndDate) newErrors.saleEndDate = 'Sale end date is required.';

    if (productDetails.currencies.length > 0) {
      const newErrorsPrice = {};
      const newErrorsSalePrice = {};
      productDetails.currencies.forEach((currency) => {
        if (!productDetails.price?.[currency]) newErrorsPrice[currency] = `Price for ${currency} currency is required.`;
        if (productDetails.onSale && !productDetails.salePrice[currency]) newErrorsSalePrice[currency] = `Sale Price for ${currency} currency is required.`;

        if (productDetails.shippingDetails.length > 0) {
          productDetails.shippingDetails.forEach((shipping) => {
            if (shipping.charges) {
              Object.keys(shipping.charges).forEach((currency) => {
                if (shipping.charges[currency] === undefined || shipping.charges[currency] === '') {
                  newErrors.charges = newErrors.charges || {};
                  newErrors.charges[currency] = `Charges for ${currency} currency is required.`;
                }
              });
            }
          });
        }
      });

      if (Object.keys(newErrorsPrice).length > 0) newErrors.price = newErrorsPrice;
      if (Object.keys(newErrorsSalePrice).length > 0) newErrors.salePrice = newErrorsSalePrice;
    }

    if (productDetails.type === 'Digital' && productDetails.digitalProducts?.length === 0) newErrors.digitalProducts = 'At least one digital product is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addProductApi(productDetails) : updateProductApi(id, productDetails)) : addProductApi(productDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/products/product-list');
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
      const { status, data } = await getIntegrationBySite(productDetails.site);
      if (status) setPaymentData(data.payment);
      else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  }, [productDetails.site, setLoading]);

  useEffect(() => {
    if (productDetails.site) getIntegration();
  }, [getIntegration, productDetails.site, setLoading]);

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const relatedProducts = siteProducts.filter((pid) => (id ? pid._id !== id : pid));

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Product</span>
        </div>
        <FormButtons to="/products/product-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Site Association</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            {id && !isDuplicate ? (
              <h1 className="text-xl flex items-center gap-2 font-bold ">
                <span className="text-primary">Site:</span>
                <span className="text-primary font-semibold">{`${productDetails?.siteData?.name} ( ${productDetails?.siteData?.host} )`}</span>
              </h1>
            ) : (
              <DropDown
                name="Sites"
                dropdownList={availableSites.map((site) => ({ id: site._id, showName: `${site.name} (${site.host})`, name: site._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Sites</h5>}
                search={true}
                selected={productDetails.site}
                commonFunction={(e) => {
                  setProductDetails((prev) => ({ ...prev, site: e.name }));
                  if (errors.site) setErrors((prev) => ({ ...prev, site: '' }));
                }}
                error={errors.site}
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Product Information</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <FormField
              label="Product Name"
              type="text"
              id="name"
              name="name"
              required
              placeholder="Product Name"
              onChange={(e) => {
                setProductDetails((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              value={productDetails.name}
              errorMessage={errors.name}
            />
            <FormField
              label={'Product SKU'}
              type="text"
              id="sku"
              name="sku"
              required
              placeholder="Product SKU"
              onChange={(e) => {
                setProductDetails((prev) => ({ ...prev, sku: e.target.value }));
                if (errors.sku) setErrors((prev) => ({ ...prev, sku: '' }));
              }}
              value={productDetails.sku}
              errorMessage={errors.sku}
            />

            <TextareaComponent
              label="Short Description"
              placeholder="Enter a description..."
              id="shortDescription"
              name="shortDescription"
              value={productDetails.shortDescription}
              onChange={(e) => setProductDetails((prev) => ({ ...prev, shortDescription: e.target.value }))}
              errorMessage={errors.shortDescription}
              maxLength={100}
            />

            <TextareaComponent
              label="Description"
              placeholder="Enter a description..."
              id="info"
              name="info"
              value={productDetails.description}
              onChange={(e) => setProductDetails((prev) => ({ ...prev, description: e.target.value }))}
              errorMessage={errors.description}
            />

            <FormField
              label="Maximum Quantity of Product purchase per order"
              type="number"
              id="maximumQuantity"
              name="maximumQuantity"
              placeholder="Maximum Quantity"
              min={0}
              onChange={(e) => {
                setProductDetails((prev) => ({ ...prev, maximumQuantity: e.target.value }));
                if (errors.maximumQuantity) setErrors((prev) => ({ ...prev, maximumQuantity: '' }));
              }}
              value={productDetails.maximumQuantity}
              errorMessage={errors.maximumQuantity}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Media Upload</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <FileUpload
              logo={<FaRegImage className="text-primary text-2xl" />}
              error={errors.image}
              setErrors={setErrors}
              acceptedTypes={['.jpeg', '.jpg', '.png']}
              fieldName="image"
              isImage
              setDetails={setProductDetails}
              imagePreviewUrl={productDetails.imageFile?.url}
            />

            <MultipleFileUpload
              onUploadSuccess={(files) => {
                setProductDetails((prev) => ({ ...prev, gallery: [...(prev.gallery || []), ...files] }));
                if (errors.gallery) setErrors((prev) => ({ ...prev, gallery: '' }));
              }}
              onRemoveFile={(fileId) =>
                setProductDetails((prev) => ({ ...prev, gallery: prev.gallery.filter((f) => f !== fileId), galleryFile: prev.galleryFile?.filter((f) => f._id !== fileId) }))
              }
              selected={productDetails.galleryFile ?? []}
              isMultiple
              label="Upload Gallery"
              allowedTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml', 'video/mp4', 'video/quicktime']}
              allowedFileTypes={['.jpeg', '.jpg', '.png', '.gif', '.svg', '.mp4', '.mov']}
              setLoading={setLoading}
              error={errors.gallery}
            />

            {productDetails.type === 'Digital' && (
              <MultipleFileUpload
                label={'Upload Digital Products'}
                onUploadSuccess={(files) => {
                  setProductDetails((prev) => ({ ...prev, digitalProducts: [...(prev.digitalProducts || []), ...files] }));
                  if (errors.digitalProducts) setErrors((prev) => ({ ...prev, digitalProducts: '' }));
                }}
                onRemoveFile={(fileId) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    digitalProducts: prev.digitalProducts.filter((f) => f !== fileId),
                    digitalProductsFile: prev.digitalProductsFile?.filter((f) => f._id !== fileId)
                  }))
                }
                isMultiple
                selected={productDetails?.digitalProductsFile ?? []}
                allowedTypes={acceptedProductTypes}
                allowedFileTypes={acceptedExtensions}
                toolTip={<FileTypesTooltip />}
                setLoading={setLoading}
                error={errors.digitalProducts}
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Related Products</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <ToggleComponent
              label={'Product up-sell ?'}
              isEnableState={productDetails.upsell}
              tooltipContent={'When enabled, customers who purchase this product will be recommended to purchase other products you have selected as up-sell products.'}
              setIsEnableState={(e) => setProductDetails((prev) => ({ ...prev, upsell: e, upsellProducts: [] }))}
              errorMessage={errors.upsell}
            />

            {productDetails.upsell && (
              <MultiSelectCheckbox
                label={'Select up-sell Products'}
                options={relatedProducts}
                selected={productDetails.upsellProducts}
                onChange={(e) => setProductDetails((prev) => ({ ...prev, upsellProducts: e }))}
              />
            )}

            <ToggleComponent
              label={'Product cross-sell ?'}
              isEnableState={productDetails.crossSell}
              tooltipContent={'When enabled, customers who purchase this product will be recommended to purchase other products you have selected as cross-sell products.'}
              setIsEnableState={(e) => setProductDetails((prev) => ({ ...prev, crossSell: e, crossSellProducts: [] }))}
              errorMessage={errors.crossSell}
            />

            {productDetails.crossSell && (
              <MultiSelectCheckbox
                label={'Select cross-sell Products'}
                options={relatedProducts}
                selected={productDetails.crossSellProducts}
                onChange={(e) => setProductDetails((prev) => ({ ...prev, crossSellProducts: e }))}
              />
            )}

            <ToggleComponent
              label={'Product post-purchase ?'}
              isEnableState={productDetails.postPurchase}
              tooltipContent={'When enabled, customers who purchase this product will be recommended to purchase other products you have selected as post-purchase products.'}
              setIsEnableState={(e) => setProductDetails((prev) => ({ ...prev, postPurchase: e, postPurchaseProducts: [] }))}
              errorMessage={errors.postPurchase}
            />

            {productDetails.postPurchase && (
              <MultiSelectCheckbox
                label={'Select post-purchase Products'}
                options={relatedProducts}
                selected={productDetails.postPurchaseProducts}
                onChange={(e) => setProductDetails((prev) => ({ ...prev, postPurchaseProducts: e }))}
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Product Type</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <DropDown
              name="type"
              label="Product Type"
              dropdownList={[
                { id: 0, showName: 'Physical', name: 'Physical' },
                { id: 1, showName: 'Digital', name: 'Digital' }
              ]}
              SummaryChild={<h5 className="p-0 m-0 text-primary">Type</h5>}
              search={true}
              selected={productDetails.type}
              commonFunction={(e) => {
                setProductDetails((prev) => {
                  const updatedDetails = { ...prev, type: e.name };
                  if (e.name === 'Physical') return { ...updatedDetails, digitalProducts: [] };
                  return { ...updatedDetails, shippingDetails: [], manageInventry: false, stock: 0, inStock: false };
                });
              }}
              error={errors.type}
            />
            {productDetails.type === 'Physical' && (
              <ToggleComponent
                label={'Manage Inventory'}
                isEnableState={productDetails.manageInventry}
                tooltipContent={'When enabled, you can track the stock of your product.'}
                setIsEnableState={(e) => setProductDetails((prev) => ({ ...prev, manageInventry: e, stock: 0, inStock: false }))}
                errorMessage={errors.manageInventry}
              />
            )}

            <ToggleComponent
              label={'Product on Sale ?'}
              isEnableState={productDetails.onSale}
              tooltipContent={'When enabled, you can set a sale price and sale end date for your product.'}
              setIsEnableState={(e) => setProductDetails((prev) => ({ ...prev, onSale: e, salePrice: {}, saleEndDate: '' }))}
              errorMessage={errors.onSale}
            />

            {(productDetails.type === 'Physical' || productDetails.type === 'Digital') && (
              <MultiSelectCheckbox
                formLabel={'Select the currencies you want to sell in your product'}
                label={'Select Currencies'}
                options={[
                  { _id: 'INR', name: 'INR' },
                  { _id: 'AED', name: 'AED' },
                  { _id: 'USD', name: 'USD' },
                  { _id: 'EUR', name: 'EUR' },
                  { _id: 'JPY', name: 'JPY' },
                  { _id: 'GBP', name: 'GBP' }
                ]}
                onChange={(selected) => {
                  const supportedRegions = {
                    INR: paymentData?.razorpay?.supports?.INR || paymentData?.stripe?.supports?.INR || paymentData?.paypal?.supports?.INR || paymentData?.phonepe?.supports?.INR,
                    AED: paymentData?.razorpay?.supports?.AED || paymentData?.stripe?.supports?.AED || paymentData?.paypal?.supports?.AED,
                    USD: paymentData?.razorpay?.supports?.USD || paymentData?.stripe?.supports?.USD || paymentData?.paypal?.supports?.USD,
                    EUR: paymentData?.razorpay?.supports?.EUR || paymentData?.stripe?.supports?.EUR || paymentData?.paypal?.supports?.EUR,
                    JPY: paymentData?.razorpay?.supports?.JPY || paymentData?.stripe?.supports?.JPY || paymentData?.paypal?.supports?.JPY,
                    GBP: paymentData?.razorpay?.supports?.GBP || paymentData?.stripe?.supports?.GBP || paymentData?.paypal?.supports?.GBP
                  };

                  if (!selected.every((currency) => supportedRegions[currency])) {
                    if (!productDetails.site) setErrors({ ...errors, currencies: 'Site is required to select currencies' });
                    else setErrors({ ...errors, currencies: 'Please select only supported currencies' });
                    return;
                  }

                  setProductDetails((prev) => ({
                    ...prev,
                    currencies: selected,
                    price: selected.reduce((acc, currency) => ({ ...acc, [currency]: '' }), {}),
                    salePrice: selected.reduce((acc, currency) => ({ ...acc, [currency]: '' }), {})
                  }));
                  if (errors.currencies) setErrors({ ...errors, currencies: '' });
                }}
                selected={productDetails.currencies}
                error={errors.currencies}
              />
            )}

            {productDetails.type === 'Physical' && (
              <MultiSelectCheckbox
                formLabel={'Select the Shipping Destinations you want to sell in your product'}
                label={'Select Shipping Destinations'}
                options={[
                  { _id: 'india', name: 'India' },
                  { _id: 'uae', name: 'UAE' },
                  { _id: 'restOfTheWorld', name: 'World' }
                ]}
                onChange={(selected) => {
                  const newShippingDetails = selected.map((destination) => ({ destination }));
                  setProductDetails((prev) => ({
                    ...prev,
                    shippingDetails: newShippingDetails
                  }));
                  if (errors.shippingDetails) setErrors({ ...errors, shippingDetails: '' });
                }}
                selected={productDetails.shippingDetails.map((item) => item.destination)}
                error={errors.shippingDetails}
              />
            )}

            {productDetails.onSale && (
              <DateTimePicker
                id={'saleEndDate'}
                label="Sale End Date"
                placeholder={formatDateTime(new Date())}
                selectedDateTime={productDetails.saleEndDate}
                setSelectedDateTime={(date) => {
                  setProductDetails((prev) => ({ ...prev, saleEndDate: date }));
                  if (errors.saleEndDate) setErrors((prev) => ({ ...prev, saleEndDate: '' }));
                }}
                errorMessage={errors.saleEndDate}
              />
            )}
          </div>
        </div>
      </div>

      {productDetails.currencies.length > 0 && (
        <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block text-primary">Pricing</span>
            </div>
            <div className="w-full flex flex-col gap-y-5">
              {productDetails.currencies.map((currency) => (
                <div key={currency} className="flex md:flex-row flex-col items-center justify-between md:gap-5">
                  <FormField
                    label={`Price (${currency}) is inclusive of tax`}
                    type="number"
                    id={`price-${currency}`}
                    name={`price-${currency}`}
                    placeholder={`Price (${currency}) is inclusive of tax`}
                    min={0}
                    onChange={(e) => {
                      setProductDetails((prev) => ({ ...prev, price: { ...prev.price, [currency]: e.target.value } }));
                      if (errors.price?.[currency]) setErrors((prev) => ({ ...prev, price: { ...prev.price, [currency]: '' } }));
                    }}
                    value={productDetails.price?.[currency] ?? ''}
                    errorMessage={errors.price?.[currency]}
                  />
                  {productDetails.onSale && (
                    <FormField
                      label={`Sale Price (${currency})`}
                      type="number"
                      id={`salePrice-${currency}`}
                      name={`salePrice-${currency}`}
                      placeholder={`Sale Price (${currency})`}
                      min={0}
                      onChange={(e) => {
                        setProductDetails((prev) => ({ ...prev, salePrice: { ...prev.salePrice, [currency]: e.target.value } }));
                        if (errors.salePrice?.[currency]) setErrors((prev) => ({ ...prev, salePrice: { ...prev.salePrice, [currency]: '' } }));
                      }}
                      value={productDetails.salePrice?.[currency] ?? ''}
                      errorMessage={errors.salePrice?.[currency]}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {productDetails.shippingDetails.length > 0 && (
        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary">Shipping Charges</span>
            </div>
            <div className="w-full flex flex-col gap-y-5">
              {productDetails.shippingDetails.map((shipping) => (
                <div key={shipping.destination}>
                  <Accordion
                    open={isOpen === shipping.destination}
                    icon={<IoIosArrowDown className={`${isOpen === shipping.destination ? 'rotate-180' : ''} h-4 w-4 transition-transform`} />}
                    className={`bg-transparent text-base ${isOpen === shipping.destination ? 'bg-grey border border-primary' : ''}  rounded-xl`}
                  >
                    <AccordionHeader
                      onClick={() => setIsOpen(isOpen === shipping.destination ? null : shipping.destination)}
                      className={`py-2.5 px-3 text-left text-base flex gap-2 items-center border ${
                        isOpen === shipping.destination ? 'rounded-t-xl' : 'rounded-xl'
                      } border-primary shadow-none focus:outline-none bg-inherit text-primary`}
                    >
                      <div className="flex gap-4 items-center">
                        <span>{capitalizeFirstLetter(shipping.destination === 'restOfTheWorld' ? 'Rest of the World' : shipping.destination)}</span>
                      </div>
                    </AccordionHeader>
                    <AccordionBody className="space-y-1 p-4">
                      <div className="flex md:flex-row flex-col items-center justify-between md:gap-5">
                        {productDetails.currencies.map((currency) => (
                          <div key={currency} className="flex flex-col gap-y-5">
                            <FormField
                              label={`Charges (${currency})`}
                              type="number"
                              id={`charges-${shipping.destination}-${currency}`}
                              name={`charges-${shipping.destination}-${currency}`}
                              placeholder={`Charges (${currency})`}
                              min={0}
                              onChange={(e) => {
                                const chargeValue = e.target.value;
                                setProductDetails((prev) => {
                                  const updatedShippingDetails = prev.shippingDetails.map((detail) => {
                                    if (detail.destination === shipping.destination) {
                                      return {
                                        ...detail,
                                        charges: {
                                          ...detail.charges,
                                          [currency]: chargeValue
                                        }
                                      };
                                    }
                                    return detail;
                                  });
                                  return { ...prev, shippingDetails: updatedShippingDetails };
                                });
                                if (errors.charges?.[currency]) setErrors((prev) => ({ ...prev, charges: { ...prev.charges, [currency]: '' } }));
                              }}
                              value={productDetails.shippingDetails.find((detail) => detail.destination === shipping.destination)?.charges?.[currency] ?? 0}
                              errorMessage={errors.charges?.[currency]}
                            />
                          </div>
                        ))}
                      </div>
                    </AccordionBody>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {productDetails.manageInventry && (
        <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary">Stock and Availability</span>
            </div>
            <div className="w-full flex flex-col gap-y-5">
              <ToggleComponent
                label={'In Stock'}
                isEnableState={productDetails.inStock}
                tooltipContent={'If product is in stock, it will be visible to the users.'}
                setIsEnableState={(e) => setProductDetails((prev) => ({ ...prev, inStock: e }))}
                errorMessage={errors.inStock}
              />
              <FormField
                label="Stock"
                type="number"
                id="stock"
                name="stock"
                placeholder="Stock"
                min={1}
                onChange={(e) => {
                  setProductDetails((prev) => ({ ...prev, stock: e.target.value }));
                  if (errors.stock) setErrors((prev) => ({ ...prev, stock: '' }));
                }}
                value={productDetails.stock}
                errorMessage={errors.stock}
              />
            </div>
          </div>
        </div>
      )}

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/products/product-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddProduct;
