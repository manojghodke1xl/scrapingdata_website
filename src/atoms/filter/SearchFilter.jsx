import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const SearchFilter = ({ searchCategory, setSearchKey, selectedCategory, setSelectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxClick = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
      setSearchKey('');
    } else {
      if (category.name === 'Phone Number') setSearchKey('mobile');
      else setSearchKey(category.name.toLowerCase());
      setSelectedCategory({ ...category, type: 'search' });
    }
    setIsOpen(false);
  };

  return (
    <div className="w-fit">
      <details
        name="tone"
        open={isOpen}
        className="relative w-fit cursor-default rounded-xl bg-inherit px-2 text-left text-primary shadow-sm border border-primary focus:outline-none focus:ring-0 sm:text-lg sm:leading-6"
        onToggle={(e) => setIsOpen(e.target.open)}
      >
        <summary className="cursor-pointer py-2 text-left text-sm w-full text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center w-fit">
            <span className="block font-medium whitespace-nowrap text-sm">
              {selectedCategory?.type === 'search' ? (
                <span>Search by: {selectedCategory.name}</span>
              ) : (
                <span className="text-secondary font-normal flex gap-1 items-center">
                  <span>Search by</span>
                  <IoIosArrowDown />
                </span>
              )}
            </span>
          </span>
        </summary>
        <ul
          className={`absolute top-11 left-0 z-40 min-w-fit max-w-[100px] max-h-[200px] rounded-xl bg-main text-sm shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto custom-scrollbar`}
        >
          <div className="relative border-b border-primary px-6 py-1">
            {searchCategory?.map((category) => (
              <li
                key={category.id}
                className={`group relative cursor-default select-none text-primary hover:bg-hover ${selectedCategory?.id === category.id ? 'bg-primary-faded' : 'hover:bg-hover'}`}
                onClick={() => handleCheckboxClick(category)}
              >
                <div className={`whitespace-nowrap font-normal justify-center flex gap-1 p-1 px-2 items-center ${selectedCategory?.id === category.id ? 'font-semibold' : ''}`}>
                  <div className="rounded-lg flex items-center">
                    <span>{category.name}</span>
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
