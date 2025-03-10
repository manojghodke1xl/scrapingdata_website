import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormButtons from '../../../atoms/formFields/FormButtons';
import useGlobalContext from '../../../hooks/useGlobalContext';
import DropDown from '../../../atoms/formFields/DropDown';
import { useEffect, useState } from 'react';
import FormField from '../../../atoms/formFields/InputField';
import { addEmailTemplateApi, getEmailTemplateByIdApi, updateEmailTemplateApi } from '../../../apis/templates/template-apis';
import { showNotification } from '../../../utils/showNotification';
import DocumentFileUpload from '../../../atoms/formFields/DocumentFileUpload';
import { acceptedExtensions, acceptedProductTypes } from '../../product/productStaticData';
import FileTypesTooltip from '../../../atoms/formFields/FileTypesTooltip';
import MultiSelectCheckbox from '../../../atoms/formFields/MultiSelectCheckBox';
import { getFilesBySiteIdApi } from '../../../apis/file-apis';
import { uploadMultipleCustomFiles } from '../../../utils/fileUploads';
import { getAllTemplateCategoriesApi } from '../../../apis/templates/template-category';
import TextareaComponent from '../../../atoms/formFields/TextareaComponent';
import EmailPreview from '../../../atoms/templatePreview/EmailPreview';

const AddEmailTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailTemplate, setEmailTemplate] = useState({
    site: '',
    name: '',
    subject: '',
    body: '',
    // templateCategory: '',
    files: []
  });
  const [files, setFiles] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [templateCategories, setTemplateCategories] = useState([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getEmailTemplateByIdApi(id);
        if (status) {
          const { site, templateCategory, ...rest } = data.emailTemplate;
          setEmailTemplate((prev) => ({ ...prev, ...rest, site: site._id, templateCategory: templateCategory || undefined }));
        } else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  useEffect(() => {
    if (emailTemplate.site) {
      (async () => {
        const { status, data } = await getFilesBySiteIdApi(emailTemplate.site);
        if (status) setFiles(data.file);
      })();
    }
  }, [emailTemplate.site, setLoading]);

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllTemplateCategoriesApi('Email');
      if (status) {
        setTemplateCategories(data.templateCategories);
      } else showNotification('warn', data);
    })().catch((error) => showNotification('error', error.message));
  }, []);

  const handleFileUpload = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.target.files).map((file) => ({ file, customName: file.name }));
    setAttachments((prev) => [...prev, ...newFiles]);
  };
  const validate = () => {
    const newErrors = {};
    if (!emailTemplate.site) newErrors.site = 'Site is required';
    if (!emailTemplate.name.trim()) newErrors.name = 'Name is required';
    if (!emailTemplate.subject.trim()) newErrors.subject = 'Subject is required';
    if (!emailTemplate.body) newErrors.body = 'Body is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      let fileIds = [];
      if (attachments.length > 0) fileIds = await uploadMultipleCustomFiles(attachments);
      const payload = { ...emailTemplate, files: [...emailTemplate.files, ...fileIds], fileId: files?._id };
      const { status, data } = await (id ? (isDuplicate ? addEmailTemplateApi(payload) : updateEmailTemplateApi(id, payload)) : addEmailTemplateApi(payload));
      if (status) {
        showNotification('success', data.message);
        navigate('/templates/email-template-list');
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
  }, [isScrollable]);

  const variables = templateCategories.filter((item) => item._id === emailTemplate.templateCategory)[0]?.variableMap;

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-ful pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Email Template</span>
        </div>
        <FormButtons to="/templates/email-template-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-1/4 w-full flex flex-col">
            <span className="text-primary">Site Association</span>
          </div>
          <div className="w-full">
            <div className="w-full sm:w-1/2">
              <DropDown
                name="site"
                label={'Select Site'}
                SummaryChild={<h5 className="text-primary p-0 m-0">Sites</h5>}
                dropdownList={availableSites.map((site) => ({ id: site._id, showName: `${site.name} (${site.host})`, name: site._id }))}
                selected={emailTemplate.site}
                search={true}
                commonFunction={(e) => {
                  setEmailTemplate((prev) => ({ ...prev, site: e.name }));
                  if (errors.site) setErrors((prev) => ({ ...prev, site: '' }));
                }}
                error={errors.site}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-start">
          <div className="md:w-1/4 w-full flex flex-col">
            <span className="text-primary">Basic Information</span>
          </div>
          <div className="w-full">
            <div className="w-full sm:w-1/2 flex flex-col gap-y-5">
              <FormField
                label="Template Name"
                name="name"
                id="name"
                placeholder="Template Name"
                required
                value={emailTemplate.name}
                onChange={(e) => {
                  setEmailTemplate((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                errorMessage={errors.name}
              />
              <DropDown
                name="category"
                label="Category"
                SummaryChild={<h5 className="text-primary p-0 m-0">Category</h5>}
                dropdownList={templateCategories.map((category) => ({ id: category._id, showName: category.name, name: category._id }))}
                selected={emailTemplate.templateCategory}
                search={true}
                commonFunction={(e) => {
                  setEmailTemplate((prev) => ({ ...prev, templateCategory: e.name }));
                  if (errors.templateCategory) setErrors((prev) => ({ ...prev, templateCategory: '' }));
                }}
                error={errors.templateCategory}
              />
            </div>

            {variables && variables.length > 0 && (
              <div className="mt-5 w-full">
                <label className="block text-sm font-medium text-primary">Placeholders</label>
                <div className="border border-primary rounded-xl mt-2 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {variables.map((variable) => (
                    <div className="flex items-center justify-start" key={variable.key}>
                      <p className="text-primary">{variable.label} : </p> &nbsp;
                      <p className="text-brand">{`{${variable.name}}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-3  md:flex-row justify-evenly">
          <div className="sm:w-1/4 w-full flex flex-col">
            <span className="text-primary">Email Content</span>
          </div>
          <div className="w-1/2">
            <div className="w-full flex flex-col gap-y-5">
              <FormField
                label="Subject"
                name="subject"
                id="subject"
                placeholder="Subject"
                required
                value={emailTemplate.subject}
                onChange={(e) => {
                  setEmailTemplate((prev) => ({ ...prev, subject: e.target.value }));
                  if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                }}
                errorMessage={errors.subject}
              />

              <TextareaComponent
                rows={15}
                label="Body"
                placeholder="Body"
                id="mailBody"
                name="mailBody"
                value={emailTemplate.body}
                onChange={(e) => setEmailTemplate((prev) => ({ ...prev, body: e.target.value }))}
                // value={emailContent}
                // onChange={(e) => setEmailContent(e.target.value)}
                errorMessage={errors.body}
              />
            </div>
          </div>
          <div className="w-1/2">
            <EmailPreview emailTemplate={emailTemplate} />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-1/4 w-full flex flex-col">
            <span className="block text-primary">Attached Document</span>
          </div>
          <div className="w-full">
            <div className="w-full sm:w-1/2">
              {files && files.attachments && files.attachments.length > 0 && (
                <MultiSelectCheckbox
                  options={files.attachments || []}
                  formLabel={'Select File'}
                  label={'Invoice.pdf, Document.doc'}
                  selected={emailTemplate.files}
                  onChange={(e) => setEmailTemplate((prev) => ({ ...prev, files: e }))}
                />
              )}
              <DocumentFileUpload
                divClassName={'mt-5'}
                label={'Attachment Files'}
                isMultiple
                files={attachments}
                setFiles={setAttachments}
                allowedTypes={acceptedProductTypes}
                allowedFileTypes={acceptedExtensions}
                handleFileUpload={handleFileUpload}
                toolTip={<FileTypesTooltip />}
              />
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-4 border- border-primary">
          <FormButtons
            to="/templates/email-template-list"
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

export default AddEmailTemplate;
