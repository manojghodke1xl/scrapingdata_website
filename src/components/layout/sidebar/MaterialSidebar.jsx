import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbFileSearch, TbUsersGroup } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdMessage } from 'react-icons/md';
import { FaBullhorn, FaRegImage, FaRegQuestionCircle } from 'react-icons/fa';
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
  leadsManagementPath,
  marketingManagementPath,
  productManagementPath
} from './sidebarTabData';
import ReusableAccordion from '../../../atoms/sidebar/ReusableAccordion';
import useGlobalContext from '../../../hooks/useGlobalContext';
import { AiOutlineProduct } from 'react-icons/ai';
// import SearchComponent from '../../../atoms/common/SearchComponent';

const MaterialSidebar = () => {
  const { pathname } = useLocation();
  const { auth } = useGlobalContext();
  const [openAccordion, setOpenAccordion] = useState(null);

  const isActive = (menuPaths) => menuPaths.some((path) => pathname.startsWith(path));
  const handleLinkClick = () => setOpenAccordion(null);

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
            title="Content"
            links={contentManagementPath}
            icon={<TbFileSearch />}
            isOpen={openAccordion === 'Contents'}
            onToggle={() => setOpenAccordion(openAccordion === 'Contents' ? null : 'Contents')}
          />

          <ReusableAccordion
            title="Marketing"
            links={marketingManagementPath}
            icon={<FaBullhorn />}
            isOpen={openAccordion === 'Marketing'}
            onToggle={() => setOpenAccordion(openAccordion === 'Marketing' ? null : 'Marketing')}
          />

          <ReusableAccordion
            title="Product"
            links={productManagementPath}
            icon={<AiOutlineProduct />}
            isOpen={openAccordion === 'Products'}
            onToggle={() => setOpenAccordion(openAccordion === 'Products' ? null : 'Products')}
          />

          <ReusableAccordion
            title="Lead"
            links={leadsManagementPath}
            icon={<TbUsersGroup />}
            isOpen={openAccordion === 'Leads'}
            onToggle={() => setOpenAccordion(openAccordion === 'Leads' ? null : 'Leads')}
          />

          <ReusableAccordion
            title="Site Settings"
            links={siteSettingsPath}
            icon={<IoSettingsOutline />}
            isOpen={openAccordion === 'Site Settings'}
            onToggle={() => setOpenAccordion(openAccordion === 'Site Settings' ? null : 'Site Settings')}
          />

          <ReusableAccordion
            title="Media"
            links={mediaManagementPath}
            icon={<FaRegImage />}
            isOpen={openAccordion === 'Media'}
            onToggle={() => setOpenAccordion(openAccordion === 'Media' ? null : 'Media')}
          />

          <ReusableAccordion
            title="Event"
            links={eventManagementPath}
            icon={<FiCalendar />}
            isOpen={openAccordion === 'Events'}
            onToggle={() => setOpenAccordion(openAccordion === 'Events' ? null : 'Events')}
          />

          <ReusableAccordion
            title="Faq"
            links={faqManagementPath}
            icon={<FaRegQuestionCircle />}
            isOpen={openAccordion === 'Faqs'}
            onToggle={() => setOpenAccordion(openAccordion === 'Faqs' ? null : 'Faqs')}
          />

          <ReusableAccordion
            title="Testimonials"
            links={testimonialsPath}
            icon={<MdMessage />}
            isOpen={openAccordion === 'Testimonials'}
            onToggle={() => setOpenAccordion(openAccordion === 'Testimonials' ? null : 'Testimonials')}
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
