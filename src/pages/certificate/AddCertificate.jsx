import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import TextareaComponent from '../../atoms/formFields/TextareaComponent';
import FileUpload from '../../atoms/formFields/FileUpload';
import { FaRegImage } from 'react-icons/fa';
import { addCertificateApi, getCertificateByIdApi, updateCertificateApi } from '../../apis/certificate-apis';

const AddCertificate = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading, isLoading } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [errors, setErrors] = useState({});
  const [certificate, setCertificate] = useState({
    name: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getCertificateByIdApi(id);
          if (status) {
            const { image, ...rest } = data.certificate;
            setCertificate((prev) => ({ ...prev, ...rest, image: image ? image._id : undefined, imageFile: image }));
          } else showNotification('warn', data);
        } catch (error) {
          showNotification('error', error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!certificate.name) newErrors.name = 'Name is required';
    if (!certificate.image) newErrors.image = 'Ticket SVG is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addCertificateApi(certificate) : updateCertificateApi(id, certificate)) : addCertificateApi(certificate));
      if (status) {
        showNotification('success', data.message);
        navigate('/certificates/certificate-list');
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
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} Certificate</span>
        </div>
        <FormButtons to="/certificates/certificate-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Certificate Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Certificate Name"
                type="text"
                id="name"
                name="name"
                required
                placeholder="Certificate Name"
                onChange={(e) => {
                  setCertificate((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={certificate.name}
                errorMessage={errors.name}
              />

              <TextareaComponent
                divClassName="mt-5"
                label="Description"
                placeholder="Enter a description..."
                id="description"
                name="description"
                value={certificate?.description}
                onChange={(e) => setCertificate((prev) => ({ ...prev, description: e.target.value }))}
              />

              <FileUpload
                divClassName={'mt-5'}
                label={'Certificate SVG'}
                logo={<FaRegImage className="text-primary text-2xl" />}
                error={errors.image}
                setErrors={setErrors}
                acceptedTypes={['.svg']}
                fieldName="image"
                isImage
                setDetails={setCertificate}
                imagePreviewUrl={certificate?.imageFile?.url}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
