import { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import TruncatableFieldToolTip from '../common/TruncatableFeildToolTip';
import SearchComponent from '../common/SearchComponent';

const FilterDropDown = ({ name, data, selected, setDataId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSites, setSelectedSites] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = data.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    if (selected) {
      const selectedItem = data?.find((item) => item._id === selected);
      if (selectedItem) {
        setSelectedSites(selectedItem);
      }
    }
  }, [selected, data]);

  const handleCheckboxClick = (site) => {
    if (selectedSites?._id === site._id) {
      setSelectedSites(null);
      setDataId('');
    } else {
      setSelectedSites(site);
      setDataId(site._id);
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
        <summary className="cursor-pointer py-2 text-left w-full pr-0 text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center w-fit">
            <span className="block font-medium whitespace-nowrap text-sm">
              {selectedSites?.name ? (
                <span>
                  <TruncatableFieldToolTip content={`${name}: ${data.find((item) => item._id === selected)?.name}`} />
                </span>
              ) : (
                <span className="text-secondary font-normal flex gap-1 items-center">
                  <span>{name}</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </span>
              )}
            </span>
          </span>
        </summary>
        <ul
          className={`absolute left-0 top-11 z-40 mt-1 min-w-[200px] max-w-[220px] max-h-[200px] rounded-xl bg-main text-sm shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar`}
        >
          <div className="sticky top-0 z-10 bg-main w-full flex items-center rounded-xl border border-primary px-1">
            <SearchComponent inputClassName={'w-full'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="relative py-2">
            {filteredList?.map((site) => (
              <li
                key={site._id}
                className={`group relative cursor-default select-none text-primary ${selectedSites?._id === site._id ? 'bg-primary-faded' : 'hover:bg-hover'}`}
                onClick={() => handleCheckboxClick(site)}
              >
                <div className="flex items-center py-1 px-2 gap-1 justify-start whitespace-nowrap font-normal">
                  <div className={`flex items-center ${selectedSites?._id === site._id ? 'font-semibold' : ''}`}>
                    <div className="rounded-lg flex items-center">
                      <span>{site.name}</span>
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

export default FilterDropDown;
