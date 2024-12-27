import { useState } from 'react';
import DropDown from '../../atoms/formFields/DropDown';
import BGImg from '../../assets/images/site-apps.png';
import { useNavigate } from 'react-router-dom';
import useGetAllSites from '../../hooks/useGetAllSites';
import { showNotification } from '../../utils/showNotification';

const Apps = () => {
  const allSites = useGetAllSites();
  const [siteData, setSiteData] = useState({});
  const navigate = useNavigate();
  console.log(siteData);
  const handleProceed = () => {
    if (siteData.name) navigate(`/apps/integration`, { state: { siteData } });
    else showNotification('error', 'Please select a site before proceeding');
  };

  return (
    <div className="py-8 p-4 sm:p-8 mb-20">
      <div className="flex flex-col gap-4">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">Apps</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 border border-dashed border-blue p-4 rounded-xl">
          <div>
            <img src={BGImg} alt="Site Selectioin for Integration" className="w-72" />
          </div>
          <h1 className="text-3xl font-semibold">To set up integrations, please select a site from the dropdown menu.</h1>
          <div className="md:w-1/2 font-normal text-primary text-center">
            Select a site from the dropdown menu to begin setting up your integrations. This will help streamline your workflow and ensure seamless connectivity across your
            selected platform.
          </div>
          <div className="w-1/4 min-w-fit mt-5">
            <div className="-mb-4 text-primary">Select Site</div>
            <DropDown
              name="Sites"
              dropdownList={allSites.map((site) => ({ id: site._id, showName: site.name, name: site._id }))}
              SummaryChild={<h5 className="p-0 m-0 text-primary">{siteData.showName || 'Sites'}</h5>}
              search={true}
              selected={siteData.name}
              commonFunction={(e) => setSiteData(e)}
            />
          </div>
          <div className="flex justify-center gap-4 mt-5">
            {/* <button className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 hover:bg-gray-100 text-secondary border border-primary">Cancel</button> */}
            <button onClick={handleProceed} className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
