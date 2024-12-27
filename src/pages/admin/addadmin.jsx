import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MultiSelectCheckbox from '../../atoms/formFields/MultiSelectCheckBox';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import { GlobalContext } from '../../contexts/GlobalContext';
import useGetAllSites from '../../hooks/useGetAllSites';
import { addAdminApi, getAdminByIdApi, updateAdminApi } from '../../apis/admin-apis';
import FormField from '../../atoms/formFields/InputField';
import { showNotification } from '../../utils/showNotification';
import FormButtons from '../../atoms/formFields/FormButtons';
import NoteComponent from '../../atoms/common/NoteComponent';
import { addAdminNote, editAdminNote } from './AdminNotes';

const AddAdmin = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { auth, setLoading } = useContext(GlobalContext);
  const [adminDetails, setAdminDetails] = useState({
    email: '',
    name: '',
    password: '',
    sites: [],
    isBlocked: false,
    isSuperAdmin: false
  });
  const [errors, setErrors] = useState({});
  const [isScrollable, setIsScrollable] = useState(false);
  const availableSites = useGetAllSites();

  useLayoutEffect(() => {
    if (!auth.isSuperAdmin) navigate('/dashboard');
  }, [auth, navigate]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getAdminByIdApi(id);
        const { sites, ...rest } = data.admin;
        if (status)
          setAdminDetails((prev) => ({
            ...prev,
            ...rest,
            password: '',
            sites
          }));
        else showNotification('warn', data);
      })()
        .catch((error) => showNotification('error', error.message))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!adminDetails.email) newErrors.email = 'Email is required';
    if (!adminDetails.name) newErrors.name = 'Name is required';
    if (!adminDetails.password && !id) newErrors.password = 'Password is required';
    if (adminDetails.sites.length === 0) newErrors.sites = 'At least one site must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { password, ...rest } = adminDetails;
    if (password) rest.password = password;
    try {
      const { status, data } = await (id ? updateAdminApi(id, rest) : addAdminApi(rest));
      if (status) {
        showNotification('success', data.message);
        navigate('/admin/admin-list');
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
          <span className="text-3xl font-semibold text-dark">{id ? 'Edit' : 'Add'} Admin</span>
        </div>
        <FormButtons to="/admin/admin-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary ">Admin Details</span>
          </div>
          <div className="w-full">
            <div>
              <FormField
                label="Admin Name"
                type="text"
                id="name"
                name="name"
                placeholder="Admin Name"
                onChange={(e) => {
                  setAdminDetails((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                value={adminDetails.name}
                errorMessage={errors.name}
              />
              <FormField
                label="Admin Email"
                type="email"
                id="email"
                name="email"
                placeholder="Admin Email"
                onChange={(e) => {
                  setAdminDetails((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                value={adminDetails.email}
                errorMessage={errors.email}
              />
              <FormField
                label="Admin Password"
                type="password"
                id="password"
                name="password"
                placeholder="Admin Password"
                showPasswordToggle={true}
                onChange={(e) => {
                  setAdminDetails((prev) => ({ ...prev, password: e.target.value }));
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                value={adminDetails.password}
                errorMessage={errors.password}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Access Settings</span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <MultiSelectCheckbox
                options={availableSites}
                label="Select Sites"
                onChange={(selected) => {
                  setAdminDetails((prev) => ({ ...prev, sites: selected }));
                  if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
                }}
                isSuperAdmin={adminDetails.isSuperAdmin}
                selected={adminDetails.sites}
                error={errors.sites}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Account Status</span>
          </div>
          <div className="dropdown-container relative w-full mt-2">
            <ToggleComponent
              label={'Is Admin Blocked?'}
              isEnableState={adminDetails.isBlocked}
              setIsEnableState={(value) => setAdminDetails((prev) => ({ ...prev, isBlocked: value }))}
            />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={id ? editAdminNote : addAdminNote} />
      </div>
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <FormButtons to="/admin/admin-list" type="submit" onClick={handleSubmit} btnLebal={id ? 'Save Changes' : 'Add'} />
        </div>
      )}
    </div>
  );
};

export default AddAdmin;
