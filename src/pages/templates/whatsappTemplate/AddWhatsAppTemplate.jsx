import { useNavigate, useParams } from 'react-router-dom';
import FormButtons from '../../../atoms/formFields/FormButtons';
import useGlobalContext from '../../../hooks/useGlobalContext';
import DropDown from '../../../atoms/formFields/DropDown';
import { useEffect, useState } from 'react';
import FormField from '../../../atoms/formFields/InputField';
import { addWhatsAppTemplateApi, getWhatsAppTemplateByIdApi, updateWhatsAppTemplateApi } from '../../../apis/templates/template-apis';
import { showNotification } from '../../../utils/showNotification';
import DocumentFileUpload from '../../../atoms/formFields/DocumentFileUpload';
import { acceptedExtensions, acceptedProductTypes } from '../../product/productStaticData';
import FileTypesTooltip from '../../../atoms/formFields/FileTypesTooltip';
import MultiSelectCheckbox from '../../../atoms/formFields/MultiSelectCheckBox';
import { getFilesBySiteIdApi } from '../../../apis/file-apis';
import { uploadMultipleCustomFiles } from '../../../utils/fileUploads';
import { getAllTemplateCategoriesApi } from '../../../apis/templates/template-category';
import TextareaComponent from '../../../atoms/formFields/TextareaComponent';

const AddWhatsAppTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [whatsAppTemplate, setWhatsAppTemplate] = useState({
    site: '',
    name: '',
    message: '',
    // category: '',
    files: []
  });
  const [files, setFiles] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [templateCategories, setTemplateCategories] = useState([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getWhatsAppTemplateByIdApi(id);
        if (status) {
          const { site, ...rest } = data.whatsappTemplate;
          setWhatsAppTemplate((prev) => ({ ...prev, ...rest, site: site._id }));
        } else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  useEffect(() => {
    if (whatsAppTemplate.site) {
      (async () => {
        const { status, data } = await getFilesBySiteIdApi(whatsAppTemplate.site);
        if (status) {
          setFiles(data.file);
        } else showNotification('warn', data);
      })().catch((error) => showNotification('error', error.message));
    }
  }, [whatsAppTemplate.site, setLoading]);

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllTemplateCategoriesApi();
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
    if (!whatsAppTemplate.site) newErrors.site = 'Site is required';
    if (!whatsAppTemplate.name.trim()) newErrors.name = 'Name is required';
    if (!whatsAppTemplate.message) newErrors.message = 'Message is required';
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
      const payload = { ...whatsAppTemplate, files: [...whatsAppTemplate.files, ...fileIds], fileId: files._id };
      const { status, data } = await (id ? updateWhatsAppTemplateApi(id, payload) : addWhatsAppTemplateApi(payload));
      if (status) {
        showNotification('success', data.message);
        navigate('/templates/whatsapp-template-list');
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

  const variables = templateCategories.filter((item) => item._id === whatsAppTemplate.category)[0]?.variableMap;

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-ful pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} WhatsApp Template</span>
        </div>
        <FormButtons to="/templates/whatsapp-template-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
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
                selected={whatsAppTemplate.site}
                search={true}
                commonFunction={(e) => {
                  setWhatsAppTemplate((prev) => ({ ...prev, site: e.name }));
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
            <div className="w-full sm:w-1/2">
              <FormField
                label="Template Name"
                name="name"
                id="name"
                placeholder="Template Name"
                value={whatsAppTemplate.name}
                onChange={(e) => {
                  setWhatsAppTemplate((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                errorMessage={errors.name}
              />
              <DropDown
                mt="mt-5"
                name="category"
                label="Category"
                SummaryChild={<h5 className="text-primary p-0 m-0">Category</h5>}
                dropdownList={templateCategories.map((category) => ({ id: category._id, showName: category.name, name: category._id }))}
                selected={whatsAppTemplate.category}
                search={true}
                commonFunction={(e) => {
                  setWhatsAppTemplate((prev) => ({ ...prev, category: e.name }));
                  if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
                }}
                error={errors.category}
              />
            </div>

            {variables && variables.length > 0 && (
              <div className="mt-5 w-full">
                <label className="block text-sm font-medium text-primary">Placeholders</label>
                <div className="border border-primary rounded-xl mt-2 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {variables.map((variable) => (
                    <div className="flex items-center justify-start" key={variable.key}>
                      <p className="text-primary">{variable.label} : </p> &nbsp;
                      <p className="text-blue">{`{${variable.name}}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-1/4 w-full flex flex-col">
            <span className="text-primary">SMS Content</span>
          </div>
          <div className="w-full">
            <div className="w-full sm:w-1/2">
              <TextareaComponent
                divClassName="mt-5"
                label="Message"
                placeholder="Message..."
                id="message"
                name="message"
                value={whatsAppTemplate.message}
                onChange={(e) => setWhatsAppTemplate((prev) => ({ ...prev, message: e.target.value }))}
                errorMessage={errors.message}
              />
            </div>
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
              <MultiSelectCheckbox
                options={files.attachments || []}
                formLabel={'Select File'}
                label={'Invoice.pdf, Document.doc'}
                selected={whatsAppTemplate.files}
                onChange={(e) => setWhatsAppTemplate((prev) => ({ ...prev, files: e }))}
              />

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
          <FormButtons to="/templates/whatsapp-template-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddWhatsAppTemplate;
