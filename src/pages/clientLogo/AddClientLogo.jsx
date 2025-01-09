import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { addClientLogoApi, getClientLogoById, updateClientLogoApi } from '../../apis/client-logo-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import MultipleFileUpload from '../../atoms/formFields/MultiFileUpload';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addClientLogoNote, editClientLogoNote } from './ClientLogoNotes';

const AddClientLogo = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [clientlogoDetails, setClientLogoDetails] = useState({
    images: !id ? [] : undefined,
    isActive: true,
    isGlobal: false,
    sites: []
  });

  const validate = () => {
    const newErrors = {};
    if (!id && !clientlogoDetails.images?.length) newErrors.images = 'At least one image is needed';
    if (clientlogoDetails.sites.length === 0) newErrors.sites = 'At least one site must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getClientLogoById(id);
        if (status) {
          const { image, sites, ...rest } = data.clientlogo;
          setClientLogoDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            images: image._id ? [...image._id] : [],
            imageFile: image
          }));
        } else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateClientLogoApi(id, clientlogoDetails) : addClientLogoApi(clientlogoDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/client-logo/client-logo-list');
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
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Client Logo</span>
        </div>
        <FormButtons to="/client-logo/client-logo-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
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
                  setClientLogoDetails((prev) => ({ ...prev, images: files }));
                  if (errors.images) setErrors((prev) => ({ ...prev, images: '' }));
                }}
                id={id}
                isMultiple={!id}
                imagePreviewUrl={clientlogoDetails.imageFile?.url}
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
                options={availableSites
                  .filter((site) => site.modules?.some((module) => module.clientlogo === true))
                  .map((site) => ({ name: `${site.name} (${site.host})`, _id: site._id }))}
                label="Select Sites"
                onChange={(selected) => {
                  setClientLogoDetails((prev) => ({ ...prev, sites: selected }));
                  if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
                }}
                selected={clientlogoDetails.sites}
                error={errors.sites}
              />
              <ToggleComponent
                label={'Is Client Logo Active?'}
                isEnableState={clientlogoDetails.isActive}
                setIsEnableState={(value) => setClientLogoDetails((prev) => ({ ...prev, isActive: value }))}
              />
              <ToggleComponent
                label={'Is Client Logo Global?'}
                isEnableState={clientlogoDetails.isGlobal}
                setIsEnableState={(value) => setClientLogoDetails((prev) => ({ ...prev, isGlobal: value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editClientLogoNote : addClientLogoNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/client-logo/client-logo-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddClientLogo;
