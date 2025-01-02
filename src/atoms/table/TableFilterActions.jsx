import { RiDeleteBinLine } from 'react-icons/ri';
import StatusFilter from '../filter/StatusFilter';
import DropDown from '../formFields/DropDown';
import { CiExport } from 'react-icons/ci';

const TableFilterActions = ({
  deleteBtn,
  exportBtn,
  modifySite,
  modifyStatus,
  duplicateBtn,
  selectionState,
  setSelectionState,
  setModalState,
  statuses,
  handleStatusChange,
  setExportDropdownOpen,
  exportDropdownOpen,
  exportData,
  selectedCategory,
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
            onClick={() => setExportDropdownOpen((prev) => !prev)}
            className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
          >
            <CiExport size={20} strokeWidth="1.2" fill="none" />
            <span className="hidden sm:block">Export</span>
          </button>

          {exportDropdownOpen && (
            <DropDown
              mt="0"
              width="w-fit"
              name={'Export'}
              SummaryChild={<h5 className="p-0 m-0 text-primary">Select Export</h5>}
              dropdownList={[
                { id: 0, name: 'visible', showName: 'Visible Rows' },
                {
                  id: 1,
                  name: 'selected',
                  showName: 'Selected Rows',
                  disabled: selectionState.selectedItems.length === 0 // Disable if no rows are selected
                },
                { id: 2, name: 'all', showName: 'All Rows' }
              ]}
              commonFunction={(e) => exportData(e.name)}
            />
          )}
        </>
      )}
      {selectedCategory && (
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
