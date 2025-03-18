import { useEffect, useRef, useCallback, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import SearchComponent from '../common/SearchComponent';
import { IoIosArrowDown } from 'react-icons/io';
import TruncatableFieldToolTip from '../common/TruncatableFeildToolTip';

const DropDown = ({ mt = '', width = 'w-full', name, label, SummaryChild, dropdownList = [], commonFunction, search, selected, add = false, setIsNewSegment, error }) => {
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = dropdownList.filter((item) => item.showName.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) dropdownRef.current.removeAttribute('open');
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    const details = dropdownRef.current;
    const handleToggle = () => {
      if (details.hasAttribute('open') && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    };
    details.addEventListener('toggle', handleToggle);
    return () => details.removeEventListener('toggle', handleToggle);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      const { height } = dropdownRef.current.getBoundingClientRect();
      const remainingSpaceBelow = window.innerHeight - height - dropdownRef.current.getBoundingClientRect().top;
      setPlacement(remainingSpaceBelow > 192 ? 'below' : 'above');
    });
  }, []);
  const [placement, setPlacement] = useState('below'); // Placement state
  return (
    <div className={`w-full relative ${mt}`}>
      <label className="block text-sm font-medium text-primary mb-2">{label}</label>
      <details
        ref={dropdownRef}
        name={name}
        className={`relative ${width} cursor-default rounded-xl bg-inherit pl-3 pr-10 text-left text-primary shadow-sm border ${
          error ? 'border-danger' : 'border-primary'
        } focus:outline-none focus:ring-0 sm:text-lg sm:leading-6 `}
      >
        <summary className="cursor-pointer py-2.5 pr-8 text-left text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center">
            <span className="block font-medium whitespace-nowrap text-[16px]">
              <TruncatableFieldToolTip content={dropdownList.find((item) => item.name === selected)?.showName || SummaryChild} />
            </span>
          </span>
          <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <IoIosArrowDown />
          </span>
        </summary>
        <ul
          className={`absolute ${
            placement === 'above' ? 'bottom-full mb-1' : 'top-full mt-1'
          } end-0 top-11 z-40 mt-1 max-h-[192px] w-full overflow-hidden rounded-md bg-main text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
        >
          {search && (
            <div className="w-full flex items-center rounded-t-lg border border-primary px-3 bg-main sticky top-0 z-10">
              <SearchComponent value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} inputRef={searchInputRef} />
            </div>
          )}
          <div className="w-full relative overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(192px - 40px)' }}>
            {filteredList.map((item) => (
              <li
                key={item.id || item.name}
                className={`group relative cursor-default select-none py-2 pl-3 pr-9 text-primary ${item.name === selected ? 'bg-primary-faded' : 'hover:bg-hover'} ${
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
                className="w-full py-2 z-10 px-2 pl-4 md:px-4 border-t border-primary mt-2 flex gap-2 items-center hover:bg-hover"
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
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default DropDown;
