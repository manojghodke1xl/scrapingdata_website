import { RiDeleteBinLine } from 'react-icons/ri';
import StatusFilter from '../filter/StatusFilter';
import { CiExport } from 'react-icons/ci';

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
  handleClearFilter
}) => {
  return (
    <>
      {deleteBtn && selectionState.selectedItems.length > 0 && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isDeleteModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
        >
          <RiDeleteBinLine size={20} />
          <span className="hidden sm:block">Delete</span>
        </button>
      )}
      {modifyStatus && selectionState.selectedItems.length > 0 && (
        <>
          <StatusFilter statuses={statuses} setStatusFilter={(e) => setSelectionState((prev) => ({ ...prev, status: e }))} />
          {selectionState.status !== '' && selectionState.selectedItems.length > 0 && (
            <button
              onClick={() => handleStatusChange(selectionState.status)}
              className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
            >
              <span className="hidden sm:block">Apply Status</span>
            </button>
          )}
        </>
      )}
      {modifySite && selectionState.selectedItems.length > 0 && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isSitesModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
        >
          Sites
        </button>
      )}
      {duplicateBtn && selectionState.selectedItems.length > 0 && (
        <button
          onClick={() => setModalState((prev) => ({ ...prev, isDuplicateModelOpen: true }))}
          className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
        >
          Duplicate Popups
        </button>
      )}
      {exportBtn && (
        <>
          <button
            onClick={() => {
              // setExportDropdownOpen((prev) => !prev);
              setModalState((prev) => ({ ...prev, isExportModelOpen: true }));
            }}
            className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
          >
            <CiExport size={20} strokeWidth="1.2" fill="none" />
            <span className="hidden sm:block">Export</span>
          </button>
        </>
      )}
      {isFilterActive && (
        <button
          className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
          onClick={handleClearFilter}
        >
          Clear All
        </button>
      )}
    </>
  );
};

export default TableFilterActions;
