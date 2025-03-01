import { useState, useRef, useEffect } from 'react';
import Checkbox from '../formFields/Checkbox';
import { FiColumns } from 'react-icons/fi';

const TableColumnSelector = ({ allColumns, hiddenColumns, onHiddenColumnsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckboxChange = (accessor) => {
    if (hiddenColumns.includes(accessor)) onHiddenColumnsChange(hiddenColumns.filter((col) => col !== accessor));
    else onHiddenColumnsChange([...hiddenColumns, accessor]);
  };

  return (
    <div className="inline-block" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-inherit border border-primary rounded-xl shadow  focus:outline-none focus:ring-0">
        <span className="flex flex-row items-center gap-x-2">
          <FiColumns className="text-xl text-primary" /> Select Columns
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 border border-primary rounded-xl shadow bg-main w-fit">
          <div className="p-2">
            <p className="font-bold mb-2">Toggle Columns</p>
            <div className="max-h-64 overflow-y-auto">
              {allColumns.map((col) => (
                <div key={col.key} className="flex items-center gap-x-2 mb-1">
                  <Checkbox
                    id="select-all"
                    checked={!hiddenColumns.includes(col.key)}
                    onChange={() => handleCheckboxChange(col.key)}
                    disabled={col.pinned === 'left' || col.pinned === 'right'}
                  />
                  <label>{col.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableColumnSelector;
