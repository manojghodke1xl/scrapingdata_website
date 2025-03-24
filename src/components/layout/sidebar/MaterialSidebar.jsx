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
  utilitiesPath
} from './sidebarTabData';
import ReusableAccordion from '../../../atoms/sidebar/ReusableAccordion';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { AiOutlineProduct } from 'react-icons/ai';
import LinkComponent from '../../../atoms/sidebar/LinkComponent';
// import SearchComponent from '../../../atoms/common/SearchComponent';

const MaterialSidebar = ({ handleToggleSidebar = () => {} }) => {
  const { pathname } = useLocation();
  const { auth } = useGlobalContext();
  const [openAccordion, setOpenAccordion] = useState(null);

  const isActive = (menuPaths) => menuPaths.some((path) => pathname.startsWith(path));

  const handleLinkClick = () => {
    setOpenAccordion(null);
    handleToggleSidebar();
  };

  const accordianLinks = [
    { title: 'Contents', links: contentsPath, icon: <TbFileSearch /> },
    { title: 'Marketing', links: marketingPath, icon: <FaBullhorn /> },
    { title: 'Products', links: productsPath, icon: <AiOutlineProduct /> },
    { title: 'leads', links: leadsPath, icon: <TbUsersGroup /> },
    { title: 'Site Settings', links: siteSettingsPath, icon: <IoSettingsOutline /> },
    { title: 'Media', links: mediaPath, icon: <FaRegImage /> },
    { title: 'Files', links: filesPath, icon: <FaRegFile /> },
    { title: 'Events', links: eventsPath, icon: <FiCalendar /> },
    { title: 'After Sales', links: afterSalesPath, icon: <FaChartLine /> },
    { title: 'FAQs', links: faqsPath, icon: <FaRegQuestionCircle /> },
    { title: 'Testimonials', links: testimonialsPath, icon: <MdMessage /> },
    { title: 'Webinars', links: webinarsPath, icon: <PiVideoConferenceLight /> },
    { title: 'Templates', links: templatePath, icon: <TbTemplate /> },
    { title: 'Utilities', links: utilitiesPath, icon: <LuLink /> },
    { title: 'Logs', links: logsPath, icon: <LuLogs /> }
  ];

  return (
    <div className="w-full h-full p-1 relative">
      <div className="w-full">
        <div className="flex flex-col h-screen lg:h-screen-minus-240 overflow-x-hidden overflow-y-auto scrollbar-hide">
          {/* <div className="w-full flex items-center rounded-xl border border-primary px-3 focus:border-hover mb-4">
            <SearchComponent />
          </div> */}
          {/* Map through navLinks to render NavLinks */}

          <LinkComponent navLinks={navLinks} onClick={handleLinkClick} isActive={isActive} />

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
