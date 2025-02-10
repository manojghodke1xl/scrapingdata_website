import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useColor } from '../../contexts/contexts/ColorContext';
import Checkbox from '../formFields/Checkbox';

const StatusFilter = ({ statuses, setStatusFilter }) => {
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxClick = (status) => {
    setSelectedCategory(status);
    setIsOpen(false);
    setStatusFilter(status.name.toLowerCase());
  };

  return (
    <div className="dropdown-container relative">
      <details
        name="tone"
        open={isOpen}
        className="relative w-full cursor-default rounded-xl bg-inherit px-4 text-left text-primary shadow-sm border border-secondary focus:outline-none focus:ring-0 sm:text-lg sm:leading-6"
        onToggle={(e) => setIsOpen(e.target.open)}
      >
        <summary className="cursor-pointer py-2.5 text-left w-full pr-0 text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center w-fit">
            <span className="block font-medium whitespace-nowrap text-[16px]">
              {selectedCategory?.name ? (
                <span>Status : {selectedCategory.name}</span>
              ) : (
                <span className="text-secondary font-normal flex gap-2 items-center">
                  <span>Status</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </span>
              )}
            </span>
          </span>
        </summary>

        <ul
          className={`absolute left-0 top-11 z-40 mt-1 min-w-[100px] max-w-[300px] max-h-[200px] rounded-xl bg-main text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar`}
        >
          <div className="relative py-2 border-b border-primary">
            {statuses.map((status) => (
              <li
                key={status.id}
                className={`group relative cursor-default select-none py-2 pl-3 pr-14 text-primary  ${selectedCategory?.id === status.id ? 'bg-primary-faded' : 'hover:bg-hover'}`}
                onClick={() => handleCheckboxClick(status)}
              >
                <div className="flex items-center">
                  <div className={`ml-1 whitespace-nowrap font-normal flex gap-4 items-center ${selectedCategory?.id === status.id ? 'font-semibold' : ''}`}>
                    <Checkbox checked={selectedCategory?.id === status.id} onChange={() => {}} />

                    <div className="px-2 py-1 rounded-lg flex gap-2 items-center" style={{ backgroundColor: status.bgColor, color: status.color }}>
                      <span className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: status.dotColor }}></span>
                      <span>{status.name}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
          {/* <button className="w-full py-3 pb-5 font-normal text-left px-4 hover:bg-hover" onClick={(e) => e.currentTarget.closest('details').removeAttribute('open')}>
            Add to advanced filter
          </button> */}
        </ul>
      </details>
    </div>
  );
};

export default StatusFilter;
