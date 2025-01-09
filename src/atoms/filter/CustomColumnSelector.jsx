import { useState } from 'react';
import SearchComponent from '../common/SearchComponent';

const CustomColumnSelector = ({ customColumns, setSelectedColumns }) => {
  const [columns, setColumns] = useState(
    customColumns.length > 0
      ? Object.keys(customColumns[0]).map((key, index) => ({
          id: index + 1,
          label: key,
          selected: false
        }))
      : []
  );

  const [draggingIndex, setDraggingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSelection = (index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].selected = !updatedColumns[index].selected;
    setColumns(updatedColumns);
    setSelectedColumns(updatedColumns.filter((column) => column.selected).map((column) => ({ label: column.label, key: column.label })));
  };

  const toggleSelectAll = () => {
    const allSelected = columns.every((column) => column.selected);
    const updatedColumns = columns.map((column) => ({ ...column, selected: !allSelected }));
    setColumns(updatedColumns);
  };

  const handleDragStart = (index) => setDraggingIndex(index);

  const handleDragOver = (index) => {
    if (draggingIndex === null || draggingIndex === index) return;
    const updatedColumns = [...columns];
    const [draggedItem] = updatedColumns.splice(draggingIndex, 1);
    updatedColumns.splice(index, 0, draggedItem);
    setDraggingIndex(index);
    setColumns(updatedColumns);
  };

  const handleDragEnd = () => setDraggingIndex(null);

  const filteredColumns = columns.filter((column) => column.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const allFilteredSelected = filteredColumns.length > 0 && filteredColumns.every((column) => column.selected);

  return (
    <div className="p-2 w-full border border-primary rounded-xl overflow-y-scroll custom-scrollbar">
      {/* Custom Column List */}
      <div className="h-64">
        {/* Search Component */}
        <div className="flex items-center gap-2 border-b border-primary">
          <SearchComponent onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search" />
        </div>
        {/* Select All Checkbox */}
        <label className="flex items-center text-primary px-3 py-2 border-b border-primary">
          <input type="checkbox" checked={allFilteredSelected} onChange={toggleSelectAll} className="mr-2 h-4 w-4 border border-primary" />
          Select All
        </label>
        {filteredColumns.length > 0 ? (
          filteredColumns.map((column, index) => (
            <div
              key={column.id}
              className={`flex items-center justify-between px-3 py-2 ${draggingIndex === index ? 'bg-gray-100' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={() => handleDragOver(index)}
              onDragEnd={handleDragEnd}
            >
              <label className="flex items-center text-primary">
                <input type="checkbox" checked={column.selected} onChange={() => toggleSelection(index)} className="mr-3 h-4 w-4 border border-primary" />
                {column.label}
              </label>
              <span className="cursor-move text-secondary">☰</span>
            </div>
          ))
        ) : (
          <p className="text-center text-secondary">No columns found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomColumnSelector;
