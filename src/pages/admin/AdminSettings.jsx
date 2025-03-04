import { useState } from 'react';
import ToggleComponent from '../../atoms/formFields/ToggleComponent';
import ColorPalette from '../../atoms/common/ColorPalette';
import useColorContext from '../../hooks/useColorContext';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import { updateAdminThemeApi } from '../../apis/admin-apis';
import FormButtons from '../../atoms/formFields/FormButtons';

const AdminSettings = () => {
  const { toggleDarkMode, isDarkMode, setIsDarkMode } = useColorContext();

  const {
    auth: { id },
    isLoading,
    dispatch,
    setLoading
  } = useGlobalContext();

  const [workspaceColors, setWorkspaceColors] = useState({});

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { darkMode: isDarkMode, workspaceColors };
      const { status, data } = await updateAdminThemeApi(id, payload);
      if (status) {
        showNotification('success', data.message);
        dispatch({ type: 'SET_THEME', payload: { isDarkMode, primaryColor: workspaceColors } });
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between">
        <h4 className="text-3xl text-dark">Admin Settings</h4>
        <div className="w-full flex justify-end sm:w-fit gap-2">
          <FormButtons type="submit" onClick={handleSaveChanges} btnLebal={'Save Changes'} loading={isLoading} />
        </div>
      </div>
      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Dark Mode</span>
          </div>
          <div className="w-full">
            <ToggleComponent
              label={'Toggle Dark Mode'}
              isEnableState={isDarkMode}
              tooltipContent={'Toggle dark mode'}
              setIsEnableState={setIsDarkMode}
              onChange={() => toggleDarkMode()}
            />
          </div>
        </div>
      </div>
      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">Change Theme Color</span>
          </div>
          <div className="w-full">
            <ColorPalette onColorChange={setWorkspaceColors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
