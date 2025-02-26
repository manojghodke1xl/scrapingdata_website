import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { addSmtpApi, getSmtpByIdApi, updateSmtpApi } from '../../apis/smtp-apis';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addSMTPNote, editSMTPNote } from './SmtpNotes';
import DropDown from '../../atoms/formFields/DropDown';

const AddSmtp = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { setLoading, isLoading } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [errors, setErrors] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);
  const [smtpDetails, setSmtpDetails] = useState({
    name: '',
    host: '',
    port: '',
    secure: 'None',
    user: '',
    password: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getSmtpByIdApi(id);
        if (status) setSmtpDetails(data.smtp);
        else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!smtpDetails.name.trim()) newErrors.name = 'Name is required';
    if (!smtpDetails.host.trim()) newErrors.host = 'Host is required';
    if (smtpDetails.secure === '') newErrors.secure = 'Security protocol is required.';
    if (!smtpDetails.port) newErrors.port = 'Port is required';
    if (!smtpDetails.user) newErrors.user = 'User is required';
    if (!smtpDetails.password) newErrors.password = 'Password is required';
    if (!smtpDetails.senderEmail) newErrors.senderEmail = 'Sender Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addSmtpApi(smtpDetails) : updateSmtpApi(id, smtpDetails)) : addSmtpApi(smtpDetails));

      if (status) {
        showNotification('success', data.message);
        navigate('/smtp/smtp-list');
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
  }, []);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} SMTP</span>
        </div>
        <FormButtons to="/smtp/smtp-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">SMTP Server Details</span>
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
                  setSmtpDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={smtpDetails.name}
                errorMessage={errors.name}
              />
              <FormField
                divClassName={'mt-5'}
                label="Host"
                type="text"
                id="host"
                name="host"
                placeholder="Host"
                onChange={(e) => {
                  setSmtpDetails((prev) => ({ ...prev, host: e.target.value }));
                  if (errors.host) setErrors((prev) => ({ ...prev, host: '' }));
                }}
                value={smtpDetails.host}
                errorMessage={errors.host}
              />
              <FormField
                divClassName={'mt-5'}
                label="Port"
                type="number"
                id="port"
                name="port"
                placeholder="Port"
                onChange={(e) => {
                  setSmtpDetails((prev) => ({ ...prev, port: e.target.value }));
                  if (errors.port) setErrors((prev) => ({ ...prev, port: '' }));
                }}
                value={smtpDetails.port}
                errorMessage={errors.port}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Authentication Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Sender Name"
                type="text"
                id="senderName"
                name="senderName"
                placeholder="Sender Name"
                onChange={(e) => setSmtpDetails((prev) => ({ ...prev, senderName: e.target.value }))}
                value={smtpDetails.senderName}
              />
              <FormField
                label="Sender Email"
                divClassName={'mt-5'}
                type="email"
                id="senderEmail"
                name="senderEmail"
                placeholder="Sender Email"
                onChange={(e) => setSmtpDetails((prev) => ({ ...prev, senderEmail: e.target.value }))}
                value={smtpDetails.senderEmail}
              />
              <FormField
                divClassName={'mt-5'}
                label="User"
                type="text"
                id="user"
                name="user"
                placeholder="User"
                onChange={(e) => {
                  setSmtpDetails((prev) => ({ ...prev, user: e.target.value }));
                  if (errors.user) setErrors((prev) => ({ ...prev, user: '' }));
                }}
                value={smtpDetails.user}
                errorMessage={errors.user}
              />
              <FormField
                divClassName={'mt-5'}
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                showPasswordToggle={true}
                onChange={(e) => {
                  setSmtpDetails((prev) => ({ ...prev, password: e.target.value }));
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                value={smtpDetails.password}
                errorMessage={errors.password}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Security Settings</span>
          </div>
          <div className="w-full">
            <div>
              <DropDown
                name="Security Protocol"
                label="Security Protocol"
                SummaryChild={<h5 className="p-0 m-0 text-primary">{smtpDetails.secureObj?.showName ? smtpDetails.secureObj?.showName : 'None'}</h5>}
                dropdownList={[
                  { id: 0, showName: 'None', name: 'None' },
                  { id: 1, showName: 'TLS', name: 'TLS' },
                  { id: 2, showName: 'SSL', name: 'SSL' },
                  { id: 3, showName: 'STARTTLS', name: 'STARTTLS' }
                ]}
                selected={smtpDetails.secure}
                search={true}
                commonFunction={(e) => setSmtpDetails((prev) => ({ ...prev, secure: e.name, secureObj: e }))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editSMTPNote : addSMTPNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/smtp/smtp-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddSmtp;
