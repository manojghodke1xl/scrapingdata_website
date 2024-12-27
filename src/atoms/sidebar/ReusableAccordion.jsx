import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

const ReusableAccordion = ({ title, links, icon }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = (menuPaths) => menuPaths.some((path) => pathname.startsWith(path));

  return (
    <Accordion open={open} icon={<IoIosArrowDown className={`${open ? 'rotate-180' : ''} h-4 w-4 transition-transform`} />} className="bg-transparent text-base">
      <AccordionHeader
        onClick={() => setOpen((p) => !p)}
        className={`py-2.5 px-3 text-left text-base rounded-xl flex gap-2 items-center border-0 shadow-none focus:outline-none ${
          open ? 'bg-fadedblue text-blue' : 'hover:bg-gray-100 bg-white text-primary'
        }`}
      >
        <div className="flex gap-4 items-center">
          <span className="text-2xl">{icon}</span>
          <span>{title}</span>
        </div>
      </AccordionHeader>
      <AccordionBody className="space-y-1">
        {links.map(({ to, title }) => (
          <Link
            key={title}
            to={to[0]}
            className={`block text-primary text-base px-4 font-medium rounded-xl py-2.5 capitalize ${
              isActive(to) ? 'bg-fadedblue text-blue' : 'text-primary hover:bg-gray-100 bg-white'
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
