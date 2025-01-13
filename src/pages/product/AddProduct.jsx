import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useCallback, useEffect, useState } from 'react';
import { showNotification } from '../../utils/showNotification';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import DropDown from '../../atoms/formFields/DropDown';
import DateTimePicker from '../../atoms/formFields/DateTimePicker';
import { formatDateTime } from '../../utils/dateFormats';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import { getIntegrationBySite } from '../../apis/payment-integration-apis';
import { addProductApi, getProductByIdApi, updateProductApi } from '../../apis/product-apis';
import MultipleFileUpload from '../../atoms/formFields/MultiFileUpload';
import { acceptedExtensions, acceptedProductTypes } from './productStaticData';
import FileUpload from '../../atoms/formFields/FileUpload';
import { FaRegImage } from 'react-icons/fa';
import FileTypesTooltip from '../../atoms/formFields/FileTypesTooltip';

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

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentData, setPaymentData] = useState({});

  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    salePrice: '',
    saleEndDate: null,
    inStock: true,
    stock: 0,
    type: '',
    image: '',
    gallery: [],
    digitalProducts: [],
    shippingDestinations: {
      india: false,
      uae: false,
      restOfTheWorld: false
    },
    currencies: {
      INR: 0,
      AED: 0,
      USD: 0
    },
    site: ''
  });

  const validate = () => {
    const newErrors = {};
    if (!productDetails.name.trim()) newErrors.name = 'Name is required';
    if (!productDetails.price || productDetails.price < 0) newErrors.price = 'Price should be greater than 0';
    if (!productDetails.salePrice || productDetails.salePrice < 0) newErrors.salePrice = 'Discount Price should be greater than 0';
    if (!productDetails.inStock) newErrors.inStock = 'In Stock is required';
    if (!productDetails.type) newErrors.type = 'Type is required';
    if (productDetails.type === 'Physical') {
      if (productDetails.shippingDestinations.india === false && productDetails.shippingDestinations.uae === false && productDetails.shippingDestinations.restOfTheWorld === false)
        newErrors.shippingDestinations = 'At least one Shipping Destinations is required';
      if (productDetails.type === 'Physical' && Object.keys(paymentData).length === 0)
        newErrors.shippingDestinations = 'Please configure payment gateway to select the shipping destinations';
    }

    if (productDetails.type === 'Digital' && !productDetails.digitalProducts) newErrors.digitalProducts = 'Digital Product is required';

    if (!productDetails.site) newErrors.site = 'Site is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getProductByIdApi(id);
          if (status) {
            const { image, digitalProducts, gallery, ...rest } = data.product;
            setProductDetails((prev) => ({
              ...prev,
              ...rest,
              image: image ? image.url : '',
              imageFile: image ? image : {},
              digitalProducts: digitalProducts ? digitalProducts.map((product) => product._id) : '',
              digitalProductsFile: digitalProducts ? digitalProducts.map((product) => ({ _id: product._id, url: product.url })) : [],
              gallery: gallery ? gallery.map((product) => product._id) : [],
              galleryFile: gallery ? gallery.map((product) => ({ _id: product._id, url: product.url })) : []
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

  console.log(paymentData);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Product</span>
        </div>
        <FormButtons to="/products/product-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Site Settings</span>
          </div>
          <div className="w-full">
            <div>
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
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Product Information</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Product Name"
                type="text"
                id="name"
                name="name"
                placeholder="Product Name"
                onChange={(e) => {
                  setProductDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={productDetails.name}
                errorMessage={errors.name}
              />

              <TextareaComponent
                label="Short Description"
                placeholder="Enter a description..."
                id="shortDescription"
                name="shortDescription"
                value={productDetails.shortDescription}
                onChange={(e) => setProductDetails((prev) => ({ ...prev, shortDescription: e.target.value }))}
                charCount={false}
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
                charCount={false}
                errorMessage={errors.description}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Media Upload</span>
          </div>
          <div className="dropdown-container relative w-full mt-2">
            <FileUpload
              logo={<FaRegImage className="text-primary text-2xl" />}
              error={errors.image}
              setErrors={setErrors}
              acceptedTypes={['.jpeg', '.png']}
              fieldName="image"
              isImage
              setDetails={setProductDetails}
              imagePreviewUrl={productDetails.imageFile?.url}
            />

            <MultipleFileUpload
              divClassName={'mt-5'}
              onUploadSuccess={(files) => {
                setProductDetails((prev) => ({ ...prev, gallery: files }));
                if (errors.gallery) setErrors((prev) => ({ ...prev, gallery: '' }));
              }}
              id={id}
              isMultiple
              label="Upload Gallery"
              allowedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'video/mp4', 'video/quicktime']}
              allowedFileTypes={['.jpeg', '.png', '.gif', '.svg', '.mp4', '.mov']}
              imagePreviewUrl={productDetails?.galleryFile?.map((file) => file.url)}
              setLoading={setLoading}
              error={errors.gallery}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Product Type</span>
          </div>
          <div className="w-full">
            <div>
              <DropDown
                name="Sites"
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
                    return {
                      ...updatedDetails,
                      shippingDestinations: { india: false, uae: false, restOfTheWorld: false },
                      currencies: { INR: 0, AED: 0, USD: 0 }
                    };
                  });
                }}
                error={errors.type}
              />
              {productDetails.type === 'Physical' && (
                <MultiSelectCheckbox
                  divClassName={'mt-5'}
                  options={[
                    { _id: 'india', name: 'India' },
                    { _id: 'uae', name: 'UAE' },
                    { _id: 'restOfTheWorld', name: 'World' }
                  ]}
                  formLabel="Shipping Destinations"
                  label="Shipping Destinations"
                  onChange={(selected) => {
                    let error = '';

                    if (selected.includes('india') && (paymentData.razorpay.supports.INR || paymentData.stripe.supports.INR || paymentData.paypal.supports.INR)) {
                      setProductDetails((prevDetails) => ({
                        ...prevDetails,
                        shippingDestinations: {
                          ...prevDetails.shippingDestinations,
                          india: selected.includes('india')
                        }
                      }));
                    } else if (selected.includes('uae') && (paymentData.razorpay.supports.AED || paymentData.stripe.supports.AED || paymentData.paypal.supports.AED)) {
                      setProductDetails((prevDetails) => ({
                        ...prevDetails,
                        shippingDestinations: {
                          ...prevDetails.shippingDestinations,
                          uae: selected.includes('uae')
                        }
                      }));
                    } else if (selected.includes('restOfTheWorld') && (paymentData.razorpay.supports.USD || paymentData.stripe.supports.USD || paymentData.paypal.supports.USD)) {
                      setProductDetails((prevDetails) => ({
                        ...prevDetails,
                        shippingDestinations: {
                          ...prevDetails.shippingDestinations,
                          restOfTheWorld: selected.includes('restOfTheWorld')
                        }
                      }));
                    } else if (selected.includes('india') && (!paymentData.razorpay.supports.INR || !paymentData.stripe.supports.INR || !paymentData.paypal.supports.INR)) {
                      error = 'Please add support for INR currency in your payment gateway configuration';
                    } else if (selected.includes('uae') && (!paymentData.razorpay.supports.AED || !paymentData.stripe.supports.AED || !paymentData.paypal.supports.AED)) {
                      error = 'Please add support for AED currency in your payment gateway configuration';
                    } else if (
                      selected.includes('restOfTheWorld') &&
                      (!paymentData.razorpay.supports.USD || !paymentData.stripe.supports.USD || !paymentData.paypal.supports.USD)
                    ) {
                      error = 'Please add support for USD currency in your payment gateway configuration';
                    }
                    setErrors((prev) => ({ ...prev, shippingDestinations: error }));
                    setProductDetails((prevDetails) => ({
                      ...prevDetails,
                      shippingDestinations: {
                        ...prevDetails.shippingDestinations,
                        india: selected.includes('india'),
                        uae: selected.includes('uae'),
                        restOfTheWorld: selected.includes('restOfTheWorld')
                      }
                    }));
                    if (errors.shippingDestinations) setErrors((prev) => ({ ...prev, shippingDestinations: '' }));
                  }}
                  selected={Object.entries(productDetails?.shippingDestinations)
                    .filter(([, value]) => value)
                    .map(([key]) => key)}
                  error={errors?.shippingDestinations}
                />
              )}
              {productDetails.shippingDestinations.india && (
                <FormField
                  divClassName={'mt-5'}
                  label="INR Currency"
                  type="number"
                  id="currencies"
                  name="currencies"
                  placeholder="INR Currency"
                  onChange={(e) => {
                    setProductDetails((prev) => ({ ...prev, currencies: { ...prev.currencies, INR: e.target.value } }));
                    if (errors.Currency) setErrors((prev) => ({ ...prev, Currency: '' }));
                  }}
                  value={productDetails.currencies?.INR}
                  errorMessage={errors.Currency}
                />
              )}
              {productDetails.shippingDestinations.uae && (
                <FormField
                  divClassName={'mt-5'}
                  label="AED Currency"
                  type="number"
                  id="currencies"
                  name="currencies"
                  placeholder="AED Currency"
                  onChange={(e) => {
                    setProductDetails((prev) => ({ ...prev, currencies: { ...prev.currencies, AED: e.target.value } }));
                    if (errors.Currency) setErrors((prev) => ({ ...prev, Currency: '' }));
                  }}
                  value={productDetails.currencies?.AED}
                  errorMessage={errors.Currency}
                />
              )}
              {productDetails.shippingDestinations.restOfTheWorld && (
                <FormField
                  divClassName={'mt-5'}
                  label="USD Currency"
                  type="number"
                  id="currencies"
                  name="currencies"
                  placeholder="USD Currency"
                  onChange={(e) => {
                    setProductDetails((prev) => ({ ...prev, currencies: { ...prev.currencies, USD: e.target.value } }));
                    if (errors.Currency) setErrors((prev) => ({ ...prev, Currency: '' }));
                  }}
                  value={productDetails.currencies?.USD}
                  errorMessage={errors.Currency}
                />
              )}

              {productDetails.type === 'Digital' && (
                <MultipleFileUpload
                  divClassName={'mt-5'}
                  onUploadSuccess={(files) => {
                    setProductDetails((prev) => ({ ...prev, digitalProducts: files }));
                    if (errors.digitalProducts) setErrors((prev) => ({ ...prev, digitalProducts: '' }));
                  }}
                  id={id}
                  isMultiple={!id}
                  allowedTypes={acceptedProductTypes}
                  allowedFileTypes={acceptedExtensions}
                  toolTip={<FileTypesTooltip />}
                  imagePreviewUrl={productDetails?.digitalProductsFile?.map((file) => file.url)}
                  setLoading={setLoading}
                  error={errors.digitalProducts}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Pricing Information</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Price"
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                onChange={(e) => {
                  setProductDetails((prev) => ({ ...prev, price: e.target.value }));
                  if (errors.price) setErrors((prev) => ({ ...prev, price: '' }));
                }}
                value={productDetails.price}
                errorMessage={errors.price}
              />
              <FormField
                divClassName={'mt-5'}
                label="Discount Price"
                type="number"
                id="salePrice"
                name="salePrice"
                placeholder="Discount Price"
                onChange={(e) => {
                  setProductDetails((prev) => ({ ...prev, salePrice: e.target.value }));
                  if (errors.salePrice) setErrors((prev) => ({ ...prev, salePrice: '' }));
                }}
                value={productDetails.salePrice}
                errorMessage={errors.salePrice}
              />
              <DateTimePicker
                divClassName={'mt-5'}
                id={'saleEndDate'}
                label="Sale End Date"
                placeholder={formatDateTime(new Date())}
                selectedDateTime={productDetails.saleEndDate}
                setSelectedDateTime={(date) => setProductDetails((prev) => ({ ...prev, saleEndDate: date }))}
                errorMessage={errors.saleEndDate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Stock and Availability</span>
          </div>
          <div className="w-full">
            <div>
              <ToggleComponent
                label={'In Stock'}
                isEnableState={productDetails.inStock}
                setIsEnableState={(e) => setProductDetails((prev) => ({ ...prev, inStock: e }))}
                errorMessage={errors.inStock}
              />
              <FormField
                divClassName={'mt-5'}
                label="Stock"
                type="number"
                id="stock"
                name="stock"
                placeholder="Stock"
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
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editCouponNote : addCouponNote} />
      </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/products/product-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddProduct;
