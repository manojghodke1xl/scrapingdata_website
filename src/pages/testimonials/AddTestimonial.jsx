import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { getAllTestimonialCategoriesApi } from '../../apis/testimonial-categories-apis';
import { showNotification } from '../../utils/showNotification';
import { addTestimonialApi, getTestimonialById, updateTestimonialApi } from '../../apis/testimonial-apis';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import DropDown from '../../atoms/formFields/DropDown';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addTestimonialNote, editTestimonialNote } from './TestimonialNotes';
import ImageUpload from '../../atoms/formFields/ImageUpload';

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
    videoUrl: '',
    profilePicture: null, // new
    image: null, // new
    video: null, // new
    profilePictureFile: null, // new
    cachedVideo: null,
    ratings: 5
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
      const { status, data } = await getAllTestimonialCategoriesApi();
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
          const { image, profilePicture, video, sites, ...rest } = data.testimonial;
          console.log(data.testimonial);
          setTestimonialDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            video: video,
            image: image,
            profilePicture: profilePicture,
            videoBolean: false,
          }));
        } else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z0-9-_]+( [a-zA-Z0-9-_]+)*$/;
    if (!testimonialDetails.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!nameRegex.test(testimonialDetails.name)) {
      newErrors.name = 'Invalid name format';
    } else if (testimonialDetails.name.length > 30) {
      newErrors.name = 'Name must be 30 characters or less';
    }
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
      const formData = new FormData();
      // Explicitly set required fields
      formData.set('name', testimonialDetails.name);
      formData.set('type', testimonialDetails.type);
      formData.set('isGlobal', testimonialDetails.isGlobal ? 'true' : 'false');
      formData.set('isActive', testimonialDetails.isActive ? 'true' : 'false');

      // Optional fields
      if (testimonialDetails.desg) formData.set('desg', testimonialDetails.desg);
      if (testimonialDetails.text) formData.set('text', testimonialDetails.text);
      if (testimonialDetails.videoUrl) formData.set('videoUrl', testimonialDetails.videoUrl);
      // Sites and categories (arrays)
      testimonialDetails.sites.forEach((siteId) => formData.append('sites[]', siteId));
      testimonialDetails.categories.forEach((catId) => formData.append('categories[]', catId));

      // Handle file uploads

      if (testimonialDetails.profilePicture?.file) {
        formData.set('profilePicture', testimonialDetails.profilePicture.file);
      } else {
        formData.set('profilePicture', testimonialDetails.profilePicture);
      }

      if (testimonialDetails.type === 'image' && testimonialDetails.image?.file) formData.set('image', testimonialDetails.image.file);

      if (testimonialDetails.type === 'video' && !testimonialDetails.videoBolean && testimonialDetails.video?.file) formData.set('video', testimonialDetails.video.file);

      formData.set('ratings', testimonialDetails.ratings);
      // Submit the form

      const { status, data } = await (id ? (isDuplicate ? addTestimonialApi(formData, true) : updateTestimonialApi(id, formData, true)) : addTestimonialApi(formData, true));

      if (status) {
        showNotification('success', data.message);
        navigate('/testimonials/testimonial-list');
      } else {
        showNotification('warn', data);
      }
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      const fieldName = 'profilePicture';
      const url = testimonialDetails?.[fieldName]?.url;
      if (url) URL.revokeObjectURL(url);
    };
  }, [testimonialDetails.profilePicture]);

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
          <div className="w-full flex flex-col gap-y-5">
            <FormField
              label="Name"
              type="text"
              id="name"
              name="name"
              required
              placeholder="Name"
              onChange={(e) => {
                setTestimonialDetails((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              value={testimonialDetails.name}
              errorMessage={errors.name}
            />
            <TextareaComponent
              label="Description / Designation"
              placeholder="Enter a description..."
              id="desg"
              name="desg"
              value={testimonialDetails.desg}
              onChange={(e) => setTestimonialDetails((prev) => ({ ...prev, desg: e.target.value }))}
            />

            <ImageUpload
              label="Testimonial Profile Picture"
              fieldName="profilePicture"
              details={testimonialDetails}
              setDetails={setTestimonialDetails}
              error={errors.profilePicture}
              setErrors={setErrors}
              acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
              maxFileSizeInMB={1}
              isImage={true}
            />

            <DropDown
              name="type"
              label={'Ratings'}
              SummaryChild={<h5 className="p-0 m-0 text-primary">{testimonialDetails.ratings ? testimonialDetails.ratings : 'Select the rating'}</h5>}
              dropdownList={[
                { id: 0, showName: '1', name: '1' },
                { id: 1, showName: '2', name: '2' },
                { id: 3, showName: '3', name: '3' },
                { id: 4, showName: '4', name: '4' },
                { id: 5, showName: '5', name: '5' }
              ]}
              selected={testimonialDetails.ratings}
              search={false}
              commonFunction={(item) => setTestimonialDetails((prev) => ({ ...prev, ratings: item.name }))}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Testimonial Type & Content</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
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
              <ImageUpload
                label="Testimonial Image"
                fieldName="image"
                details={testimonialDetails}
                setDetails={setTestimonialDetails}
                error={errors.image}
                setErrors={setErrors}
                acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                isImage={true}
                maxFileSizeInMB={1}
              />
            )}

            {testimonialDetails.type === 'text' && (
              <TextareaComponent
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
                  tooltipContent={'This toggle controls whether the video is uploaded or the video URL is entered.'}
                  setIsEnableState={(value) => {
                    setTestimonialDetails((prev) => {
                      if (value) {
                        // Switching to URL mode – cache existing video
                        return {
                          ...prev,
                          cachedVideo: prev.video,  // Save current video
                          video: undefined,
                          videoFile: null,
                          videoBolean: true
                        };
                      } else {
                        // Switching back to upload mode – restore cached video if exists
                        return {
                          ...prev,
                          video: prev.cachedVideo || undefined,
                          videoUrl: '',
                          videoBolean: false
                        };
                      }
                    });
                  }}
                />

                {testimonialDetails.videoBolean ? (
                  <div className="w-full flex flex-col gap-y-2">
                    <FormField
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
                  <>
                    <ImageUpload
                      label="Testimonial Video"
                      fieldName="video"
                      details={testimonialDetails}
                      setDetails={setTestimonialDetails}
                      error={errors.video}
                      setErrors={setErrors}
                      acceptedTypes={['video/mp4', 'video/webm', 'video/ogg']}
                      isVideo={true}
                      maxFileSizeInMB={100}
                    />

                  </>
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
          <div className="w-full flex flex-col gap-y-5">
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

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Status Settings</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <ToggleComponent
              label={'Is Testimonial Active?'}
              isEnableState={testimonialDetails.isActive}
              tooltipContent={'If Testimonial is active, it will be displayed on the site.'}
              setIsEnableState={(value) => setTestimonialDetails((prev) => ({ ...prev, isActive: value }))}
            />
            <ToggleComponent
              label={'Is Testimonial Global?'}
              isEnableState={testimonialDetails.isGlobal}
              tooltipContent={'If Testimonial is global, it will be displayed on all sites.'}
              setIsEnableState={(value) => setTestimonialDetails((prev) => ({ ...prev, isGlobal: value }))}
            />
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
