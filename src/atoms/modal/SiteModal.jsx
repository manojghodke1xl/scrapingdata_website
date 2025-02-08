import { IoCloseSharp } from 'react-icons/io5';
import MultiSelectCheckbox from '../formFields/MultiSelectCheckBox';
import ToggleComponent from '../formFields/ToggleComponent';
import { useColor } from '../../contexts/contexts/ColorContext';

const SiteModal = ({ isOpen, label, duplicateBtn, setSitesModelOpen, selectedSites, setSelectedSites, availableSites, onConfirm, siteToggle }) => {
  const { isDarkMode } = useColor();
  if (!isOpen) return null;
  const onCancel = () => {
    if (duplicateBtn) {
      setSitesModelOpen((prev) => ({ ...prev, isDuplicateModelOpen: false }));
      setSelectedSites((prev) => ({ ...prev, selectedSites: [], siteToggle: false }));
    } else {
      setSitesModelOpen((prev) => ({ ...prev, isSitesModelOpen: false }));
      setSelectedSites((prev) => ({ ...prev, selectedSites: [], siteToggle: false }));
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => {
          if (duplicateBtn) setSitesModelOpen((prev) => ({ ...prev, isDuplicateModelOpen: false }));
          else setSitesModelOpen((prev) => ({ ...prev, isSitesModelOpen: false }));
        }}
      ></div>
      <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
        <div
          className={`${
            isDarkMode ? 'bg-main' : 'bg-white'
          } rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-6`}
        >
          <div className="w-full flex justify-end items-center">
            <div
              onClick={() => {
                if (duplicateBtn) setSitesModelOpen((prev) => ({ ...prev, isDuplicateModelOpen: false }));
                else setSitesModelOpen((prev) => ({ ...prev, isSitesModelOpen: false }));
              }}
              className=" flex justify-between w-full border-b border-primary mb-4 pb-4"
            >
              <h4 className="w-full sm:text-xl text-dark text-left ">{label || 'Update Sites'}</h4>
              <IoCloseSharp className="cursor-pointer text-2xl" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center ">
            <div className="border-b border-primary w-full">
              <MultiSelectCheckbox
                options={availableSites}
                label="Select Sites"
                onChange={(selected) => setSelectedSites((prev) => ({ ...prev, selectedSites: selected }))}
                selected={selectedSites}
              />
              {!duplicateBtn && (
                <ToggleComponent
                  label={(siteToggle ? 'Add' : 'Remove') + ' Site'}
                  isEnableState={siteToggle}
                  setIsEnableState={(e) => setSelectedSites((prev) => ({ ...prev, siteToggle: e }))}
                />
              )}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>

            <div className="flex justify-end gap-5 w-full mt-6 ">
              <button onClick={() => onCancel()} className=" w-1/4 rounded-xl border border-primary text-primary py-2 ">
                Cancel
              </button>
              <button onClick={() => onConfirm(siteToggle)} className="w-1/4 rounded-xl bg-primary hover:bg-primary-hover text-white py-2">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteModal;
