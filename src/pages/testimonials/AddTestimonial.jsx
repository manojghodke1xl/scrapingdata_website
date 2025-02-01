import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { getAllCategoriesApi } from '../../apis/category-apis';
import { showNotification } from '../../utils/showNotification';
import { addTestimonialApi, getTestimonialById, updateTestimonialApi } from '../../apis/testimonial-apis';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import DropDown from '../../atoms/formFields/DropDown';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import FileUpload from '../../atoms/formFields/FileUpload';
import { RiVideoUploadLine } from 'react-icons/ri';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addTestimonialNote, editTestimonialNote } from './TestimonialNotes';
import { FaRegImage } from 'react-icons/fa';

const AddTestimonial = () => {
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
  const [testimonialDetails, setTestimonialDetails] = useState({
    name: '',
    desg: '',
    text: '',
    type: 'text',
    isActive: true,
    isGlobal: false,
    videoBolean: false,
    sites: [],
    categories: [],
    // image: '',
    // video: '',
    videoUrl: ''
  });
  const [availableCategories, setAvailableCategories] = useState([]);
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllCategoriesApi();
      if (status) setAvailableCategories(data.categories);
      else showNotification('warn', data);
    })().catch((error) => showNotification('error', error.message));
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getTestimonialById(id);
        if (status) {
          const { image, video, sites, ...rest } = data.testimonial;
          setTestimonialDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            image: image && image._id,
            video: video && video._id,
            videoFile: video,
            imageFile: image
          }));
        } else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!testimonialDetails.name) newErrors.name = 'Name is required';
    if (!testimonialDetails.sites.length) newErrors.sites = 'At least one site must be selected';
    if (!testimonialDetails.categories.length) newErrors.categories = 'At least one category must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id
        ? isDuplicate
          ? addTestimonialApi(testimonialDetails)
          : updateTestimonialApi(id, testimonialDetails)
        : addTestimonialApi(testimonialDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/testimonials/testimonial-list');
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Testimonial</span>
        </div>
        <FormButtons to="/testimonials/testimonial-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Testimonial Details</span>
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
                  setTestimonialDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={testimonialDetails.name}
                errorMessage={errors.name}
              />
              <TextareaComponent
                divClassName="mt-5"
                label="Description"
                placeholder="Enter a description..."
                id="desg"
                name="desg"
                value={testimonialDetails.desg}
                onChange={(e) => setTestimonialDetails((prev) => ({ ...prev, desg: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Testimonial Type & Content</span>
          </div>
          <div className="dropdown-container relative w-full mt-2">
            <DropDown
              name="type"
              label={'Content Type'}
              SummaryChild={<h5 className="p-0 m-0 text-primary">{testimonialDetails.typeObj ? testimonialDetails.typeObj.showName : 'Text'}</h5>}
              dropdownList={[
                { id: 0, showName: 'Text', name: 'text' },
                { id: 1, showName: 'Image', name: 'image' },
                { id: 2, showName: 'Video', name: 'video' }
              ]}
              selected={testimonialDetails.type}
              search={true}
              commonFunction={(e) =>
                setTestimonialDetails((prev) => ({
                  ...prev,
                  type: e.name,
                  typeObj: e,
                  ...(e.name === 'image'
                    ? { videoBolean: false, video: undefined, text: '', videoUrl: '', videoFile: null }
                    : e.name === 'video'
                    ? { text: '', image: undefined, imageFile: null }
                    : { image: undefined, video: undefined, videoBolean: false, videoUrl: '', imageFile: null, videoFile: null })
                }))
              }
            />

            {testimonialDetails.type === 'image' && (
              <FileUpload
                divClassName={'mt-5'}
                logo={<FaRegImage className="text-primary text-2xl" />}
                error={errors.image}
                setErrors={setErrors}
                acceptedTypes={['.jpeg', '.png']}
                fieldName="image"
                isImage
                setDetails={setTestimonialDetails}
                imagePreviewUrl={testimonialDetails.imageFile?.url}
              />
            )}
            {testimonialDetails.type === 'text' && (
              <TextareaComponent
                divClassName="mt-5"
                label="Text"
                placeholder="Enter a text..."
                id="text"
                name="text"
                value={testimonialDetails.text}
                onChange={(e) => setTestimonialDetails((prev) => ({ ...prev, text: e.target.value }))}
              />
            )}
            {testimonialDetails.type === 'video' && (
              <>
                <ToggleComponent
                  label={'Switch to Url?'}
                  isEnableState={testimonialDetails.videoBolean}
                  setIsEnableState={(value) =>
                    setTestimonialDetails((prev) => ({
                      ...prev,
                      videoBolean: value,
                      ...(value ? { video: undefined, videoFile: null } : { videoUrl: '' })
                    }))
                  }
                />
                {testimonialDetails.videoBolean ? (
                  <div className="w-full flex flex-col gap-y-2">
                    <FormField
                      divClassName={'mt-5'}
                      label="Video URL"
                      type="text"
                      id="videoUrl"
                      name="videoUrl"
                      placeholder="Video URL"
                      onChange={(e) => setTestimonialDetails((prev) => ({ ...prev, videoUrl: e.target.value }))}
                      value={testimonialDetails.videoUrl}
                    />
                  </div>
                ) : (
                  <FileUpload
                    divClassName={'mt-5'}
                    logo={<RiVideoUploadLine className="text-primary text-2xl" />}
                    error={errors.video}
                    setErrors={setErrors}
                    acceptedTypes={['.mp4', '.quicktime']}
                    fieldName="video"
                    isVideo
                    setDetails={setTestimonialDetails}
                    imagePreviewUrl={testimonialDetails.videoFile?.url}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Site & Category</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <MultiSelectCheckbox
                options={availableSites
                  .filter((site) => site.modules?.some((module) => module.testimonial === true))
                  .map((site) => ({ name: `${site.name} (${site.host})`, _id: site._id }))}
                label="Select Sites"
                formLabel={'Select Sites'}
                onChange={(selected) => {
                  setTestimonialDetails((prev) => ({ ...prev, sites: selected }));
                  if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
                }}
                selected={testimonialDetails.sites}
                error={errors.sites}
              />

              <MultiSelectCheckbox
                divClassName={'mt-5'}
                options={availableCategories}
                label="Select Categories"
                formLabel={'Select Categories'}
                onChange={(selected) => {
                  setTestimonialDetails((prev) => ({ ...prev, categories: selected }));
                  if (errors.categories) setErrors((prev) => ({ ...prev, categories: '' }));
                }}
                selected={testimonialDetails.categories}
                error={errors.categories}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Status Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <ToggleComponent
                label={'Is Testimonial Active?'}
                isEnableState={testimonialDetails.isActive}
                setIsEnableState={(value) => setTestimonialDetails((prev) => ({ ...prev, isActive: value }))}
              />
              <ToggleComponent
                label={'Is Testimonial Global?'}
                isEnableState={testimonialDetails.isGlobal}
                setIsEnableState={(value) => setTestimonialDetails((prev) => ({ ...prev, isGlobal: value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editTestimonialNote : addTestimonialNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons
            to="/testimonials/testimonial-list"
            type="submit"
            onClick={handleSubmit}
            btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'}
            loading={isLoading}
          />
        </div>
      )}
    </div>
  );
};
export default AddTestimonial;
