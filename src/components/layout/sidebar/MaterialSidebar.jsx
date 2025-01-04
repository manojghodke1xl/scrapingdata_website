import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbFileSearch, TbUsersGroup } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdMessage } from 'react-icons/md';
import { FaRegImage, FaRegQuestionCircle } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import {
  adminNavLinks,
  contentManagementPath,
  siteSettingsPath,
  testimonialsPath,
  navLinks,
  mediaManagementPath,
  eventManagementPath,
  faqManagementPath,
  leadsManagementPath
} from './sidebarTabData';
import ReusableAccordion from '../../../atoms/sidebar/ReusableAccordion';
import useGlobalContext from '../../../hooks/useGlobalContext';
// import SearchComponent from '../../../atoms/common/SearchComponent';

const MaterialSidebar = () => {
  const { pathname } = useLocation();
  const { auth } = useGlobalContext();
  const [openAccordion, setOpenAccordion] = useState(null);

  const isActive = (menuPaths) => menuPaths.some((path) => pathname.startsWith(path));

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
              className={`py-2.5 px-3 rounded-xl flex gap-3 items-center ${isActive(to) ? 'bg-fadedblue text-blue' : 'text-primary hover:bg-gray-100 bg-white'}`}
            >
              <span className="text-3xl">{icon}</span>
              <span>{title}</span>
            </Link>
          ))}
          <ReusableAccordion
            title="Content Management"
            links={contentManagementPath}
            icon={<TbFileSearch />}
            isOpen={openAccordion === 'Content Management'}
            onToggle={() => setOpenAccordion(openAccordion === 'Content Management' ? null : 'Content Management')}
          />
          <ReusableAccordion
            title="Lead Management"
            links={leadsManagementPath}
            icon={<TbUsersGroup />}
            isOpen={openAccordion === 'Lead Management'}
            onToggle={() => setOpenAccordion(openAccordion === 'Lead Management' ? null : 'Lead Management')}
          />
          <ReusableAccordion
            title="Site Settings"
            links={siteSettingsPath}
            icon={<IoSettingsOutline />}
            isOpen={openAccordion === 'Site Settings'}
            onToggle={() => setOpenAccordion(openAccordion === 'Site Settings' ? null : 'Site Settings')}
          />
          <ReusableAccordion
            title="Media Management"
            links={mediaManagementPath}
            icon={<FaRegImage />}
            isOpen={openAccordion === 'Media Management'}
            onToggle={() => setOpenAccordion(openAccordion === 'Media Management' ? null : 'Media Management')}
          />
          <ReusableAccordion
            title="Event Management"
            links={eventManagementPath}
            icon={<FiCalendar />}
            isOpen={openAccordion === 'Event Management'}
            onToggle={() => setOpenAccordion(openAccordion === 'Event Management' ? null : 'Event Management')}
          />
          <ReusableAccordion
            title="Faq Management"
            links={faqManagementPath}
            icon={<FaRegQuestionCircle />}
            isOpen={openAccordion === 'Faq Management'}
            onToggle={() => setOpenAccordion(openAccordion === 'Faq Management' ? null : 'Faq Management')}
          />

          <ReusableAccordion
            title="Testimonials"
            links={testimonialsPath}
            icon={<MdMessage />}
            isOpen={openAccordion === 'Testimonials'}
            onToggle={() => setOpenAccordion(openAccordion === 'Features' ? null : 'Testimonials')}
          />

          {adminNavLinks
            .filter(({ title }) => auth.isSuperAdmin || title === 'Payments')
            .map(({ to, title, icon }) => (
              <Link
                key={title}
                to={to[0]}
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
