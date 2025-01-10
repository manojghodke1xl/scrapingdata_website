import { useState, useRef, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';

const MultiSelectCheckbox = ({
  options,
  formLabel,
  label,
  onChange,
  isSuperAdmin,
  selected = [],
  error,
  divClassName,
  mode = 'ids' // 'ids' or 'objects'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Filter options based on the search query
  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
    <div className={`${divClassName} relative w-full`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-primary mb-2">{formLabel}</label>
      {/* Dropdown Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-3 border rounded-xl ${
          error ? 'border-fadered focus:border-fadered' : ' border-primary focus:border-blue'
        } bg-white text-primary`}
      >
        <span className="font-medium text-primary">{label}</span>

        <IoIosArrowDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-primary rounded-lg shadow-md">
          {/* Search Box */}
          <div className="p-2 border-b border-primary">
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-primary rounded-xl text-secondary placeholder-secondary focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {/* Select All Checkbox */}
            <div className="flex items-center px-3 py-2 border-b border-primary hover:bg-fadedblue">
              <input
                type="checkbox"
                id="select-all"
                checked={isSelectAllChecked}
                onChange={handleSelectAll}
                className="h-4 w-4 rounded border-primary text-blue focus:ring-blue-500"
              />
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
                <div key={option._id} className={`flex items-center px-3 py-2 hover:bg-fadedblue ${isChecked ? 'bg-fadedblue ' : ''} `}>
                  <input
                    type="checkbox"
                    id={option._id}
                    checked={isChecked}
                    onChange={() => handleChange(option._id)}
                    className={`h-4 w-4 rounded border-primary text-blue focus:ring-blue-500 ${error ? 'border-red-500' : ''}`}
                    disabled={isSuperAdmin}
                  />
                  <label htmlFor={option._id} className="ml-2 text-secondary cursor-pointer select-none">
                    {option.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default MultiSelectCheckbox;
