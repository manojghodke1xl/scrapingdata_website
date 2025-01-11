import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useEffect, useState } from 'react';
import { showNotification } from '../../utils/showNotification';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import DropDown from '../../atoms/formFields/DropDown';

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
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    salePrice: '',
    saleEndDate: null,
    inStock: true,
    stock: 0,
    sell: 0,
    type: '',
    shippingDestinations: {
      india: false,
      uae: false,
      restOfTheWorld: false
    },
    digitalFileType: '',
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
    if (!productDetails.price && !productDetails.price < 0) newErrors.price = 'Price should be greater than 0';
    if (!productDetails.salePrice) newErrors.salePrice = 'Discount Price is required';
    if (!productDetails.inStock) newErrors.inStock = 'In Stock is required';
    if (!productDetails.type) newErrors.type = 'Type is required';
    if (productDetails.type === 'physical' && !productDetails.shippingDestinations) newErrors.shippingDestinations = 'At least one Shipping Destinations is required';
    if (!productDetails.site) newErrors.site = 'Site is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // try {
    //   const { status, data } = await (id ? updateProductApi(id, productDetails) : addProductApi(productDetails));
    //   if (status) {
    //     showNotification('success', data.message);
    //     navigate('/coupon/coupon-list');
    //   } else showNotification('warn', data);
    // } catch (error) {
    //   showNotification('error', error.message);
    // } finally {
    //   setLoading(false);
    // }
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
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Product</span>
        </div>
        <FormButtons to="/coupon/coupon-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
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
                label="Description"
                placeholder="Enter a description..."
                id="info"
                name="info"
                value={productDetails.description}
                onChange={(e) => setProductDetails((prev) => ({ ...prev, description: e.target.value }))}
                charCount={false}
                errorMessage={errors.description}
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
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Pricing</span>
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
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editCouponNote : addCouponNote} />
      </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/coupon/coupon-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddProduct;
