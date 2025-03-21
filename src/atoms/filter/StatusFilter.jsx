import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Checkbox from '../formFields/Checkbox';

const StatusFilter = ({ statuses, setStatusFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxClick = (status) => {
    if (selectedCategory?.id === status.id) {
      setSelectedCategory(null);
      setStatusFilter('');
    } else {
      setSelectedCategory(status);
      setStatusFilter(status.name.toLowerCase());
    }
    setIsOpen(false);
  };

  return (
    <div className="w-fit">
      <details
        name="tone"
        open={isOpen}
        className="relative w-full cursor-default rounded-xl bg-inherit px-2 text-left text-primary shadow-sm border border-secondary focus:outline-none focus:ring-0 sm:text-lg sm:leading-6"
        onToggle={(e) => setIsOpen(e.target.open)}
      >
        <summary className="cursor-pointer py-2 text-sm text-left w-full pr-0 text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center w-fit">
            <span className="block font-medium whitespace-nowrap">
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
          className={`absolute left-0 top-11 z-40 mt-1 min-w-fit max-w-[100px] max-h-[200px] rounded-xl bg-main text-sm shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar`}
        >
          <div className="relative px-2 py-1 border-b border-primary">
            {statuses.map((status) => (
              <li
                key={status.id}
                className={`group relative cursor-default select-none text-primary  ${selectedCategory?.id === status.id ? 'bg-primary-faded' : 'hover:bg-hover'}`}
                onClick={() => handleCheckboxClick(status)}
              >
                <div className="flex items-center gap-1 p-1">
                  <div className={`whitespace-nowrap font-normal flex gap-1 items-center ${selectedCategory?.id === status.id ? 'font-semibold' : ''}`}>
                    <Checkbox checked={selectedCategory?.id === status.id} />

                    <div className="p-1 rounded-lg flex gap-1 items-center" style={{ backgroundColor: status.bgColor, color: status.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.dotColor }}></span>
                      <span className="text-sm">{status.name}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </details>
    </div>
  );
};

export default StatusFilter;
