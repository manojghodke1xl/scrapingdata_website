import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { addGuideApi, getGuideById, updateGuideApi } from '../../apis/guide-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import FileUpload from '../../atoms/formFields/FileUpload';
import { BsFilePdf } from 'react-icons/bs';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addGuideNote, editGuideNote } from './GuideNotes';
import { FaRegImage } from 'react-icons/fa';

const AddGuides = () => {
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
  const [guideDetails, setGuideDetails] = useState({
    title: '',
    desc: '',
    image: '',
    pdf: '',
    mailSubject: '',
    mailBody: '',
    isActive: true,
    isGlobal: false,
    sites: []
  });
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
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getGuideById(id);
        if (status) {
          const { image, pdf, sites, ...rest } = data.guide;
          setGuideDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            pdf: pdf ? pdf?._id : '',
            image: image ? image?._id : '',
            pdfFile: pdf,
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
    const titleRegex = /^[a-zA-Z0-9-_]+( [a-zA-Z0-9-_]+)*$/;
    if (!guideDetails.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (!titleRegex.test(guideDetails.title)) {
      newErrors.title = 'Invalid title format';
    } else if (guideDetails.title.length > 30) {
      newErrors.title = 'Title must be 30 characters or less';
    }
    if (guideDetails.sites.length === 0) newErrors.sites = 'At least one site must be selected';
    if (!guideDetails.mailSubject.trim()) newErrors.mailSubject = 'Subject is required';
    if (!guideDetails.mailBody.trim()) newErrors.mailBody = 'Body is required';
    if (!guideDetails.image) newErrors.image = 'Image is required';
    if (!guideDetails.pdf) newErrors.pdf = 'PDF is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addGuideApi(guideDetails) : updateGuideApi(id, guideDetails)) : addGuideApi(guideDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/guides/guides-list');
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
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Guide</span>
        </div>
        <FormButtons to="/guides/guides-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Basic Information</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <FormField
              label="Title"
              type="text"
              id="title"
              name="title"
              required
              placeholder="Title"
              onChange={(e) => {
                setGuideDetails((prev) => ({ ...prev, title: e.target.value }));
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              value={guideDetails.title}
              errorMessage={errors.title}
            />
            <TextareaComponent
              label="Description"
              placeholder="Enter a description..."
              id="desc"
              name="desc"
              value={guideDetails.desc}
              onChange={(e) => setGuideDetails((prev) => ({ ...prev, desc: e.target.value }))}
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
              acceptedTypes={['.jpeg', '.png']}
              fieldName="image"
              isImage
              setDetails={setGuideDetails}
              imagePreviewUrl={guideDetails.imageFile?.url}
            />
            <FileUpload
              logo={<BsFilePdf className="text-primary text-2xl" />}
              error={errors.pdf}
              setErrors={setErrors}
              acceptedTypes={['.pdf']}
              fieldName="pdf"
              isPdf
              setDetails={setGuideDetails}
              imagePreviewUrl={guideDetails.pdfFile?.name}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Site & Global Settings</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <MultiSelectCheckbox
              options={availableSites}
              label="Select Sites"
              onChange={(selected) => {
                setGuideDetails((prev) => ({ ...prev, sites: selected }));
                if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
              }}
              selected={guideDetails.sites}
              error={errors.sites}
            />
            <ToggleComponent
              label={'Is Guide Active?'}
              isEnableState={guideDetails.isActive}
              tooltipContent={'If Guide is active, it will be visible to the users.'}
              setIsEnableState={(value) => setGuideDetails((prev) => ({ ...prev, isActive: value }))}
            />
            <ToggleComponent
              label={'Is Guide Global?'}
              isEnableState={guideDetails.isGlobal}
              tooltipContent={'If Guide is global, it will be visible to all sites.'}
              setIsEnableState={(value) => setGuideDetails((prev) => ({ ...prev, isGlobal: value }))}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Email Configuration</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <FormField
              label="Subject"
              type="text"
              id="mailSubject"
              name="mailSubject"
              required
              placeholder="Subject"
              onChange={(e) => {
                setGuideDetails((prev) => ({ ...prev, mailSubject: e.target.value }));
                if (errors.mailSubject) setErrors((prev) => ({ ...prev, mailSubject: '' }));
              }}
              value={guideDetails.mailSubject}
              errorMessage={errors.mailSubject}
            />
            <TextareaComponent
              divClassName="mt-5"
              label="Body"
              placeholder="Body"
              id="mailBody"
              name="mailBody"
              required
              value={guideDetails.mailBody}
              onChange={(e) => {
                setGuideDetails((prev) => ({ ...prev, mailBody: e.target.value }));
                if (errors.mailBody) setErrors((prev) => ({ ...prev, mailBody: '' }));
              }}
              errorMessage={errors.mailBody}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editGuideNote : addGuideNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/guides/guides-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddGuides;
