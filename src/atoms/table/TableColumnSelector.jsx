import { useEffect, useRef, useState } from 'react';
import Checkbox from '../formFields/Checkbox';
import { FiColumns } from 'react-icons/fi';
import SearchComponent from '../common/SearchComponent';
import { MdDragIndicator } from 'react-icons/md';

const TableColumnSelector = ({
  allColumns,
  hiddenColumns,
  onHiddenColumnsChange,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  isDragging,
  pinnedColumns,
  onReset,
  onSave
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Remove duplicate column IDs using Set
  const uniqueHiddenColumns = [...new Set(hiddenColumns.map(String))];

  const filteredColumns = allColumns.filter((column) => column.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const selectableColumns = allColumns.filter((col) => !(col.pinned === 'left' || col.pinned === 'right' || col.key === 'status'));
  const isAllSelected = selectableColumns.every((col) => !uniqueHiddenColumns.includes(String(col.id)));

  const handleSelectAll = () => {
    if (isAllSelected) {
      // Hide all selectable columns (ensure unique IDs)
      const newHiddenColumns = [...new Set([...uniqueHiddenColumns, ...selectableColumns.map((col) => String(col.id))])];
      onHiddenColumnsChange(newHiddenColumns);
    } else {
      // Show all columns
      onHiddenColumnsChange(uniqueHiddenColumns.filter((colId) => !selectableColumns.map((col) => String(col.id)).includes(colId)));
    }
  };

  const handleCheckboxChange = (e, accessor) => {
    e.stopPropagation(); // Stop event propagation
    const stringAccessor = String(accessor);
    if (uniqueHiddenColumns.includes(stringAccessor)) onHiddenColumnsChange(uniqueHiddenColumns.filter((col) => col !== stringAccessor));
    else onHiddenColumnsChange([...uniqueHiddenColumns, stringAccessor]);
  };

  const isPinnedLeft = (colId) => pinnedColumns.left.includes(String(colId));
  const isPinnedRight = (colId) => pinnedColumns.right.includes(String(colId)) || colId === 'status';

  const handleSave = (e) => {
    e.stopPropagation();
    onSave?.();
    setIsOpen(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    onReset?.();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef}>
      {/* Change from button to div */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center gap-1 p-2 bg-inherit border border-primary rounded-xl shadow focus:outline-none focus:ring-0 font-normal"
      >
        <FiColumns className="text-base text-primary" />
        <span className="text-sm">Select Columns</span>
      </button>
      {isOpen && (
        <div className="absolute  transform -translate-x-40 translate-y-4 z-50 border border-primary rounded-xl shadow-lg bg-main w-[280px]" onClick={(e) => e.stopPropagation()}>
          {/* Add stopPropagation */}
          <div className="p-1">
            <SearchComponent value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="border-b border-primary">
              <div className="flex items-center gap-x-1 p-1 hover:bg-hover rounded-xl">
                <Checkbox id="select-all" checked={isAllSelected} onChange={handleSelectAll} />
                <label className="text-primary font-medium text-sm cursor-pointer select-none">Select All</label>
              </div>
            </div>
            <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
              {filteredColumns.map((col) => (
                <div
                  key={col.id}
                  className={`flex items-center justify-start gap-x-1 py-1 hover:bg-hover rounded-lg ${isPinnedLeft(col.id) || isPinnedRight(col.id) ? 'opacity-50' : ''}`}
                  draggable={!isPinnedLeft(col.id) && !isPinnedRight(col.id)}
                  onDragStart={(e) => handleDragStart(e, col.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, col.id)}
                  onDragEnd={handleDragEnd}
                >
                  <MdDragIndicator className={`text-primary text-base ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} />
                  <Checkbox
                    id={`col-${col.id}`}
                    checked={!hiddenColumns.includes(String(col.id))}
                    onChange={(e) => handleCheckboxChange(e, col.id)}
                    disabled={col.pinned === 'left' || col.pinned === 'right' || col.key === 'status'}
                  />
                  <label className="flex items-center text-primary text-sm font-normal cursor-pointer select-none whitespace-nowrap">{col.label}</label>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-x-2 pt-1 border-t border-primary">
              <button onClick={handleReset} className="px-1 py-1 text-sm bg-red text-white rounded-lg hover:bg-red-600 transition-colors">
                Reset
              </button>
              <button onClick={handleSave} className="px-1 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableColumnSelector;
