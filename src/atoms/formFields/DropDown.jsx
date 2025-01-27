import { useEffect, useRef, useCallback, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import SearchComponent from '../common/SearchComponent';
import { IoIosArrowDown } from 'react-icons/io';
import TruncatableFieldToolTip from '../common/TruncatableFeildToolTip';

const DropDown = ({ mt = '', width = 'w-full', name, label, SummaryChild, dropdownList = [], commonFunction, search, selected, add = false, setIsNewSegment, error }) => {
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = dropdownList.filter((item) => item.showName.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) dropdownRef.current.removeAttribute('open');
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className={`w-full ${mt}`}>
      <label className="block text-sm font-medium text-primary mb-2">{label}</label>
      <details
        ref={dropdownRef}
        name={name}
        className={`relative ${width} cursor-default rounded-xl bg-white pl-3 pr-10 text-left text-primary shadow-sm border ${
          error ? 'border-danger' : 'border-primary'
        } focus:outline-none focus:ring-0 sm:text-lg sm:leading-6 `}
      >
        <summary className="cursor-pointer py-2.5 pr-8 text-left text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center">
            <span className="block font-medium whitespace-nowrap text-[16px]">
              <TruncatableFieldToolTip title={label} content={dropdownList.find((item) => item.name === selected)?.showName || SummaryChild} />
            </span>
          </span>
          <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <IoIosArrowDown />
          </span>
        </summary>
        <ul className="absolute end-0 top-11 z-40 mt-1 max-h-48 w-full rounded-md bg-white text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar">
          {search && (
            <div className="w-full flex items-center rounded-t-lg border border-primary px-3">
              <SearchComponent value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          )}
          <div className="w-full relative">
            {filteredList.map((item) => (
              <li
                key={item.id || item.name}
                className={`group relative cursor-default select-none py-2 pl-3 pr-9 text-primary ${item.name === selected ? 'bg-fadedblue' : 'hover:bg-gray-50'} ${
                  item.disabled ? 'cursor-not-allowed' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!item.disabled) {
                    (item.seperateFunction || commonFunction)(item);
                    e.currentTarget.closest('details').removeAttribute('open');
                  }
                }}
              >
                <div className="flex flex-col items-start ml-3">
                  <span className={`block whitespace-nowrap font-normal ${item.name === selected ? 'font-semibold' : ''}`}>{item.showName}</span>
                  {item.description && <span className="text-sm text-secondary font-normal">{item.description}</span>}
                </div>
              </li>
            ))}
            {add && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.closest('details').removeAttribute('open');
                  setIsNewSegment(true);
                }}
                className="w-full py-2 z-10 px-2 pl-4 md:px-4 border-t border-primary mt-2 flex gap-2 items-center hover:bg-gray-50"
              >
                <span>
                  <IoAdd className="text-3xl" />
                </span>
                <span className="text-secondary">Create New Segment</span>
              </button>
            )}
          </div>
        </ul>
      </details>
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default DropDown;
