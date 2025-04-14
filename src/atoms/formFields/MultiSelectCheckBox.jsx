import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Checkbox from './Checkbox';
import SearchComponent from '../common/SearchComponent';

const MultiSelectCheckbox = ({
  options,
  formLabel,
  label,
  onChange,
  isSuperAdmin,
  selected = [],
  error,
  disabled,
  divClassName,
  mode = 'ids', // 'ids' or 'objects'
  showNameKey = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Filter options based on the search query
  const filteredOptions = options.filter(
    (option) => option.name?.toLowerCase().includes(searchQuery?.toLowerCase()) || (showNameKey && option[showNameKey]?.toLowerCase().includes(searchQuery?.toLowerCase()))
  );

  // Handle selecting/deselecting individual checkboxes
  const handleChange = (key) => {
    if (mode === 'ids') {
      const newSelectedOptions = selected.includes(key)
        ? selected.filter((selectedId) => selectedId !== key) // Remove the key
        : [...selected, key]; // Add the key
      onChange(newSelectedOptions);
    } else if (mode === 'objects') {
      const newSelectedOptions = selected.some((item) => item[key] !== undefined)
        ? selected.filter((item) => item[key] === undefined) // Remove the key-value pair
        : [...selected, { [key]: true }]; // Add the key-value pair
      onChange(newSelectedOptions);
    }
  };

  // Handle "Select All" logic
  const handleSelectAll = () => {
    if (mode === 'ids') {
      const allKeys = filteredOptions.map((option) => option._id);
      const newSelectedOptions = selected.length === allKeys.length ? [] : allKeys; // Toggle selection
      onChange(newSelectedOptions);
    } else if (mode === 'objects') {
      const allFilteredKeys = filteredOptions.map((option) => option._id);
      const allFilteredSelected = selected.filter((item) => allFilteredKeys.includes(Object.keys(item)[0])).length === allFilteredKeys.length;

      // Toggle selection for each object
      const newSelectedOptions = allFilteredSelected
        ? selected.filter((item) => !allFilteredKeys.includes(Object.keys(item)[0])) // Deselect all
        : [
            ...selected.filter((item) => !allFilteredKeys.includes(Object.keys(item)[0])), // Keep already selected items that are not in the filtered options
            ...filteredOptions.map((option) => ({ [option._id]: true })) // Select all
          ];

      onChange(newSelectedOptions);
    }
  };

  const isSelectAllChecked =
    mode === 'ids' ? selected.length > 0 && selected.length === filteredOptions.length : filteredOptions.every((option) => selected.some((item) => item[option._id] === true));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${divClassName}  relative w-full`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-primary mb-2">{formLabel}</label>
      {/* Dropdown Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-3 border rounded-xl ${
          error ? 'border-danger focus:border-fadered' : ' border-primary focus:border-secondary'
        } bg-inherit text-primary`}
      >
        <span className="font-medium text-primary">{label}</span>

        <IoIosArrowDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute z-10 w-full mt-1 bg-main border border-primary rounded-lg shadow-md`}>
          {/* Search Box */}
          <div className="px-2 border-b border-primary">
            <SearchComponent value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} inputRef={searchInputRef} />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {/* Select All Checkbox */}
            <div className="flex items-center px-3 py-2 border-b border-primary hover:bg-hover">
              <Checkbox id="select-all" checked={isSelectAllChecked} onChange={handleSelectAll} />
              <label htmlFor="select-all" className="ml-2 text-secondary cursor-pointer select-none font-medium">
                Select All
              </label>
            </div>

            {/* Individual Options */}
            {filteredOptions?.map((option) => {
              const isChecked =
                mode === 'ids'
                  ? isSuperAdmin
                    ? isSuperAdmin || selected.includes(option._id)
                    : selected.includes(option._id)
                  : selected.some((item) => item[option._id] === true);

              return (
                <div key={option._id} className={`flex items-center px-3 py-2  ${isChecked ? 'bg-primary-faded ' : 'hover:bg-hover'} `}>
                  <Checkbox id={option._id} checked={isChecked} onChange={() => handleChange(option._id)} disabled={isSuperAdmin || disabled} />
                  <label htmlFor={option._id} className="ml-2 text-secondary cursor-pointer select-none">
                    {option.name} {showNameKey && option[showNameKey] && `(${option[showNameKey]})`}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default MultiSelectCheckbox;
