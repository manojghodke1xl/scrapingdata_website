import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TbFileSearch, TbTemplate, TbUsersGroup } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdMessage } from 'react-icons/md';
import { PiVideoConferenceLight } from 'react-icons/pi';
import { FaBullhorn, FaChartLine, FaRegFile, FaRegImage, FaRegQuestionCircle } from 'react-icons/fa';
import { LuLink, LuLogs } from 'react-icons/lu';
import { FiCalendar } from 'react-icons/fi';
import {
  adminNavLinks,
  contentsPath,
  siteSettingsPath,
  testimonialsPath,
  navLinks,
  mediaPath,
  eventsPath,
  faqsPath,
  leadsPath,
  marketingPath,
  productsPath,
  templatePath,
  filesPath,
  afterSalesPath,
  logsPath,
  webinarsPath,
  utilitiesPath,
  metaDataPath,
  projectCheckerPath
} from './sidebarTabData';
import ReusableAccordion from '../../../atoms/sidebar/ReusableAccordion';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { AiOutlineProduct } from 'react-icons/ai';
import LinkComponent from '../../../atoms/sidebar/LinkComponent';
// import SearchComponent from '../../../atoms/common/SearchComponent';
import { canViewModule } from "../../../utils/canViewModule";

const MaterialSidebar = ({ handleToggleSidebar = () => { } }) => {
  const { pathname } = useLocation();
  const { auth } = useGlobalContext();
  const [openAccordion, setOpenAccordion] = useState(null);

  // Check if the current path matches any of the provided menu paths
  const isActive = (menuPaths) => menuPaths.some((path) => pathname.startsWith(path));

  // Handle sidebar link click by closing accordion and toggling sidebar
  const handleLinkClick = () => {
    setOpenAccordion(null);
    handleToggleSidebar();
  };

  // Define sidebar navigation items with their respective icons and paths
  const accordianLinks = [
    // Content Management Section
    { title: 'Contents', links: contentsPath, icon: <TbFileSearch /> },
    { title: 'Marketing', links: marketingPath, icon: <FaBullhorn /> },
    { title: 'Products', links: productsPath, icon: <AiOutlineProduct /> },

    // User Management Section
    { title: 'Leads', links: leadsPath, icon: <TbUsersGroup /> },

    // System Configuration Section
    { title: 'Site Settings', links: siteSettingsPath, icon: <IoSettingsOutline /> },

    // Media and File Management Section
    { title: 'Media', links: mediaPath, icon: <FaRegImage /> },
    { title: 'Files', links: filesPath, icon: <FaRegFile /> },

    // Event and Communication Section
    { title: 'Events', links: eventsPath, icon: <FiCalendar /> },
    { title: 'After Sales', links: afterSalesPath, icon: <FaChartLine /> },
    { title: 'FAQs', links: faqsPath, icon: <FaRegQuestionCircle /> },
    { title: 'Testimonials', links: testimonialsPath, icon: <MdMessage /> },
    { title: 'Webinars', links: webinarsPath, icon: <PiVideoConferenceLight /> },

    // Additional Tools Section
    { title: 'Templates', links: templatePath, icon: <TbTemplate /> },
    { title: 'Utilities', links: utilitiesPath, icon: <LuLink /> },
    { title: 'Logs', links: logsPath, icon: <LuLogs /> },
    // Meta Data Section
    // { title: 'Meta Data', links: metaDataPath, icon: <TbFileSearch /> },

    // Project Checker Section
    { title: 'Project Checker', links: projectCheckerPath, icon: <TbFileSearch /> }
  ];

  /* ===== Start: Conditionally add "Meta Data" link =====
   - Only add "Meta Data" menu item if the user has permission for the site ("meatatag.com") website address
   - NOTE: Do NOT add this object inside accordianLinks by default,
   - because it should only appear for authorized users.
*/
  if (canViewModule(auth, "metatag.com")) {
    // Append a new link object at the END of the accordianLinks array
    accordianLinks.push({
      title: "Meta Data",  // Label displayed in the sidebar
      links: metaDataPath, // Path(s) that open this menu item
      icon: <TbFileSearch />  // Icon shown with the title
    });
  }
  /* ===== End: Conditionally add "Meta Data" link ===== */
  return (
    <div className="w-full h-full p-1 relative">
      <div className="w-full">
        {/* Main sidebar container with scrollable content */}
        <div className="flex flex-col h-screen lg:h-screen-minus-240 overflow-x-hidden overflow-y-auto scrollbar-hide">
          {/* Search component (currently disabled) */}
          {/* <div className="w-full flex items-center rounded-xl border border-primary px-3 focus:border-hover mb-4">
            <SearchComponent />
          </div> */}

          {/* Render primary navigation links */}
          <LinkComponent navLinks={navLinks} onClick={handleLinkClick} isActive={isActive} />

          {/* Render accordion menu items */}
          {accordianLinks.map(({ title, links, icon }) => (
            <ReusableAccordion
              key={title}
              title={title}
              links={links}
              icon={icon}
              isOpen={openAccordion === title}
              onToggle={() => setOpenAccordion(openAccordion === title ? null : title)}
              handleToggleSidebar={handleToggleSidebar}
            />
          ))}

          <LinkComponent navLinks={adminNavLinks.filter(({ title }) => auth.isSuperAdmin || title !== 'Admins')} onClick={handleLinkClick} isActive={isActive} />
        </div>
      </div>
    </div>
  );
};

export default MaterialSidebar;
