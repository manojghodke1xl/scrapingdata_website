import { useState } from 'react';
import { IoFilterSharp } from 'react-icons/io5';
import SearchComponent from '../common/SearchComponent';
// import { IoMdCheckmark } from 'react-icons/io';

const Filters = ({ categories, onCategorySelect, setSelectedCategory, selectedCategory }) => {
  const [isOpenCategories, setIsOpenCategories] = useState(false);

  return (
    <>
      <div className="dropdown-container relative w-full">
        <details
          name="tone"
          open={isOpenCategories}
          className="relative w-full cursor-default rounded-xl bg-white px-4 text-left text-primary shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-0 sm:text-lg sm:leading-6"
          onToggle={(e) => setIsOpenCategories(e.target.open)}
        >
          <summary className="cursor-pointer py-2.5 text-left w-full pr-0 text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
            <span className="flex items-center w-fit">
              <span className="block font-medium whitespace-nowrap text-[16px]">
                <span className="text-secondary font-normal flex gap-2 items-center">
                  <span>
                    <IoFilterSharp size={20} />
                  </span>
                  <span className="">Filters</span>
                </span>
              </span>
            </span>
          </summary>

          <ul className="absolute end-0 top-11 z-40 mt-1 max-w-[300px] max-h-[350px] rounded-xl bg-white text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar">
            <div className="w-full flex items-center rounded-xl border border-primary px-3">
              <SearchComponent />
            </div>
            <div className="relative">
              {/*${selectedCategory?.id === category.id ? 'bg-lightcyan' : ''}*/}
              {categories?.map((category) => (
                <li
                  key={category.id}
                  className={`group relative cursor-default select-none py-2 pl-3 pr-14 text-primary hover:bg-gray-50`}
                  onClick={(e) => {
                    e.currentTarget.closest('details').removeAttribute('open');
                    setSelectedCategory(category);
                    onCategorySelect(category);
                  }}
                >
                  <div className="flex items-center">
                    {/* ${selectedCategory?.id === category.id ? 'font-semibold' : ''} */}
                    <span className={`ml-3 block whitespace-nowrap font-normal`}>{category.name}</span>
                  </div>

                  {/* {selectedCategory?.id === category.id && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                      <IoMdCheckmark />
                    </span>
                  )} */}
                </li>
              ))}
            </div>
          </ul>
        </details>
      </div>
    </>
  );
};

export default Filters;
