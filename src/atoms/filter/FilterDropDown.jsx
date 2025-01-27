import { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FilterDropDown = ({ name, data, selected, setDataId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSites, setSelectedSites] = useState(null);
  console.log('selected', selected);

  useEffect(() => {
    if (selected) {
      const selectedItem = data?.find((item) => item._id === selected);
      if (selectedItem) {
        setSelectedSites(selectedItem);
      }
    }
  }, [selected, data]);

  const handleCheckboxClick = (site) => {
    setSelectedSites(site);
    setDataId(site._id);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container relative">
      <details
        name="tone"
        open={isOpen}
        className="relative w-full cursor-default rounded-xl bg-white px-4 text-left text-primary shadow-sm border border-fadedblue focus:outline-none focus:ring-0 sm:text-lg sm:leading-6"
        onToggle={(e) => setIsOpen(e.target.open)}
      >
        <summary className="cursor-pointer py-2.5 text-left w-full pr-0 text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center w-fit">
            <span className="block font-medium whitespace-nowrap text-[16px]">
              {selectedSites?.name ? (
                <span>
                  {name} : {data.find((item) => item._id === selected)?.name}
                </span>
              ) : (
                <span className="text-secondary font-normal flex gap-2 items-center">
                  <span>{name}</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </span>
              )}
            </span>
          </span>
        </summary>
        <ul className="absolute end-0 top-11 z-40 mt-1 min-w-[250px] max-w-[300px] max-h-[200px] rounded-xl bg-white text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar">
          <div className="relative py-2 border-b border-primary">
            {data?.map((site) => (
              <li
                key={site._id}
                className={`group relative cursor-default select-none py-2 pl-3 pr-14 text-primary hover:bg-gray-50 ${selectedSites?._id === site._id ? 'bg-lightcyan' : ''}`}
                onClick={() => handleCheckboxClick(site)}
              >
                <div className="flex items-center">
                  <div className={`ml-1 whitespace-nowrap font-normal flex gap-4 items-center ${selectedSites?._id === site._id ? 'font-semibold' : ''}`}>
                    <div className="px-2 py-1 rounded-lg flex gap-2 items-center">
                      <span className="w-[8px] h-[8px] rounded-full"></span>
                      <span>{site.name}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
          <button className="w-full py-3 pb-5 font-normal text-left px-4 hover:bg-gray-50" onClick={(e) => e.currentTarget.closest('details').removeAttribute('open')}>
            Add to advanced filter
          </button>
        </ul>
      </details>
    </div>
  );
};

export default FilterDropDown;
