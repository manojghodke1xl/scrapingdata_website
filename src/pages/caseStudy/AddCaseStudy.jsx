import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { addCaseStudyApi, getCaseStudyById, updateCaseStudyApi } from '../../apis/caseStudy-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { BsFilePdf } from 'react-icons/bs';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addCasestudyNote, editCasestudyNote } from './CaseStudyNotes';
import ImageUpload from '../../atoms/formFields/ImageUpload';

const AddCaseStudy = () => {
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
  const [caseStudyDetails, setCaseStudyDetails] = useState({
    title: '',
    sdesc: '',
    ldesc: '',
    image: null,
    pdf: null,
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
        const { status, data } = await getCaseStudyById(id);
        if (status) {
          const { image, pdf, sites, ...rest } = data.casestudy;
          setCaseStudyDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            pdf: pdf._id ? pdf : null,
            image: image._id ? image : null,
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
    if (!caseStudyDetails.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (!titleRegex.test(caseStudyDetails.title)) {
      newErrors.title = 'Invalid title format';
    } else if (caseStudyDetails.title.length > 30) {
      newErrors.title = 'Title must be 30 characters or less';
    }
    if (!caseStudyDetails.sites.length) newErrors.sites = 'Minimum one site is required.';
    if (!caseStudyDetails.mailSubject.trim()) newErrors.mailSubject = 'Subject is required.';
    if (!caseStudyDetails.mailBody.trim()) newErrors.mailBody = 'Body is required.';
    if (!caseStudyDetails.image) newErrors.image = 'Image is required.';
    if (!caseStudyDetails.pdf) newErrors.pdf = 'PDF is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const formData = new FormData();

      formData.set('title', caseStudyDetails.title);
      formData.set('sdesc', caseStudyDetails.sdesc);
      formData.set('sdesc', caseStudyDetails.sdesc);
      formData.set('ldesc', caseStudyDetails.ldesc);
      formData.set('mailSubject', caseStudyDetails.mailSubject);
      formData.set('mailBody', caseStudyDetails.mailBody);
      formData.set('isActive', caseStudyDetails.isActive ? 'true' : 'false');
      formData.set('isGlobal', caseStudyDetails.isGlobal ? 'true' : 'false');
      caseStudyDetails.sites.forEach((siteId) => formData.append('sites[]', siteId));

      // Handle image uploads
      if (caseStudyDetails.image && caseStudyDetails.image.file) {
        // appending new file
        formData.append('image', caseStudyDetails.image.file);
      } else {
        // sending existing file
        formData.set('image', JSON.stringify(caseStudyDetails.image));
      }

      // Handle PDF uploads
      if (caseStudyDetails.pdf && caseStudyDetails.pdf.file) {
        // appending new file
        formData.append('pdf', caseStudyDetails.pdf.file);
      } else {
        // sending existing file
        formData.set('pdf', JSON.stringify(caseStudyDetails.pdf));
      }

      const { status, data } = await (id ? (isDuplicate ? addCaseStudyApi(formData) : updateCaseStudyApi(id, formData)) : addCaseStudyApi(formData));

      if (status) {
        showNotification('success', data.message);
        navigate('/case-study/case-study-list');
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      const fields = ['image', 'pdf'];
      fields.forEach((field) => {
        const url = caseStudyDetails?.[field]?.url;
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [caseStudyDetails]);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Case Study</span>
        </div>
        <FormButtons to="/case-study/case-study-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full  justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Case Study Information</span>
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
                setCaseStudyDetails((prev) => ({ ...prev, title: e.target.value }));
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              value={caseStudyDetails.title}
              errorMessage={errors.title}
            />
            <TextareaComponent
              label="Short Description"
              placeholder="Short description..."
              id="sdesc"
              name="sdesc"
              value={caseStudyDetails.sdesc}
              onChange={(e) => setCaseStudyDetails((prev) => ({ ...prev, sdesc: e.target.value }))}
            />
            <TextareaComponent
              label="Long Description"
              placeholder="Long description..."
              id="ldesc"
              name="ldesc"
              value={caseStudyDetails.ldesc}
              onChange={(e) => setCaseStudyDetails((prev) => ({ ...prev, ldesc: e.target.value }))}
              maxLength={1000}
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
            <ImageUpload
              label="Case Study Image"
              fieldName="image"
              details={caseStudyDetails}
              setDetails={setCaseStudyDetails}
              error={errors.image}
              setErrors={setErrors}
              acceptedTypes={['image/png', 'image/jpeg' ]}
              allowedFileTypes={['.png', '.jpeg' ]}
              maxFileSizeInMB={1}
              isImage={true}
            />

            <ImageUpload
              label="Case Study PDF"
              fieldName="pdf"
              details={caseStudyDetails}
              setDetails={setCaseStudyDetails}
              error={errors.pdf}
              setErrors={setErrors}
              acceptedTypes={['application/pdf']}
              allowedFileTypes={['.pdf' ]}
              maxFileSizeInMB={1}
              isDocument={true}
              logo={<BsFilePdf className="text-primary text-2xl" />}
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
              options={availableSites
                .filter((site) => site.modules?.some((module) => module.casestudy === true))
                .map((site) => ({ name: `${site.name} (${site.host})`, _id: site._id }))}
              label="Select Sites"
              onChange={(selected) => {
                setCaseStudyDetails((prev) => ({ ...prev, sites: selected }));
                if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
              }}
              selected={caseStudyDetails.sites}
              error={errors.sites}
            />
            <ToggleComponent
              label={'Is Case Study Active?'}
              tooltipContent="If case study is active, it will be visible to the users."
              isEnableState={caseStudyDetails.isActive}
              setIsEnableState={(value) => setCaseStudyDetails((prev) => ({ ...prev, isActive: value }))}
            />
            <ToggleComponent
              label={'Is Case Study Global?'}
              tooltipContent="If case study is global, it will be visible to all sites."
              isEnableState={caseStudyDetails.isGlobal}
              setIsEnableState={(value) => setCaseStudyDetails((prev) => ({ ...prev, isGlobal: value }))}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Email Notification Settings</span>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <FormField
              label="Subject"
              type="text"
              id="mailSubject"
              name="mailSubject"
              required
              placeholder="Subject"
              value={caseStudyDetails.mailSubject}
              onChange={(e) => {
                setCaseStudyDetails((prev) => ({ ...prev, mailSubject: e.target.value }));
                if (errors.mailSubject) setErrors((prev) => ({ ...prev, mailSubject: '' }));
              }}
              errorMessage={errors.mailSubject}
            />
            <TextareaComponent
              label="Body"
              placeholder="Body"
              id="mailBody"
              name="mailBody"
              required
              value={caseStudyDetails.mailBody}
              onChange={(e) => setCaseStudyDetails((prev) => ({ ...prev, mailBody: e.target.value }))}
              errorMessage={errors.mailBody}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editCasestudyNote : addCasestudyNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/case-study/case-study-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};
export default AddCaseStudy;
