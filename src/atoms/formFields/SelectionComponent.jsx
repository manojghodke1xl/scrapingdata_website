import { useEffect, useRef, useState } from 'react';
import SearchComponent from '../common/SearchComponent';
import { IoIosArrowDown, IoMdAdd, IoMdCheckmark } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri';

function SelectionComponent({
  errorCondition,
  label,
  name,
  SummaryChild,
  dropdownList = [],
  commonFunction,
  search,
  handleSearch,
  selected,
  add = false,
  deleteItem = false,
  edit = false,
  width = 'full',
  required,
  setCreate,
  setEdit,
  setDelete
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [newSegmentName, setNewSegmentName] = useState('');

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dropdownRef.current.removeAttribute('open');
        setIsCreating(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleCreateNewSegment = (e) => {
    if (e.key === 'Enter' && newSegmentName.trim()) {
      console.log('Creating new segment:', newSegmentName);
      dropdownList.push({ name: newSegmentName });
      setCreate(newSegmentName);

      setNewSegmentName('');
      setIsCreating(false);
    }
  };

  const handleEditSegment = (e, index) => {
    if (e.key === 'Enter' && editedName.trim()) {
      dropdownList[index].name = editedName;

      const editData = {
        name: editedName,
        _id: dropdownList[index]._id
      };

      setEdit(editData);
      setEditingIndex(null);
      setEditedName('');
    }
  };
  const handleDeleteItem = (index) => {
    console.log('Deleting item at index:', dropdownList[index]);
    setDelete(dropdownList[index]._id);

    // dropdownList.splice(index, 1);
    // setIsNewSegment([...dropdownList]);
  };

  return (
    <div className={`${width || 'w-[200px]'} `}>
      {label && (
        <label htmlFor="project-status" className="text-primary font-semibold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <details
        ref={dropdownRef}
        name={name}
        className={`relative w-${width} cursor-default rounded-xl bg-white pl-3 pr-10 text-left text-primary shadow-sm border border-primary focus:outline-none focus:ring-0 sm:text-lg sm:leading-6`}
      >
        <summary className="cursor-pointer py-2 pr-8 text-left text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center">
            <span className="block font-medium whitespace-nowrap text-[16px]">{SummaryChild}</span>
          </span>
          <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <IoIosArrowDown />
          </span>
        </summary>
        <ul className="absolute end-0 top-11 z-40 mt-1 max-h-48 w-full rounded-md bg-white text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar">
          {search && <SearchComponent onChange={handleSearch} />}
          <div className="w-full relative">
            {dropdownList?.map((item, index) => (
              <li
                key={index}
                className={`group relative cursor-default select-none mb-1 py-2 pl-3 pr-9 text-primary hover:bg-gray-50 ${item.name === selected ? 'bg-blue-100' : ''}`}
                onClick={(e) => {
                  item.seperateFunction ? item.seperateFunction() : commonFunction(item);
                  if (!edit) {
                    e.currentTarget.closest('details').removeAttribute('open');
                  }
                }}
                onDoubleClick={() => {
                  if (edit) {
                    setEditingIndex(index);
                    setEditedName(item.name);
                  }
                }}
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={(e) => handleEditSegment(e, index)}
                    className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Edit name"
                  />
                ) : (
                  <div className="flex items-center">
                    <span className={`ml-3 flex gap-3 items-center whitespace-nowrap font-normal ${item.name === selected ? 'font-semibold bg-fadedblue' : ''}`}>
                      {item.color && <span className="h-[12px] w-[12px] rounded-[4px]" style={{ backgroundColor: `${item.color}` }}></span>}
                      <span>{item.name}</span>
                      {item.employeeId && <span className="px-2 py-1 bg-[#F5F8FF] text-primary font-semibold text-xs rounded-lg">{item.employeeId}</span>}
                      {item.team && <span className="px-2 py-1 bg-[#F5F8FF] text-primary font-semibold text-xs rounded-lg">{item.team.name}</span>}
                    </span>
                  </div>
                )}
                {item.name === selected ? (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                    <IoMdCheckmark className="text-primary text-xl" />
                  </span>
                ) : (
                  deleteItem && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteItem(index);
                      }}
                      className="absolute top-2 right-3 hover:bg-gray-200 rounded-full p-2"
                    >
                      <RiDeleteBinLine className="text-2xl" />
                    </button>
                  )
                )}
              </li>
            ))}
            {add && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsCreating((prev) => !prev);
                }}
                className="w-full py-2 z-10 px-2 pl-4 md:px-4 border-t border-primary mt-2 flex gap-2 items-center hover:bg-gray-50"
              >
                <IoMdAdd size={22} />
                <span className="text-sm text-[#919191]">{`Create new ${label}`}</span>
              </button>
            )}
            {isCreating && (
              <li className="p-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={newSegmentName}
                  onChange={(e) => setNewSegmentName(e.target.value)}
                  onKeyDown={handleCreateNewSegment}
                  className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter segment name"
                />
              </li>
            )}
          </div>
        </ul>
      </details>
      {errorCondition && <p className="text-red-500 text-sm mt-1 font-normal">{errorCondition}</p>}
    </div>
  );
}

export default SelectionComponent;
