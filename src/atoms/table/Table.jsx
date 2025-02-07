import { useEffect, useMemo, useState } from 'react';
import Pagination from './Pagination';
import { showNotification } from '../../utils/showNotification';
import useSetTimeout from '../../hooks/useDebounce';
import DeleteModal from '../modal/DeleteModal';
import SiteModal from '../modal/SiteModal';
import useGlobalContext from '../../hooks/useGlobalContext';
import { handleDeleteConfirm, handleDuplicateConfirm, handleSitesUpdate, handleStatusUpdate } from '../../helpers/tableApiHandler';
import TableView from './TableView';
import TableFilter from './TableFilter';
import TableFilterActions from './TableFilterActions';
import ExportDataModal from '../modal/ExportDataModal';

const TableComponent = ({
  selectable,
  siteModule,
  tableData,
  apiUrl,
  tableCountLabel,
  headers,
  rows,
  actions,
  pagination,
  edit,
  editPath,
  view,
  viewPath,
  apps,
  appsPath,
  copy,
  copyPath,
  managePackage,
  managePackagePath,
  sendForApproval,
  approvalApi,
  deleteAction,
  search,
  filter,
  exportBtn = true,
  deleteBtn,
  deleteLabel,
  deleteMessage,
  deleteApi,
  duplicateBtn,
  duplicateApi,
  filterCategory,
  statuses,
  events,
  searchCategory = [],
  modifyStatus,
  adminStatus,
  modifyStatusApi,
  modifySite,
  modifySiteApi,
  eventId: packageEvent
}) => {
  const {
    auth: { allSites },
    setLoading,
    isLoading
  } = useGlobalContext();

  const [modalState, setModalState] = useState({
    isDuplicateModelOpen: false,
    isDeleteModelOpen: false,
    isSitesModelOpen: false,
    isExportModelOpen: false
  });
  const [tableState, setTableState] = useState({
    currentPage: 1,
    itemsPerPage: 25,
    totalCount: 0
  });
  const [selectionState, setSelectionState] = useState({
    selectedItems: [],
    isAllSelected: false,
    selectedSites: [],
    siteToggle: false,
    status: '',
    deleteId: '',
    selectedCategory: null
  });
  const [filterState, setFilterState] = useState({
    searchTerm: '',
    searchKey: '',
    statusFilter: '',
    siteId: '',
    eventId: ''
  });
  const [showFilter, setShowFilter] = useState({
    status: false,
    sites: false,
    event: false
  });
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  // Add new state for drag and drop
  const [updatedHeaders, setUpdatedHeaders] = useState(headers);
  const [isDragging, setIsDragging] = useState(false);

  // Add drag and drop handlers
  const handleDragStart = (e, columnKey) => {
    e.dataTransfer.setData('columnKey', columnKey);
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropColumnKey) => {
    setIsDragging(false);
    const dragColumnKey = e.dataTransfer.getData('columnKey');

    const dragIndex = updatedHeaders.findIndex((col) => col.key === dragColumnKey);
    const dropIndex = updatedHeaders.findIndex((col) => col.key === dropColumnKey);

    if (dragIndex !== -1 && dropIndex !== -1) {
      const newHeaders = [...updatedHeaders];
      const [draggedColumn] = newHeaders.splice(dragIndex, 1);
      newHeaders.splice(dropIndex, 0, draggedColumn);
      setUpdatedHeaders(newHeaders);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Add sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  // Add sorting handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    // Sort the data
    const sortedData = [...rows].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    tableData({ ...data, rows: sortedData });
  };

  const isFilterActive = useMemo(() => {
    return (
      filterState.searchTerm !== '' ||
      filterState.searchKey !== '' ||
      filterState.statusFilter !== '' ||
      filterState.siteId !== '' ||
      filterState.eventId !== '' ||
      showFilter.status ||
      showFilter.sites ||
      showFilter.event
    );
  }, [filterState, showFilter]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(tableState.totalCount / tableState.itemsPerPage)), [tableState.totalCount, tableState.itemsPerPage]);

  const [err, data, setRefresh] = useSetTimeout(
    apiUrl,
    tableState.currentPage - 1,
    tableState.itemsPerPage,
    filterState.searchTerm,
    filterState.searchKey,
    filterState.statusFilter,
    filterState.siteId,
    filterState.eventId
  );

  useEffect(() => {
    if (packageEvent) {
      setShowFilter((prev) => ({ ...prev, event: true }));
      setFilterState((prev) => ({ ...prev, eventId: packageEvent }));
    }
  }, [packageEvent]);

  useEffect(() => {
    if (data) {
      tableData(data);
      setTableState((prev) => ({ ...prev, totalCount: data.count }));
    } else if (err) showNotification('warn', err.message);
  }, [data, err, tableData]);

  const handleMasterCheckboxChange = () => {
    const nonSuperAdminIds = rows.filter((row) => !row.isSuperAdmin).map((row) => row.id);
    const newChecked = !selectionState.isAllSelected;
    setSelectionState((prev) => ({
      ...prev,
      isAllSelected: newChecked,
      selectedItems: newChecked ? nonSuperAdminIds : []
    }));
  };

  const handleRowCheckboxChange = (id) => {
    setSelectionState((prev) => {
      const updatedSelected = prev.selectedItems.includes(id) ? prev.selectedItems.filter((itemId) => itemId !== id) : [...prev.selectedItems, id];
      return {
        ...prev,
        selectedItems: updatedSelected,
        isAllSelected: updatedSelected.length === rows.length
      };
    });
  };

  const handleDelete = () => handleDeleteConfirm(selectionState.selectedItems, deleteApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState);

  const handleRowDelete = () => {
    handleDeleteConfirm([selectionState.deleteId], deleteApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState);
  };

  const handleStatusChange = (statusUpdate) =>
    handleStatusUpdate(
      selectionState.selectedItems,
      statusUpdate,
      modifyStatusApi,
      setLoading,
      setSelectionState,
      setFilterState,
      setRefresh,
      adminStatus,
      setModalState,
      setTableState
    );
  const handleSitesChange = (action) =>
    handleSitesUpdate(selectionState.selectedItems, selectionState.selectedSites, action, modifySiteApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState);
  const handleDuplicate = () =>
    handleDuplicateConfirm(selectionState.selectedItems, selectionState.selectedSites, duplicateApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState);

  const handleCategorySelect = (category) => {
    if (category.name === 'Status') setShowFilter((prev) => ({ ...prev, status: true }));
    if (category.name === 'Sites') setShowFilter((prev) => ({ ...prev, sites: true }));
    if (category.name === 'Event') setShowFilter((prev) => ({ ...prev, event: true }));
    if (category.name === 'Search') {
      setFilterState((prev) => ({ ...prev, searchTerm: '', searchKey: '' }));
      setSelectionState((prev) => ({ ...prev, selectedCategory: { ...category, type: 'search' } }));
    }
  };

  const handleClearFilter = () => {
    setModalState({ isDeleteModelOpen: false, isSitesModelOpen: false, isDuplicateModelOpen: false });
    setSelectionState({ selectedItems: [], isAllSelected: false, selectedSites: [], siteToggle: false, status: '', deleteId: '', selectedCategory: null });
    setFilterState({ searchTerm: '', searchKey: '', siteId: '', eventId: '', statusFilter: '' });
    setShowFilter({ status: false, sites: false, event: false });
  };

  const modulesArray = ['participant', 'payment', 'products', 'booking-payments', 'order-payments', 'email-templates', 'sms-templates', 'whats-app-templates', 'after-sales'];

  const availableSites = modulesArray.includes(siteModule)
    ? allSites
    : allSites.filter((site) => site.modules?.some((module) => module[siteModule] === true)).map((site) => ({ name: site.name, _id: site._id }));

  return (
    <div className="overflow-hidden">
      <div className="my-4 rounded-xl border border-primary overflow-hidden">
        <div className="w-full flex flex-row sm:flex-row flex-wrap gap-y-4 justify-between items-center px-3 sm:px-6 ptpb-4 border-b border-primary">
          <TableFilter
            search={search}
            filterState={filterState}
            setFilterState={setFilterState}
            searchCategory={searchCategory}
            selectedCategory={selectionState.selectedCategory}
            setSelectedCategory={(category) => setSelectionState((prev) => ({ ...prev, selectedCategory: category }))}
            filter={filter}
            filterCategory={filterCategory}
            handleCategorySelect={handleCategorySelect}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            statuses={statuses}
            allSites={availableSites}
            events={events}
          />
          <div
            className={`w-full xl:w-fit flex ${
              (deleteBtn + search + filter + exportBtn + modifyStatus, modifySite + duplicateBtn >= 3 ? 'flex-wrap' : 'flex-nowrap')
            } xl:justify-end justify-start gap-2 items-center`}
          >
            <TableFilterActions
              deleteBtn={deleteBtn}
              exportBtn={exportBtn}
              modifySite={modifySite}
              modifyStatus={modifyStatus}
              duplicateBtn={duplicateBtn}
              isFilterActive={isFilterActive}
              selectionState={selectionState}
              setSelectionState={setSelectionState}
              setModalState={setModalState}
              statuses={statuses}
              handleStatusChange={handleStatusChange}
              setExportDropdownOpen={setExportDropdownOpen}
              exportDropdownOpen={exportDropdownOpen}
              handleClearFilter={handleClearFilter}
            />
          </div>
        </div>
        {tableCountLabel && selectionState.selectedItems.length > 0 && (
          <div className="w-full ptpb-4 text-center bg-grey border-b border-primary ">
            <p className="text-secondary">
              {selectionState.selectedItems.length === tableState.totalCount && 'All'} {selectionState.selectedItems.length} record from this page is selected
              <a href="#" className="text-brand pl-2">
                Select all {tableState.totalCount} records from this table
              </a>
            </p>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar">
          <TableView
            selectable={selectable}
            selectionState={selectionState}
            setSelectionState={setSelectionState}
            handleMasterCheckboxChange={handleMasterCheckboxChange}
            handleRowCheckboxChange={handleRowCheckboxChange}
            headers={updatedHeaders}
            rows={rows}
            actions={actions}
            isLoading={isLoading}
            edit={edit}
            editPath={editPath}
            view={view}
            viewPath={viewPath}
            apps={apps}
            appsPath={appsPath}
            copy={copy}
            copyPath={copyPath}
            deleteAction={deleteAction}
            tableState={tableState}
            modalState={modalState}
            setModalState={setModalState}
            deleteLabel={deleteLabel}
            deleteMessage={deleteMessage}
            managePackage={managePackage}
            managePackagePath={managePackagePath}
            sendForApproval={sendForApproval}
            approvalApi={approvalApi}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragEnd={handleDragEnd}
            isDragging={isDragging}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
        <div className="w-full mt-2">
          <div className="w-full py-3">
            {pagination && (
              <Pagination
                currentPage={tableState.currentPage}
                totalPages={totalPages}
                itemsPerPage={tableState.itemsPerPage}
                setItemsPerPage={setTableState}
                handlePageChange={(pageNumber) => {
                  if (pageNumber > 0 && pageNumber <= totalPages) setTableState((prev) => ({ ...prev, currentPage: pageNumber }));
                }}
                totalRecords={tableState.totalCount}
              />
            )}
          </div>
        </div>
        <SiteModal
          isOpen={modalState.isSitesModelOpen}
          setSitesModelOpen={setModalState}
          selectedSites={selectionState.selectedSites}
          setSelectedSites={setSelectionState}
          availableSites={availableSites}
          onConfirm={handleSitesChange}
          siteToggle={selectionState.siteToggle}
        />
        <DeleteModal
          isDeleteModalOpen={modalState.isDeleteModelOpen}
          onConfirm={selectionState.deleteId ? handleRowDelete : handleDelete}
          setDeleteModalOpen={setModalState}
          label={deleteLabel}
          message={deleteMessage}
        />
        <SiteModal
          label={'Duplicate Popups'}
          isOpen={modalState.isDuplicateModelOpen}
          duplicateBtn={duplicateBtn}
          setSitesModelOpen={setModalState}
          selectedSites={selectionState.selectedSites}
          availableSites={availableSites}
          setSelectedSites={setSelectionState}
          onConfirm={handleDuplicate}
        />
        <ExportDataModal
          isExportModalOpen={modalState.isExportModelOpen}
          setExportModalOpen={setModalState}
          label="Export Data"
          selectedData={selectionState}
          apiUrl={apiUrl}
          rows={rows}
          headers={headers}
          customColumns={rows.map((row) => row.exportData)}
        />
      </div>
    </div>
  );
};

export default TableComponent;
