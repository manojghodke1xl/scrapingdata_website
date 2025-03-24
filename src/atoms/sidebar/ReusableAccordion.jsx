import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import useLayout from '../../hooks/useLayout';

const ReusableAccordion = ({ key, title, links, icon, isOpen, onToggle, handleToggleSidebar }) => {
  const { pathname } = useLocation();
  const { layoutSize } = useLayout();

  const isActive = (menuPaths) => menuPaths.some((path) => pathname.startsWith(path));

  return (
    <Accordion
      key={key}
      open={isOpen}
      icon={
        <IoIosArrowDown
          className={`${isOpen ? 'rotate-180' : ''}  ${layoutSize === 'small' ? 'text-sm' : layoutSize === 'large' ? 'text-xl' : 'text-base'} transition-transform`}
        />
      }
      className="bg-transparent"
    >
      <AccordionHeader
        onClick={onToggle}
        className={`${
          layoutSize === 'small' ? 'text-sm px-2 py-1' : layoutSize === 'large' ? 'text-xl px-6 py-2' : 'text-base px-4 py-2'
        } text-left rounded-xl flex gap-2 items-center border-0 shadow-none focus:outline-none ${
          isOpen ? 'bg-primary-faded text-brand' : 'hover:bg-hover bg-inherit text-primary'
        }`}
      >
        <div className={`flex gap-2 items-center`}>
          <span>{icon}</span>
          <span>{title}</span>
        </div>
      </AccordionHeader>

      <AccordionBody className="space-y-1 py-2">
        {links.map(({ to, title }) => (
          <Link
            key={title}
            to={to[0]}
            onClick={handleToggleSidebar}
            className={`block font-medium rounded-xl ${isActive(to) ? 'bg-primary-faded text-brand' : 'text-primary hover:bg-hover bg-inherit'} ${
              layoutSize === 'small' ? 'text-sm px-2 py-1' : layoutSize === 'large' ? 'text-xl px-6 py-2' : 'text-base px-4 py-2'
            }`}
          >
            <span>{title}</span>
          </Link>
        ))}
      </AccordionBody>
    </Accordion>
  );
};

export default ReusableAccordion;
