import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { addGalleryApi, getGalleryById, updateGalleryApi } from '../../apis/gallery-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addGalleryNote, editGalleryNote } from './GalleryNotes';
import MultipleImageUpload from '../../atoms/formFields/MultipleImageUpload';

const AddGallery = () => {
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
  const [galleryDetails, setGalleryDetails] = useState({
    images: [],
    isActive: true,
    isGlobal: false,
    sites: [],
    imageFile: []
  });

  const validate = () => {
    const newErrors = {};
    if (!galleryDetails.imageFile.length) newErrors.imageFile = 'At least one image is needed.';
    if (!galleryDetails.sites.length) newErrors.sites = 'At least one site must be selected.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getGalleryById(id);
        if (status) {
          const { image, sites, ...rest } = data.gallery;

          // formatting image file when receiving url from backend
          const formattedImageFile = image.map((url) => ({
            url,
            name: url.split('/').pop(),
            file: null
          }));

          setGalleryDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            // images: image._id ? [image._id] : [],
            imageFile: formattedImageFile
          }));
        } else {
          showNotification('warn', data);
        }
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
      const formData = new FormData();

      formData.set('isGlobal', galleryDetails.isGlobal ? 'true' : 'false');
      formData.set('isActive', galleryDetails.isActive ? 'true' : 'false');
      galleryDetails.sites.forEach((siteId) => formData.append('sites[]', siteId));

      galleryDetails.imageFile.forEach((imageObj) => {
        if (imageObj.file) {
          // If it's a new upload
          formData.append('image', imageObj.file);
        } else if (imageObj.url) {
          // If it's an existing image from the backend
          formData.append('image', imageObj.url);
        }
      });

      const { status, data } = await (id ? (isDuplicate ? addGalleryApi(formData) : updateGalleryApi(id, formData)) : addGalleryApi(formData));
      if (status) {
        showNotification('success', data.message);
        navigate('/gallery/gallery-list');
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
    return () => {
      window.removeEventListener('resize', checkScrollability); // Cleanup event listener
    };
  }, []);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Gallery</span>
        </div>
        <FormButtons to="/gallery/gallery-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Logo Upload Details</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <MultipleImageUpload
              label="Gallery Images"
              selected={galleryDetails}
              onChange={(updatedImageFiles) => {
                setGalleryDetails((prev) => ({
                  ...prev,
                  imageFile: updatedImageFiles
                }));
              }}
              acceptedTypes={['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif']}
              maxFileSizeInMB={2}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Site and Visibility Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col gap-y-5">
              <MultiSelectCheckbox
                options={availableSites
                  .filter((site) => site.modules?.some((module) => module.gallery === true))
                  .map((site) => ({ name: `${site.name} (${site.host})`, _id: site._id }))}
                label="Select Sites"
                onChange={(selected) => {
                  setGalleryDetails((prev) => ({ ...prev, sites: selected }));
                  if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
                }}
                selected={galleryDetails.sites}
                error={errors.sites}
              />
              <ToggleComponent
                label={'Is Gallery Active?'}
                isEnableState={galleryDetails.isActive}
                tooltipContent={'If Gallery is active, it will be visible to the users.'}
                setIsEnableState={(value) => setGalleryDetails((prev) => ({ ...prev, isActive: value }))}
              />
              <ToggleComponent
                label={'Is Gallery Global?'}
                isEnableState={galleryDetails.isGlobal}
                tooltipContent={'If Gallery is global, it will be visible to all sites.'}
                setIsEnableState={(value) => setGalleryDetails((prev) => ({ ...prev, isGlobal: value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editGalleryNote : addGalleryNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/gallery/gallery-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddGallery;
