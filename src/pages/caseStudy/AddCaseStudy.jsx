import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';
import useGetAllSites from '../../hooks/useGetAllSites';
import { addCaseStudyApi, getCaseStudyById, updateCaseStudyApi } from '../../apis/caseStudy-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import FileUpload from '../../atoms/formFields/FileUpload';
import { CiImageOn } from 'react-icons/ci';
import { BsFilePdf } from 'react-icons/bs';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addCasestudyNote, editCasestudyNote } from './CaseStudyNotes';

const AddCaseStudy = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading } = useContext(GlobalContext);
  const availableSites = useGetAllSites();

  const [isScrollable, setIsScrollable] = useState(false);
  const [caseStudyDetails, setCaseStudyDetails] = useState({
    title: '',
    sdesc: '',
    ldesc: '',
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
        const { status, data } = await getCaseStudyById(id);
        if (status) {
          const { image, pdf, sites, ...rest } = data.casestudy;
          setCaseStudyDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            pdf: pdf ? pdf?._id : '',
            image: pdf ? image?._id : '',
            pdfFile: pdf,
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
    if (!caseStudyDetails.title.trim()) newErrors.title = 'Title is required';
    if (!caseStudyDetails.sites.length) newErrors.sites = 'Minimum one site is required';
    if (!caseStudyDetails.mailSubject.trim()) newErrors.mailSubject = 'Subject is required';
    if (!caseStudyDetails.mailBody.trim()) newErrors.mailBody = 'Body is required';
    if (!caseStudyDetails.image) newErrors.image = 'Image is required';
    if (!caseStudyDetails.pdf) newErrors.pdf = 'PDF is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateCaseStudyApi(id, caseStudyDetails) : addCaseStudyApi(caseStudyDetails));
      if (status) {
        showNotification('success', data.message);
        navigate('/case-study/case-study-list');
      } else {
        showNotification('warn', data);
      }
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
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Case Study</span>
        </div>
        <FormButtons to="/case-study/case-study-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Case Study Information</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Title"
                type="text"
                id="title"
                name="title"
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
                placeholder="Enter a description..."
                id="sdesc"
                name="sdesc"
                value={caseStudyDetails.sdesc}
                onChange={(e) => setCaseStudyDetails((prev) => ({ ...prev, sdesc: e.target.value }))}
                charCount={false}
              />
              <TextareaComponent
                label="Long Description"
                placeholder="Enter a description..."
                id="ldesc"
                name="ldesc"
                value={caseStudyDetails.ldesc}
                onChange={(e) => setCaseStudyDetails((prev) => ({ ...prev, ldesc: e.target.value }))}
                charCount={false}
                maxLength={1000}
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
              logo={<CiImageOn className="text-primary text-2xl" />}
              error={errors.image}
              setErrors={setErrors}
              acceptedTypes={['.jpeg', '.png']}
              fieldName="image"
              isImage
              setDetails={setCaseStudyDetails}
              imagePreviewUrl={caseStudyDetails.imageFile?.url}
            />
            <FileUpload
              logo={<BsFilePdf className="text-primary text-2xl" />}
              error={errors.image}
              setErrors={setErrors}
              acceptedTypes={['.pdf']}
              fieldName="pdf"
              isPdf
              setDetails={setCaseStudyDetails}
              imagePreviewUrl={caseStudyDetails.pdfFile?.name}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Site & Global Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <MultiSelectCheckbox
                options={availableSites}
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
                isEnableState={caseStudyDetails.isActive}
                setIsEnableState={(value) => setCaseStudyDetails((prev) => ({ ...prev, isActive: value }))}
              />
              <ToggleComponent
                label={'Is Case Study Global?'}
                isEnableState={caseStudyDetails.isGlobal}
                setIsEnableState={(value) => setCaseStudyDetails((prev) => ({ ...prev, isGlobal: value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Email Notification Settings</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Subject"
                type="text"
                id="mailSubject"
                name="mailSubject"
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
                value={caseStudyDetails.mailBody}
                onChange={(e) => setCaseStudyDetails((prev) => ({ ...prev, mailBody: e.target.value }))}
                errorMessage={errors.mailBody}
                charCount={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editCasestudyNote : addCasestudyNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/case-study/case-study-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
        </div>
      )}
    </div>
  );
};
export default AddCaseStudy;
