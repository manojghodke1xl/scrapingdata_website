import { useState } from 'react';
import { IoFilterSharp } from 'react-icons/io5';
import SearchComponent from '../common/SearchComponent';

const Filters = ({ categories, onCategorySelect, setSelectedCategory }) => {
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = categories.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full">
      <details
        name="tone"
        open={isOpenCategories}
        className="relative w-full cursor-default rounded-xl bg-inherit px-2 text-left text-primary shadow-sm border border-primary focus:outline-none focus:ring-0 sm:text-lg sm:leading-6"
        onToggle={(e) => setIsOpenCategories(e.target.open)}
      >
        <summary className="cursor-pointer py-2 text-left w-full text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center w-fit">
            <span className="block font-medium whitespace-nowrap text-sm">
              <span className="text-secondary font-normal flex gap-1 items-center">
                <IoFilterSharp />
                <span className="text-sm">Filters</span>
              </span>
            </span>
          </span>
        </summary>

        <ul
          className={`absolute left-0 top-11 z-40 min-w-fit max-w-[100px] max-h-[200px] rounded-xl bg-main text-sm shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar`}
        >
          <div className="w-full flex items-center rounded-xl border border-primary px-1">
            <SearchComponent inputClassName={'w-full'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="relative py-2">
            {filteredList?.map((category) => (
              <li
                key={category.id}
                className={`group relative cursor-default select-none text-primary hover:bg-hover`}
                onClick={(e) => {
                  e.currentTarget.closest('details').removeAttribute('open');
                  setSelectedCategory(category);
                  onCategorySelect(category);
                }}
              >
                <div className="flex items-center justify-center gap-1 p-1 px-2">
                  <span className={`block whitespace-nowrap font-normal`}>{category.name}</span>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </details>
    </div>
  );
};

export default Filters;
