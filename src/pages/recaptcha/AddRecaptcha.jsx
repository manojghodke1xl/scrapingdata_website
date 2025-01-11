import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import { addRecaptchaApi, getRecaptchaByIdApi, updateRecaptchaApi } from '../../apis/recaptcha-apis';
import FormButtons from '../../atoms/formFields/FormButtons';
import FormField from '../../atoms/formFields/InputField';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import DropDown from '../../atoms/formFields/DropDown';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addRecaptchaNote, editRecaptchaNote } from './RecaptchaNotes';

const AddRecaptcha = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const {
    auth: { allSites: availableSites },
    setLoading,
    isLoading
  } = useGlobalContext();
  const { pathname } = useLocation();
  const isDuplicate = pathname.includes('duplicate');

  const [recaptcha, setRecaptcha] = useState({
    version: 'v2',
    sitekey: '',
    secretkey: '',
    sites: [],
    isActive: true,
    isGlobal: false
  });
  const [errors, setErrors] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getRecaptchaByIdApi(id);
        if (status) {
          const { sites, ...rest } = data.recaptcha;
          setRecaptcha((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((site) => site._id)
          }));
        } else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!recaptcha.sitekey.trim()) newErrors.sitekey = 'Site key is required';
    if (!recaptcha.secretkey.trim()) newErrors.secretkey = 'Secret key is required';
    if (!recaptcha.sites.length) newErrors.sites = 'At least one site is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? (isDuplicate ? addRecaptchaApi(recaptcha) : updateRecaptchaApi(id, recaptcha)) : addRecaptchaApi(recaptcha));
      if (status) {
        showNotification('success', data.message);
        navigate('/recaptcha/recaptcha-list');
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
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20 h-screen">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{id ? (isDuplicate ? 'Add' : 'Edit') : 'Add'} reCAPTCHA</span>
        </div>
        <FormButtons to="/recaptcha/recaptcha-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">General Configuration</span>
          </div>
          <div className="dropdown-container relative w-full mt-2 ">
            <DropDown
              name="Version"
              label={'Select Version'}
              SummaryChild={<h5 className="p-0 m-0 text-primary">{recaptcha.versionObj?.showName || 'v2'}</h5>}
              dropdownList={[
                { id: 0, showName: 'v2', name: 'v2' },
                { id: 1, showName: 'v3', name: 'v3' }
              ]}
              selected={recaptcha.version}
              search={true}
              commonFunction={(e) => setRecaptcha((prev) => ({ ...prev, version: e.name, versionObj: e }))}
            />
            <ToggleComponent
              label={'Is reCAPTCHA Active?'}
              isEnableState={recaptcha.isActive}
              setIsEnableState={(value) => setRecaptcha((prev) => ({ ...prev, isActive: value }))}
            />
            <ToggleComponent
              label={'Is reCAPTCHA Global?'}
              isEnableState={recaptcha.isGlobal}
              setIsEnableState={(value) => setRecaptcha((prev) => ({ ...prev, isGlobal: value }))}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Site-Specific Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <MultiSelectCheckbox
                options={availableSites
                  .filter((site) => site.modules?.some((module) => module.recaptcha === true))
                  .map((site) => ({ name: `${site.name} (${site.host})`, _id: site._id }))}
                label="Select Sites"
                formLabel="Select Sites"
                onChange={(selected) => {
                  setRecaptcha((prev) => ({ ...prev, sites: selected }));
                  if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
                }}
                selected={recaptcha.sites}
                error={errors.sites}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Keys Configuration</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Site key"
                type="text"
                id="name"
                name="name"
                placeholder="Site key"
                onChange={(e) => {
                  setRecaptcha((prev) => ({ ...prev, sitekey: e.target.value }));
                  if (errors.sitekey) setErrors((prev) => ({ ...prev, sitekey: '' }));
                }}
                value={recaptcha.sitekey}
                errorMessage={errors.sitekey}
              />
              <FormField
                divClassName={'mt-5'}
                label="Secret key"
                type="text"
                id="secretkey"
                name="secretkey"
                placeholder="Secret key"
                onChange={(e) => {
                  setRecaptcha((prev) => ({ ...prev, secretkey: e.target.value }));
                  if (errors.secretkey) setErrors((prev) => ({ ...prev, secretkey: '' }));
                }}
                value={recaptcha.secretkey}
                errorMessage={errors.secretkey}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editRecaptchaNote : addRecaptchaNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/recaptcha/recaptcha-list" type="submit" onClick={handleSubmit} btnLebal={id ? (isDuplicate ? 'Add' : 'Save Changes') : 'Add'} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default AddRecaptcha;
