import { getTableActionIcons } from '../../constants/FileIcon';
import { useEffect, useRef } from 'react';

/**
 * TableRowActions component - renders a dropdown menu with actions for a table row
 * @param {Object} row - the table row data
 * @param {Array} actionItems - an array of action items to render in the dropdown menu
 * @param {Function} onToggle - a function to call when the dropdown menu is toggled
 * @param {Boolean} isOpen - a boolean indicating whether the dropdown menu is open
 * @param {Function} setSelectionState - a function to update the selection state
 * @param {Function} setModalState - a function to update the modal state
 */
const TableRowActions = ({ row, actionItems, onToggle, isOpen, setSelectionState, setModalState }) => {
  const ref = useRef(null);

  useEffect(() => {
    /**
     * Handle clicks outside of the dropdown menu
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onToggle();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onToggle]);

  // Filter out certificate actions if row.certificate is false
  const filteredActionItems = actionItems.filter((item) => {
    if (item.label.includes('Certificates')) return row.certificate;
    return true;
  });

  return (
    isOpen && (
      <ul ref={ref} className={`absolute right-10 z-40 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:w-48 md:w-56 lg:w-fit whitespace-nowrap`}>
        {filteredActionItems.map((item, index) => (
          <li key={index}>
            <button
              className={`w-full flex gap-2 items-center px-4 py-2 text-sm hover:bg-hover focus:outline-none`}
              onClick={() => {
                if (item.deleteAction) {
                  setSelectionState((prev) => ({ ...prev, deleteId: row.id }));
                  setModalState((prev) => ({ ...prev, isDeleteModelOpen: true }));
                } else item.handler(row);
              }}
            >
              <span className="text-lg">{getTableActionIcons(item.icon)}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

export default TableRowActions;
