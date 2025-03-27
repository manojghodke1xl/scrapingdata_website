/**
 * LayoutDropdown Component
 * A dropdown component that allows users to select different layout sizes
 *
 * @component
 * @param {Object} props
 * @param {string} props.layoutSize - Current layout size ('small', 'medium', 'large')
 * @param {function} props.updateLayoutSize - Callback function to update layout size
 */

import { useCallback, useState, useEffect, useRef } from 'react';
import { IoReorderFourOutline } from 'react-icons/io5';

const LayoutDropdown = ({ layoutSize, updateLayoutSize }) => {
  // State to manage dropdown open/close
  const [isOpen, setIsOpen] = useState(false);
  // Reference to detect clicks outside dropdown
  const dropdownRef = useRef(null);

  // Optimized toggle handler with useCallback to prevent unnecessary re-renders
  const handleToggle = useCallback((e) => setIsOpen(e.target.open), []);

  // Effect to handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Available layout size options
  const options = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  return (
    <details
      ref={dropdownRef}
      name="tone"
      open={isOpen}
      // Dynamic classes based on layout size for responsive styling
      className={`relative w-full cursor-default rounded-xl bg-inherit text-left text-primary shadow-sm border border-primary focus:outline-none focus:ring-0 sm:text-lg sm:leading-6 p-2 ${
        layoutSize === 'small' ? 'text-sm' : layoutSize === 'large' ? 'text-lg' : 'text-base'
      }`}
      onToggle={handleToggle}
    >
      {/* Dropdown trigger button */}
      <summary className={`cursor-pointer w-full text-primary list-none focus:outline-none focus:ring-0 focus:border-0`}>
        <span className={`flex items-center w-fit`}>
          <IoReorderFourOutline className={`${layoutSize === 'small' ? 'text-base' : layoutSize === 'large' ? 'text-xl' : 'text-lg'}`} />
        </span>
      </summary>

      {/* Dropdown options list */}
      <ul className="absolute p-1 top-11 right-0 z-40 min-w-[150px] max-w-[150px] max-h-[350px] rounded-xl bg-main md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar">
        {/* Map through options to render each layout size choice */}
        {options.map(({ value, label }) => (
          <li
            key={value}
            className={`relative flex items-center gap-1.5 cursor-pointer rounded-xl transition-colors hover:bg-hover ${layoutSize === value && 'bg-primary-faded'} ${
              layoutSize === 'small' ? 'text-sm py-1' : layoutSize === 'large py-2' ? 'text-base' : 'text-base py-2'
            }`}
            onClick={() => {
              updateLayoutSize(value);
              setIsOpen(false);
            }}
          >
            <IoReorderFourOutline className={`${layoutSize === 'small' ? 'text-base' : layoutSize === 'large' ? 'text-xl' : 'text-lg'}`} />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default LayoutDropdown;
