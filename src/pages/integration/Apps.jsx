import { useState } from 'react';
import DropDown from '../../atoms/formFields/DropDown';
import BGImg from '../../assets/images/site-apps.png';
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import useLayout from '../../hooks/useLayout';

const Apps = () => {
  const {
    auth: { allSites }
  } = useGlobalContext();
  const { layoutSize } = useLayout();
  const [siteData, setSiteData] = useState({});
  const navigate = useNavigate();

  const handleProceed = () => {
    if (siteData.name) navigate(`/apps/integration/${siteData.name}`);
    else showNotification('error', 'Please select a site before proceeding');
  };

  return (
    <div className={`${layoutSize === 'small' ? 'p-1' : layoutSize === 'large' ? 'p-8' : 'p-4'}`}>
      <div className={`flex flex-col ${layoutSize === 'small' ? 'gap-1' : layoutSize === 'large' ? 'gap-4' : 'gap-2'}`}>
        <div
          className={`w-full border-b border-primary gap-y-4  flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end ${
            layoutSize === 'small' ? 'pb-1 gap-1 text-xl' : layoutSize === 'large' ? 'pb-8 gap-4 text-3xl' : 'pb-4 gap-2 text-2xl'
          }`}
        >
          <span className="font-semibold text-dark">Apps</span>
        </div>
        <div
          className={`flex flex-col items-center border border-dashed border-secondary rounded-xl ${
            layoutSize === 'small' ? 'gap-2 p-2' : layoutSize === 'large' ? 'gap-6 p-6' : 'gap-4 p-4'
          }`}
        >
          <div>
            <img src={BGImg} alt="Site Selectioin for Integration" className={`${layoutSize === 'small' ? 'w-40' : layoutSize === 'large' ? 'w-72' : 'w-52'}`} />
          </div>
          <h1 className={`font-semibold ${layoutSize === 'small' ? 'text-xl' : layoutSize === 'large' ? 'text-3xl' : 'text-2xl'}`}>
            To set up integrations, please select a site from the dropdown menu.
          </h1>
          <p className={`md:w-1/2 font-normal text-primary text-center ${layoutSize === 'small' ? 'text-sm' : layoutSize === 'large' ? 'text-lg' : 'text-base'}`}>
            Select a site from the dropdown menu to begin setting up your integrations. This will help streamline your workflow and ensure seamless connectivity across your
            selected platform.
          </p>
          <div className="w-1/4 min-w-fit">
            <DropDown
              name="Sites"
              label={'Select Sites'}
              dropdownList={allSites
                .filter((site) => site.modules?.some((module) => module.apps === true))
                .map((site) => ({ id: site._id, showName: `${site.name} (${site.host})`, name: site._id }))}
              SummaryChild={<h5 className="p-0 m-0 text-primary">{siteData.showName || 'Sites'}</h5>}
              search={true}
              selected={siteData.name}
              commonFunction={(e) => setSiteData(e)}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleProceed}
              className={`flex h-fit items-center rounded-xl bg-primary hover:bg-primary-hover text-white ${
                layoutSize === 'small' ? 'text-sm p-1.5' : layoutSize === 'large p-2' ? 'text-xl' : 'text-base p-2'
              }`}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
0;
