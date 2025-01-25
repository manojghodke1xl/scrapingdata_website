import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DocumentFileUpload from '../../atoms/formFields/DocumentFileUpload';
import FileTypesTooltip from '../../atoms/formFields/FileTypesTooltip';
import FormButtons from '../../atoms/formFields/FormButtons';
import { acceptedExtensions, acceptedProductTypes } from '../product/productStaticData';
import DropDown from '../../atoms/formFields/DropDown';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useEffect, useState } from 'react';
import { uploadMultipleCustomFiles } from '../../utils/fileUploads';
import { showNotification } from '../../utils/showNotification';
import { addFileApi, getFileByIdApi, updateFileApi } from '../../apis/file-apis';

const AddFiles = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [attachments, setAttachments] = useState([]);
  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState({
    site: '',
    attachments: []
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getFileByIdApi(id);
        if (status) {
          const { site, attachments, ...rest } = data.file;
          setFile((prev) => ({ ...prev, ...rest, site: site._id, attachments }));
        } else showNotification('warn', data);
        setLoading(false);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const handleFileUpload = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.target.files).map((file) => ({ file, customName: file.name }));
    setAttachments((prev) => [...prev, ...newFiles]);
    if (errors.files) setErrors({ ...errors, files: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!file.site) newErrors.site = 'Site is required';
    if (attachments.length === 0) newErrors.files = 'At least one file is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const fileIds = await uploadMultipleCustomFiles(attachments);
    if (fileIds.length > 0) {
      const payload = {
        site: file.site,
        attachments: fileIds
      };
      try {
        const { status, data } = await (id ? (isDuplicate ? addFileApi(payload) : updateFileApi(id, payload)) : addFileApi(payload));
        if (status) {
          showNotification('success', data.message);
          setAttachments([]);
          setFile({ site: '', attachments: [] });
          navigate('/files/file-list');
        } else showNotification('error', data.message);
      } catch (error) {
        showNotification('error', error.message);
      }
    } else showNotification('error', 'File upload failed');

    setLoading(false);
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
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} File</span>
        </div>
        <FormButtons to="/files/file-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Site Association</span>
          </div>
          <div className="w-full">
            <div>
              <DropDown
                name="Sites"
                dropdownList={availableSites.map((site) => ({ id: site._id, showName: `${site.name} (${site.host})`, name: site._id }))}
                SummaryChild={<h5 className="p-0 m-0 text-primary">Sites</h5>}
                search={true}
                selected={file.site}
                commonFunction={(e) => {
                  setFile((prev) => ({ ...prev, site: e.name }));
                  if (errors.site) setErrors((prev) => ({ ...prev, site: '' }));
                }}
                error={errors.site}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Basic Information</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <DocumentFileUpload
                label={'Attachment Files'}
                isMultiple
                files={attachments}
                existingFiles={file.attachments}
                setExistingFiles={setFile}
                setFiles={setAttachments}
                allowedTypes={acceptedProductTypes}
                allowedFileTypes={acceptedExtensions}
                handleFileUpload={handleFileUpload}
                toolTip={<FileTypesTooltip />}
                error={errors.files}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editPartnerLogoNote : addPartnerLogoNote} />
      </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/files/file-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddFiles;
