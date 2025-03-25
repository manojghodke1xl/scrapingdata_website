/**
 * TableFilterActions Component
 *
 * Provides action buttons and filters for table operations including:
 * - Table expansion/collapse
 * - Bulk deletion
 * - Status modification
 * - Site modification
 * - Export functionality
 * - Column management
 *
 * @param {Object} props Component props
 * @param {boolean} props.deleteBtn Flag to show delete button
 * @param {boolean} props.exportBtn Flag to show export button
 * @param {boolean} props.modifySite Flag to show site modification button
 * @param {boolean} props.modifyStatus Flag to show status modification options
 * @param {boolean} props.isFilterActive Flag indicating if any filters are active
 * @param {Object} props.selectionState State object containing selected items
 * @param {Function} props.handleStatusChange Handler for status changes
 * @param {Function} props.handleClearFilter Handler to clear all filters
 * @param {boolean} props.isExpanded Flag indicating if table is in expanded view
 * @param {Function} props.onToggleExpand Handler for toggling expanded view
 */

import { MdDeleteForever } from 'react-icons/md';
import { IoExpandOutline, IoContractOutline } from 'react-icons/io5';
import StatusFilter from '../filter/StatusFilter';
import { CiImport } from 'react-icons/ci';
import TableColumnSelector from './TableColumnSelector';

const TableFilterActions = ({
  deleteBtn,
  exportBtn,
  modifySite,
  modifyStatus,
  duplicateBtn,
  isFilterActive,
  selectionState,
  setSelectionState,
  setModalState,
  statuses,
  handleStatusChange,
  handleClearFilter,
  headers,
  hiddenColumns,
  setHiddenColumns,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  isDragging,
  pinnedColumns,
  onSaveColumns,
  onResetColumns,
  isExpanded,
  onToggleExpand
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      {/* Expand/Collapse Toggle Button */}
      <button
        onClick={onToggleExpand}
        className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex items-center justify-between gap-1"
        title={isExpanded ? 'Collapse table' : 'Expand table'}
      >
        {isExpanded ? <IoContractOutline className="text-base" /> : <IoExpandOutline className="text-base" />}
      </button>

      {/* Bulk Delete Button */}
      {deleteBtn && selectionState.selectedItems.length > 0 && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isDeleteModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex items-center justify-between gap-1"
        >
          <MdDeleteForever className="text-base" />
          <span className="text-sm">Delete</span>
        </button>
      )}

      {/* Status Modification Controls */}
      {modifyStatus && selectionState.selectedItems.length > 0 && (
        <>
          <StatusFilter statuses={statuses} setStatusFilter={(e) => setSelectionState((prev) => ({ ...prev, status: e }))} />
          {selectionState.status !== '' && selectionState.selectedItems.length > 0 && (
            <button
              onClick={() => handleStatusChange(selectionState.status)}
              className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex gap-1"
            >
              <span className="text-sm">Apply Status</span>
            </button>
          )}
        </>
      )}

      {/* Site Modification Button */}
      {modifySite && selectionState.selectedItems.length > 0 && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isSitesModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex gap-1 text-sm"
        >
          Modify Site
        </button>
      )}

      {/* Duplicate Button */}
      {duplicateBtn && selectionState.selectedItems.length > 0 && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isDuplicateModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex gap-1 text-sm"
        >
          Duplicate Popups
        </button>
      )}

      {/* Export Button */}
      {exportBtn && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isExportModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex gap-1 items-center"
        >
          <CiImport strokeWidth="1.2" className="text-base" />
          <span className="text-sm">Export</span>
        </button>
      )}

      {/* Column Management Component */}
      <TableColumnSelector
        allColumns={headers}
        hiddenColumns={hiddenColumns}
        onHiddenColumnsChange={setHiddenColumns}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleDragEnd={handleDragEnd}
        isDragging={isDragging}
        pinnedColumns={pinnedColumns}
        onSave={onSaveColumns}
        onReset={onResetColumns}
      />

      {/* Clear Filters Button */}
      {isFilterActive && (
        <button className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap sm:gap-2 text-sm" onClick={handleClearFilter}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default TableFilterActions;
