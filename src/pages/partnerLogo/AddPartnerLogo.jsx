import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import useGetAllSites from '../../hooks/useGetAllSites';
import { addPartnerLogoApi, getPartnerLogoById, updatePartnerLogoApi } from '../../apis/partner-logo-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import MultipleFileUpload from '../../atoms/formFields/MultiFileUpload';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';

const AddPartnerLogo = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading } = useContext(GlobalContext);
  const availableSites = useGetAllSites();

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [partnerlogoDetails, setPartnerLogoDetails] = useState({
    images: !id ? [] : undefined,
    isActive: true,
    isGlobal: false,
    sites: []
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getPartnerLogoById(id);
        if (status) {
          const { image, sites, ...rest } = data.partnerlogo;

          setPartnerLogoDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            images: image._id ? [...image._id] : [],
            imageFile: image
          }));
        } else {
          showNotification('warn', data);
        }
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!id && !partnerlogoDetails.images?.length) newErrors.images = 'At least one image is needed';
    if (partnerlogoDetails.sites.length === 0) newErrors.sites = 'At least one site must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updatePartnerLogoApi(id, partnerlogoDetails) : addPartnerLogoApi(partnerlogoDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/partner-logo/partner-logo-list');
      } else {
        showNotification('warn', data);
      }
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
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Partner Logo</span>
        </div>
        <FormButtons to="/partner-logo/partner-logo-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Logo Upload Details</span>
          </div>
          <div className="w-full">
            <div>
              <MultipleFileUpload
                onUploadSuccess={(files) => {
                  setPartnerLogoDetails((prev) => ({ ...prev, images: files }));
                  if (errors.images) setErrors((prev) => ({ ...prev, images: '' }));
                }}
                id={id}
                isMultiple={!id}
                imagePreviewUrl={partnerlogoDetails.imageFile?.url}
                setLoading={setLoading}
                error={errors.images}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Site and Visibility Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <MultiSelectCheckbox
                options={availableSites}
                label="Select Sites"
                onChange={(selected) => {
                  setPartnerLogoDetails((prev) => ({ ...prev, sites: selected }));
                  if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
                }}
                selected={partnerlogoDetails.sites}
                error={errors.sites}
              />
              <ToggleComponent
                label={'Is Partner Logo Active?'}
                isEnableState={partnerlogoDetails.isActive}
                setIsEnableState={(value) => setPartnerLogoDetails((prev) => ({ ...prev, isActive: value }))}
              />
              <ToggleComponent
                label={'Is Partner Logo Global?'}
                isEnableState={partnerlogoDetails.isGlobal}
                setIsEnableState={(value) => setPartnerLogoDetails((prev) => ({ ...prev, isGlobal: value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
    <NoteComponent note={id ? editAdminNote : addAdminNote} />
  </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/partner-logo/partner-logo-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
        </div>
      )}
    </div>
  );
};

export default AddPartnerLogo;
