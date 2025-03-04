import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { addCouponApi, getCouponByIdApi, updateCouponApi } from '../../apis/coupon';
import { showNotification } from '../../utils/showNotification';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import FormButtons from '../../atoms/formFields/FormButtons';
import DropDown from '../../atoms/formFields/DropDown';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import DateTimePicker from '../../atoms/formFields/DateTimePicker';
import { formatDateTime } from '../../utils/dateFormats';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addCouponNote, editCouponNote } from './CouponNotes';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';

const AddCoupon = () => {
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
  const [couponDetails, setCouponDetails] = useState({
    code: '',
    info: '',
    startDate: new Date(),
    endDate: '',
    minAmount: '',
    type: '',
    upto: '',
    value: '',
    sites: [],
    isActive: true,
    isGlobal: false,
    useOnce: false,
    firstSub: false
  });

  const validate = () => {
    const newErrors = {};
    if (!couponDetails.code.trim()) newErrors.code = 'Coupon Code is required.';
    if (!couponDetails.info.trim()) newErrors.info = 'Description is required.';
    if (!couponDetails.startDate) newErrors.startDate = 'Start Date is required.';
    if (!couponDetails.endDate) newErrors.endDate = 'End Date is required.';
    if (!couponDetails.type) newErrors.type = 'Coupon Type is required.';
    if (!couponDetails.value) newErrors.value = 'Discount value is required.';
    if (couponDetails.type === 'percentage' && (couponDetails.value < 1 || couponDetails.value > 100))
      newErrors.value = 'Discount value should be between 1 and 100 as type is percentage.';
    if (couponDetails.sites.length === 0) newErrors.sites = 'At least one site must be selected.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getCouponByIdApi(id);
          if (status) setCouponDetails(data.coupon);
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
      const { status, data } = await (id ? (isDuplicate ? addCouponApi(couponDetails) : updateCouponApi(id, couponDetails)) : addCouponApi(couponDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/coupon/coupon-list');
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
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Coupon</span>
        </div>
        <FormButtons to="/coupon/coupon-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Coupon Details</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <FormField
              label="Coupon Code"
              type="text"
              id="code"
              name="code"
              required
              placeholder="Coupon Code"
              onChange={(e) => {
                setCouponDetails((prev) => ({ ...prev, code: e.target.value }));
                if (errors.code) setErrors((prev) => ({ ...prev, code: '' }));
              }}
              value={couponDetails.code}
              errorMessage={errors.code}
            />
            <TextareaComponent
              label="Coupon Description"
              placeholder="Enter a description..."
              id="info"
              required
              name="info"
              value={couponDetails.info}
              onChange={(e) => setCouponDetails((prev) => ({ ...prev, info: e.target.value }))}
              errorMessage={errors.info}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Vadidity Period</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <DateTimePicker
              id={'startDate'}
              label={'Start Date'}
              placeholder={formatDateTime(new Date())}
              selectedDateTime={couponDetails.startDate}
              setSelectedDateTime={(e) => {
                setCouponDetails((prev) => ({ ...prev, startDate: e }));
                if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: '' }));
              }}
              errorMessage={errors.startDate}
            />
            <DateTimePicker
              id={'endDate'}
              label={'End Date'}
              placeholder={formatDateTime(new Date())}
              selectedDateTime={couponDetails.endDate}
              setSelectedDateTime={(e) => {
                setCouponDetails((prev) => ({ ...prev, endDate: e }));
                if (errors.endDate) setErrors((prev) => ({ ...prev, endDate: '' }));
              }}
              errorMessage={errors.endDate}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Discount Details</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <FormField
              label="Minimum Amount"
              type="text"
              id="minAmount"
              name="minAmount"
              placeholder="Minimum Amount"
              value={couponDetails.minAmount}
              onChange={(e) => setCouponDetails((prev) => ({ ...prev, minAmount: e.target.value }))}
            />
            <DropDown
              name="type"
              label="Discount Type"
              SummaryChild={<h5 className="p-0 m-0 text-primary">{couponDetails.typeObject?.showName || 'Coupon Type'}</h5>}
              dropdownList={[
                { id: 0, showName: 'Percentage', name: 'percentage' },
                { id: 1, showName: 'Amount', name: 'amount' }
              ]}
              selected={couponDetails.type}
              search={true}
              commonFunction={(e) => {
                setCouponDetails((prev) => ({ ...prev, type: e.name, typeObject: e }));
                if (errors.type) setErrors((prev) => ({ ...prev, type: '' }));
              }}
              error={errors.type}
            />
            <FormField
              label="Discount Value"
              type="number"
              id="value"
              name="value"
              required
              placeholder="Discount Value"
              onChange={(e) => {
                setCouponDetails((prev) => ({ ...prev, value: e.target.value }));
                if (errors.value) setErrors((prev) => ({ ...prev, value: '' }));
              }}
              value={couponDetails.value}
              errorMessage={errors.value}
            />
            <FormField
              label="Discount Upto"
              type="number"
              id="upto"
              name="upto"
              placeholder="Discount Upto"
              onChange={(e) => setCouponDetails((prev) => ({ ...prev, upto: e.target.value }))}
              value={couponDetails.upto}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Coupon Settings</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <MultiSelectCheckbox
              options={availableSites
                .filter((site) => site.modules?.some((module) => module.coupon === true))
                .map((site) => ({ name: `${site.name} (${site.host})`, _id: site._id }))}
              label="Select Sites"
              onChange={(selected) => {
                setCouponDetails((prev) => ({ ...prev, sites: selected }));
                if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
              }}
              selected={couponDetails.sites}
              error={errors.sites}
            />
            <ToggleComponent
              label={'Is Coupon Active?'}
              tooltipContent={'If coupon active is active, it will be visible to the users.'}
              isEnableState={couponDetails.isActive}
              setIsEnableState={(value) => setCouponDetails((prev) => ({ ...prev, isActive: value }))}
            />
            <ToggleComponent
              label={'New User Only?'}
              tooltipContent={'If new user only is active, it will be visible to the new users only.'}
              isEnableState={couponDetails.firstSub}
              setIsEnableState={(value) => setCouponDetails((prev) => ({ ...prev, firstSub: value }))}
            />

            <ToggleComponent
              label={'Use Only Once?'}
              tooltipContent={'If use only once is active, it will can be used only once.'}
              isEnableState={couponDetails.useOnce}
              setIsEnableState={(value) => setCouponDetails((prev) => ({ ...prev, useOnce: value }))}
            />
            <ToggleComponent
              label={'Is Coupon Global?'}
              tooltipContent={'If coupon global, it will be visible to all sites.'}
              isEnableState={couponDetails.isGlobal}
              setIsEnableState={(value) => setCouponDetails((prev) => ({ ...prev, isGlobal: value }))}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editCouponNote : addCouponNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/coupon/coupon-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddCoupon;
