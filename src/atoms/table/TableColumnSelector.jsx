import { useState, useRef, useEffect } from 'react';
import Checkbox from '../formFields/Checkbox';
import { FiColumns } from 'react-icons/fi';
import SearchComponent from '../common/SearchComponent';
import { MdDragIndicator } from 'react-icons/md';

const TableColumnSelector = ({ allColumns, hiddenColumns, onHiddenColumnsChange, handleDragStart, handleDragOver, handleDrop, handleDragEnd, isDragging }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredColumns = allColumns.filter((column) => column.label.toLowerCase().includes(searchQuery.toLowerCase()));

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
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-inherit border border-primary rounded-xl shadow  focus:outline-none focus:ring-0">
        <span className="flex flex-row items-center gap-x-2">
          <FiColumns className="text-xl text-primary" /> Select Columns
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 z-50 border border-primary rounded-xl shadow bg-main w-fit right-0 top-full">
          <div className="p-2">
            <SearchComponent value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {filteredColumns.map((col) => (
                <div
                  key={col.key}
                  className={`flex items-center justify-start gap-x-2 py-1 `}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, col.key)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, col.key)}
                  onDragEnd={handleDragEnd}
                  disabled={col.pinned === 'left' || col.pinned === 'right'}
                >
                  <MdDragIndicator className={`text-primary text-xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} />
                  <Checkbox
                    id="select-all"
                    checked={!hiddenColumns.includes(col.key)}
                    onChange={() => handleCheckboxChange(col.key)}
                    disabled={col.pinned === 'left' || col.pinned === 'right'}
                  />
                  <label className="flex items-center text-primary">{col.label}</label>
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
