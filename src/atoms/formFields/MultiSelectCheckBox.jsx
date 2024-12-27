import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';

const MultiSelectCheckbox = ({ options, label, onChange, isSuperAdmin, selected, error, marginTop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options based on the search query
  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Handle selecting/deselecting individual checkboxes
  const handleChange = (id) => {
    const newSelectedOptions = selected.includes(id)
      ? selected.filter((selectedId) => selectedId !== id) // Remove the id
      : [...selected, id]; // Add the id
    onChange(newSelectedOptions); // Send updated list of IDs to parent component
  };

  // Handle "Select All" logic
  const handleSelectAll = () => {
    const allIds = filteredOptions.map((option) => option._id);
    const newSelectedOptions = selected.length === allIds.length ? [] : allIds;
    onChange(newSelectedOptions);
  };

  return (
    <div className={`relative w-full ${marginTop || 'mt-5'} `}>
      {/* Dropdown Header */}
      <button
        type="buttton"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-3 border rounded-xl ${
          error ? 'border-fadered focus:border-fadered' : ' border-primary focus:border-blue'
        } bg-white text-primary`}
      >
        <span>{label}</span>
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
                className="w-full pl-10 pr-3 py-2 border border-primary rounded-md text-secondary placeholder-secondary focus:outline-none focus:border-secondary"
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
                checked={selected?.length > 0 && selected?.length === filteredOptions?.length}
                onChange={handleSelectAll}
                className="h-4 w-4 rounded border-primary text-blue focus:ring-blue-500"
              />
              <label htmlFor="select-all" className="ml-2 text-secondary cursor-pointer select-none font-medium">
                Select All
              </label>
            </div>

            {/* Individual Options */}
            {filteredOptions?.map((option) => (
              <div key={option._id} className={`flex items-center px-3 py-2 hover:bg-fadedblue ${selected?.includes(option._id) ? 'bg-fadedblue ' : ''} `}>
                <input
                  type="checkbox"
                  id={option._id}
                  checked={isSuperAdmin ? isSuperAdmin || selected?.includes(option._id) : selected?.includes(option._id)} // Check based on isSuperAdmin or selected sites
                  onChange={() => handleChange(option._id)} // Pass ID to handler
                  className={`h-4 w-4 rounded border-primary text-blue focus:ring-blue-500 ${error ? 'border-red-500' : ''}`} // Add red border if there's an error
                  disabled={isSuperAdmin} // Disable if isSuperAdmin
                />
                <label htmlFor={option._id} className="ml-2 text-secondary cursor-pointer select-none">
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default MultiSelectCheckbox;
