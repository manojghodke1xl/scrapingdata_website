import { useNavigate, useParams } from 'react-router-dom';
import FormButtons from '../../../atoms/formFields/FormButtons';
import useGlobalContext from '../../../hooks/useGlobalContext';
import DropDown from '../../../atoms/formFields/DropDown';
import { useEffect, useState } from 'react';
import FormField from '../../../atoms/formFields/InputField';
import TextEditor from '../../../atoms/formFields/TextEditor';
import { addEmailTemplateApi, getEmailTemplateByIdApi, updateEmailTemplateApi } from '../../../apis/templates/email-template-apis';
import { showNotification } from '../../../utils/showNotification';

const AddEmailTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const [isScrollable, setIsScrollable] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailTemplate, setEmailTemplate] = useState({
    site: '',
    name: '',
    subject: '',
    body: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getEmailTemplateByIdApi(id);
        if (status) {
          const { site, ...rest } = data.emailTemplate;
          setEmailTemplate((prev) => ({ ...prev, ...rest, site: site._id }));
        } else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

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
      const { status, data } = await (id ? updateEmailTemplateApi(id, emailTemplate) : addEmailTemplateApi(emailTemplate));
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

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-ful pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Email Template</span>
        </div>
        <FormButtons to="/templates/email-template-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
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
            <div className="w-full sm:w-1/2">
              <FormField
                label="Template Name"
                name="name"
                id="name"
                placeholder="Template Name"
                value={emailTemplate.name}
                onChange={(e) => {
                  setEmailTemplate((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                error={errors.name}
              />
              {/* <DropDown
                mt="mt-5"
                name="category"
                label="Category"
                SummaryChild={<h5 className="text-primary p-0 m-0">Category</h5>}
                dropdownList={[]}
                selected={emailTemplate.category}
                search={true}
                commonFunction={(e) => {
                  setEmailTemplate((prev) => ({ ...prev, category: e.name }));
                  if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
                }}
                error={errors.category}
              /> */}
            </div>

            {/* <div className="mt-5 w-full">
              <label className="block text-sm font-medium text-primary">Placeholders</label>
              <div className="border border-primary rounded-xl mt-2 flex flex-col md:flex-row p-4 gap-y-2 items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">User: </p>
                    <p className="text-blue">{`{recipient_name}`}</p>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">Venue:</p>
                    <p className="text-blue">{`{venue}`} </p>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">Check-in-Time:</p>
                    <p className="text-blue">{`{check_in_time}`} </p>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">Contact Information:</p>
                    <p className="text-blue">{`{contact_information}`} </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">Event Name:</p>
                    <p className="text-blue">{`{event_name}`} </p>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">Event Time:</p>
                    <p className="text-blue">{`{event_time}`} </p>
                  </div>
                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">Event-related Material:</p>
                    <p className="text-blue">{`{event-related_material}`} </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">Event Date:</p>
                    <p className="text-blue">{`{event_date}`} </p>
                  </div>

                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">Agenda Highlights:</p>
                    <p className="text-blue">{`{agenda_highlights}`} </p>
                  </div>

                  <div className="flex items-center justify-start gap-1">
                    <p className="text-primary">Your Organization Name:</p>
                    <p className="text-blue">{`{organization_name}`} </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-1/4 w-full flex flex-col">
            <span className="text-primary">Email Content</span>
          </div>
          <div className="w-full">
            <div className="w-full sm:w-1/2">
              <FormField
                label="Subject"
                name="subject"
                id="subject"
                placeholder="Subject"
                value={emailTemplate.subject}
                onChange={(e) => {
                  setEmailTemplate((prev) => ({ ...prev, subject: e.target.value }));
                  if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                }}
                error={errors.subject}
              />

              <TextEditor value={emailTemplate.body} onChange={(e) => setEmailTemplate((prev) => ({ ...prev, body: e }))} label="Body" placeholder="Body..." />
            </div>
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-4 border- border-primary">
          <FormButtons to="/templates/email-template-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddEmailTemplate;
