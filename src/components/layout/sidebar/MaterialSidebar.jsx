import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbFileSearch, TbTemplate, TbUsersGroup } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdMessage } from 'react-icons/md';
import { FaBullhorn, FaChartLine, FaRegFile, FaRegImage, FaRegQuestionCircle } from 'react-icons/fa';
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
  afterSalesPath
} from './sidebarTabData';
import ReusableAccordion from '../../../atoms/sidebar/ReusableAccordion';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { AiOutlineProduct } from 'react-icons/ai';
// import SearchComponent from '../../../atoms/common/SearchComponent';

const MaterialSidebar = ({ handleToggleSidebar }) => {
  const { pathname } = useLocation();
  const { auth } = useGlobalContext();
  const [openAccordion, setOpenAccordion] = useState(null);

  const isActive = (menuPaths) => menuPaths.some((path) => pathname.startsWith(path));
  const handleLinkClick = () => {
    setOpenAccordion(null);
    handleToggleSidebar();
  };

  return (
    <div className="w-[320px] h-full px-3 ptpb-4 sm:py-6 relative">
      <div className="w-full">
        <div className="flex flex-col space-y-2 h-screen lg:h-screen-minus-240 overflow-x-hidden overflow-y-auto scrollbar-hide">
          {/* <div className="w-full flex items-center rounded-xl border border-primary px-3 focus:border-hover mb-4">
            <SearchComponent />
          </div> */}
          {/* Map through navLinks to render NavLinks */}
          {navLinks.map(({ to, title, icon }) => (
            <Link
              key={title}
              to={to[0]}
              onClick={handleLinkClick}
              className={`py-2.5 px-3 rounded-xl flex gap-3 items-center ${isActive(to) ? 'bg-fadedblue text-blue' : 'text-primary hover:bg-gray-100 bg-white'}`}
            >
              <span className="text-3xl">{icon}</span>
              <span>{title}</span>
            </Link>
          ))}

          <ReusableAccordion
            title="Contents"
            links={contentsPath}
            icon={<TbFileSearch />}
            isOpen={openAccordion === 'Contents'}
            onToggle={() => setOpenAccordion(openAccordion === 'Contents' ? null : 'Contents')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="Marketing"
            links={marketingPath}
            icon={<FaBullhorn />}
            isOpen={openAccordion === 'Marketing'}
            onToggle={() => setOpenAccordion(openAccordion === 'Marketing' ? null : 'Marketing')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="Products"
            links={productsPath}
            icon={<AiOutlineProduct />}
            isOpen={openAccordion === 'Products'}
            onToggle={() => setOpenAccordion(openAccordion === 'Products' ? null : 'Products')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="Leads"
            links={leadsPath}
            icon={<TbUsersGroup />}
            isOpen={openAccordion === 'Leads'}
            onToggle={() => setOpenAccordion(openAccordion === 'Leads' ? null : 'Leads')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="Site Settings"
            links={siteSettingsPath}
            icon={<IoSettingsOutline />}
            isOpen={openAccordion === 'Site Settings'}
            onToggle={() => setOpenAccordion(openAccordion === 'Site Settings' ? null : 'Site Settings')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="Media"
            links={mediaPath}
            icon={<FaRegImage />}
            isOpen={openAccordion === 'Media'}
            onToggle={() => setOpenAccordion(openAccordion === 'Media' ? null : 'Media')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="Files"
            links={filesPath}
            icon={<FaRegFile />}
            isOpen={openAccordion === 'Files'}
            onToggle={() => setOpenAccordion(openAccordion === 'Files' ? null : 'Files')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="Events"
            links={eventsPath}
            icon={<FiCalendar />}
            isOpen={openAccordion === 'Events'}
            onToggle={() => setOpenAccordion(openAccordion === 'Events' ? null : 'Events')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="After Sales"
            links={afterSalesPath}
            icon={<FaChartLine />}
            isOpen={openAccordion === 'Sales'}
            onToggle={() => setOpenAccordion(openAccordion === 'Sales' ? null : 'Sales')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="FAQs"
            links={faqsPath}
            icon={<FaRegQuestionCircle />}
            isOpen={openAccordion === 'FAQs'}
            onToggle={() => setOpenAccordion(openAccordion === 'FAQs' ? null : 'FAQs')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="Testimonials"
            links={testimonialsPath}
            icon={<MdMessage />}
            isOpen={openAccordion === 'Testimonials'}
            onToggle={() => setOpenAccordion(openAccordion === 'Testimonials' ? null : 'Testimonials')}
            handleToggleSidebar={handleToggleSidebar}
          />

          <ReusableAccordion
            title="Templates"
            links={templatePath}
            icon={<TbTemplate />}
            isOpen={openAccordion === 'Templates'}
            onToggle={() => setOpenAccordion(openAccordion === 'Templates' ? null : 'Templates')}
            handleToggleSidebar={handleToggleSidebar}
          />

          {adminNavLinks
            .filter(({ title }) => auth.isSuperAdmin || title !== 'Admin')
            .map(({ to, title, icon }) => (
              <Link
                key={title}
                to={to[0]}
                onClick={handleLinkClick}
                className={`py-2.5 px-3 rounded-xl flex gap-3 items-center ${isActive(to) ? 'bg-fadedblue text-blue' : 'text-primary hover:bg-gray-100 bg-white'}`}
              >
                <span className="text-3xl">{icon}</span>
                <span>{title}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialSidebar;
