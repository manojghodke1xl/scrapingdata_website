import { MdDeleteForever } from 'react-icons/md';
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
  onResetColumns
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      {deleteBtn && selectionState.selectedItems.length > 0 && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isDeleteModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex items-center justify-between gap-1"
        >
          <MdDeleteForever className="text-base" />
          <span className="text-sm">Delete</span>
        </button>
      )}
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
      {modifySite && selectionState.selectedItems.length > 0 && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isSitesModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex gap-1 text-sm"
        >
          Modify Site
        </button>
      )}
      {duplicateBtn && selectionState.selectedItems.length > 0 && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isDuplicateModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex gap-1 text-sm"
        >
          Duplicate Popups
        </button>
      )}
      {exportBtn && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isExportModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap flex gap-1 items-center"
        >
          <CiImport strokeWidth="1.2" className="text-base" />
          <span className="text-sm">Export</span>
        </button>
      )}
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
      {isFilterActive && (
        <button className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary p-2 whitespace-nowrap sm:gap-2 text-sm" onClick={handleClearFilter}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default TableFilterActions;
