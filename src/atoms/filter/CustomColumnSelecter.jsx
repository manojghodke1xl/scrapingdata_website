import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const CustomColumnComponent = ({
  options,
  onChange,
  isSuperAdmin,
  selected = [],
  error,
  marginTop,
  mode = 'ids' // 'ids' or 'objects'
}) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className={`relative w-full ${marginTop || 'mt-5'} `}>
      {/* Dropdown Menu */}

      <div className="w-full mt-1 bg-white border border-primary rounded-lg">
        {/* Search Box */}
        <div className="p-2 border-b border-primary">
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2  text-secondary placeholder-secondary focus:outline-none"
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
              mode === 'ids' ? (isSuperAdmin ? isSuperAdmin || selected.includes(option._id) : selected.includes(option._id)) : selected.some((item) => item[option._id] === true);

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

      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};
export default CustomColumnComponent;
