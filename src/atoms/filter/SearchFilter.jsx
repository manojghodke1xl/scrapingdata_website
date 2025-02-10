import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useColor } from '../../contexts/contexts/ColorContext';

const SearchFilter = ({ searchCategory, setSearchKey, selectedCategory, setSelectedCategory }) => {
 
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxClick = (category) => {
    if (category.name === 'Phone Number') setSearchKey('mobile');
    else setSearchKey(category.name.toLowerCase());
    setSelectedCategory({ ...category, type: 'search' });
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container relative w-full">
      <details
        name="tone"
        open={isOpen}
        className="relative w-fit cursor-default rounded-xl bg-inherit px-4 text-left text-primary shadow-sm border border-primary focus:outline-none focus:ring-0 sm:text-lg sm:leading-6"
        onToggle={(e) => setIsOpen(e.target.open)}
      >
        <summary className="cursor-pointer py-2.5 text-left w-full pr-0 text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center w-fit">
            <span className="block font-medium whitespace-nowrap text-[16px]">
              {selectedCategory?.type === 'search' ? (
                <span>Search by: {selectedCategory.name}</span>
              ) : (
                <span className="text-secondary font-normal flex gap-2 items-center">
                  <span>Search by</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </span>
              )}
            </span>
          </span>
        </summary>
        <ul
          className={`absolute end-0 top-11 z-40 mt-1 min-w-fit max-w-[300px] max-h-[350px] rounded-xl bg-main text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar`}
        >
          <div className="relative py-2 border-b border-primary">
            {searchCategory?.map((category) => (
              <li
                key={category.id}
                className={`group relative cursor-default select-none py-2 pl-3 pr-14 text-primary hover:bg-hover ${selectedCategory?.id === category.id ? 'bg-lightcyan' : ''}`}
                onClick={() => handleCheckboxClick(category)}
              >
                <div className="flex items-center">
                  <div className={`ml-1 whitespace-nowrap font-normal flex gap-4 items-center ${selectedCategory?.id === category.id ? 'font-semibold' : ''}`}>
                    <div className="px-2 py-1 rounded-lg flex gap-2 items-center">
                      <span>{category.name}</span>
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

export default SearchFilter;
