import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbUserQuestion } from 'react-icons/tb';
import { GiAlliedStar } from 'react-icons/gi';
import { RiLightbulbLine } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';
import { LiaUserLockSolid } from 'react-icons/lia';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { addOns, admin, enquiresPaths, essentials, features, navLinks, support } from './sidebarTabData';
// import SearchComponent from '../../../atoms/common/SearchComponent';
import ReusableAccordion from '../../../atoms/sidebar/ReusableAccordion';

const MaterialSidebar = () => {
  const { pathname } = useLocation();
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
            title="Enquires"
            links={enquiresPaths}
            icon={<TbUserQuestion />}
            isOpen={openAccordion === 'Enquires'}
            onToggle={() => setOpenAccordion(openAccordion === 'Enquires' ? null : 'Enquires')}
          />
          <ReusableAccordion
            title="Features"
            links={features}
            icon={<GiAlliedStar />}
            isOpen={openAccordion === 'Features'}
            onToggle={() => setOpenAccordion(openAccordion === 'Features' ? null : 'Features')}
          />
          <ReusableAccordion
            title="Essentials"
            links={essentials}
            icon={<RiLightbulbLine />}
            isOpen={openAccordion === 'Essentials'}
            onToggle={() => setOpenAccordion(openAccordion === 'Essentials' ? null : 'Essentials')}
          />
          <ReusableAccordion
            title="Admin"
            links={admin}
            icon={<LiaUserLockSolid />}
            isOpen={openAccordion === 'Admin'}
            onToggle={() => setOpenAccordion(openAccordion === 'Admin' ? null : 'Admin')}
          />
          <ReusableAccordion
            title="Support"
            links={support}
            icon={<BiSupport />}
            isOpen={openAccordion === 'Support'}
            onToggle={() => setOpenAccordion(openAccordion === 'Support' ? null : 'Support')}
          />
          <ReusableAccordion
            title="Add-ons"
            links={addOns}
            icon={<IoExtensionPuzzleOutline />}
            isOpen={openAccordion === 'Add-ons'}
            onToggle={() => setOpenAccordion(openAccordion === 'Add-ons' ? null : 'Add-ons')}
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialSidebar;
