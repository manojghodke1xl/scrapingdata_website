import { useCallback, useEffect, useMemo, useState } from 'react';
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
import Checkbox from '../formFields/Checkbox';
import { createAndUpdateTableColumnApi, getTableColumnApi } from '../../apis/table-apis';

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
  editPath,
  viewPath,
  appsPath,
  copyPath,
  managePackage,
  managePackagePath,
  sendForApproval,
  sendCertificate,
  sendCertificateUnique,
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
  eventId: packageEvent,
  fetchRefresh,
  shouldFetchData = true,
  isWhatsAppTemplate = false,
  currentPage,
  itemsPerPage,
  totalCount,
  onPageChange,
  onItemsPerPageChange
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
    currentPage: currentPage || 1,
    itemsPerPage: itemsPerPage || 25,
    totalCount: totalCount || 0
  });
  const [selectionState, setSelectionState] = useState({
    selectedItems: [],
    isAllSelected: false,
    selectedSites: [],
    siteToggle: false,
    status: '',
    deleteId: '',
    deleteBoolean: false,
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
  const [columnPreferences, setColumnPreferences] = useState({
    pinnedColumns: {
      left: [],
      right: []
    }
  });

  // State for drag and drop
  const [updatedHeaders, setUpdatedHeaders] = useState(headers);
  const [isDragging, setIsDragging] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Compute pinned columns
  const pinnedColumns = useMemo(() => {
    // Default to empty arrays if no preferences exist
    const leftPinned = columnPreferences?.pinnedColumns?.left || [];
    const rightPinned = columnPreferences?.pinnedColumns?.right || [];

    // If we have no saved preferences, use the default pinned columns from headers
    if (leftPinned.length === 0 && rightPinned.length === 0) {
      return {
        left: updatedHeaders.filter((c) => c.pinned === 'left').map((c) => String(c.id)),
        right: updatedHeaders.filter((c) => c.pinned === 'right').map((c) => String(c.id))
      };
    }

    return {
      left: leftPinned,
      right: rightPinned
    };
  }, [columnPreferences?.pinnedColumns, updatedHeaders]);

  // Add state to track original header order
  const [originalHeaders] = useState([...headers]);

  const saveColumnConfig = useCallback(
    async (newPreferences) => {
      const payload = {
        tableName: siteModule,
        columns: hiddenColumns.map(String),
        order: updatedHeaders.map((col) => String(col.id)),
        pinnedColumns: newPreferences.pinnedColumns
      };

      try {
        const { status } = await createAndUpdateTableColumnApi(payload);
        if (status) {
          setColumnPreferences(newPreferences);
        }
      } catch (error) {
        showNotification('error', error.message);
      }
    },
    [hiddenColumns, siteModule, updatedHeaders]
  );

  // Add state to track column positions before pinning
  const [previousPositions, setPreviousPositions] = useState({});

  const handleTogglePin = useCallback(
    (columnId) => {
      const stringColumnId = String(columnId);

      setColumnPreferences((prev) => {
        const newLeftPinned = [...(prev.pinnedColumns?.left || [])];
        const isPinned = newLeftPinned.includes(stringColumnId);

        if (isPinned) {
          // Remove from pinned columns
          const index = newLeftPinned.indexOf(stringColumnId);
          newLeftPinned.splice(index, 1);

          // Restore column to its previous position
          setUpdatedHeaders((current) => {
            const newHeaders = [...current];
            const columnToMove = newHeaders.find((h) => String(h.id) === stringColumnId);

            // Get the previous position, fallback to original position if not found
            const previousPosition = previousPositions[stringColumnId] || originalHeaders.findIndex((h) => String(h.id) === stringColumnId);

            if (columnToMove) {
              // Remove from current position
              newHeaders.splice(
                newHeaders.findIndex((h) => String(h.id) === stringColumnId),
                1
              );
              // Insert at previous position
              newHeaders.splice(previousPosition, 0, columnToMove);
            }

            return newHeaders;
          });
        } else {
          // Store current position before pinning
          const currentIndex = updatedHeaders.findIndex((h) => String(h.id) === stringColumnId);
          setPreviousPositions((prev) => ({
            ...prev,
            [stringColumnId]: currentIndex
          }));

          // Add to pinned columns
          newLeftPinned.push(stringColumnId);
        }

        const newPreferences = {
          ...prev,
          pinnedColumns: {
            left: newLeftPinned,
            right: prev.pinnedColumns?.right || []
          }
        };

        // Save to backend and update state
        saveColumnConfig(newPreferences);

        return newPreferences;
      });
    },
    [originalHeaders, updatedHeaders, previousPositions, saveColumnConfig]
  );

  // Drag and drop handlers
  const handleDragStart = (e, columnId) => {
    const stringColumnId = String(columnId);
    if (pinnedColumns.left.includes(stringColumnId) || pinnedColumns.right.includes(stringColumnId)) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('columnId', stringColumnId);
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropColumnId) => {
    e.preventDefault();
    setIsDragging(false);
    const dragColumnId = e.dataTransfer.getData('columnId');

    if (!dragColumnId || dragColumnId === String(dropColumnId)) return;

    const dragIndex = updatedHeaders.findIndex((col) => String(col.id) === dragColumnId);
    const dropIndex = updatedHeaders.findIndex((col) => String(col.id) === String(dropColumnId));

    if (dragIndex === -1 || dropIndex === -1) return;

    const newHeaders = [...updatedHeaders];
    const [draggedColumn] = newHeaders.splice(dragIndex, 1);
    newHeaders.splice(dropIndex, 0, draggedColumn);
    setUpdatedHeaders(newHeaders);
  };

  const handleDragEnd = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    await saveColumnConfig();
  };

  // Sorting handler
  const handleSort = (sortBy) => {
    let sortOrder = 'asc';
    if (sortConfig.sortBy === sortBy && sortConfig.sortOrder === 'asc') sortOrder = 'desc';
    setSortConfig({ sortBy, sortOrder });

    // Sort the data
    const sortedData = [...rows].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
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

  const activePage = currentPage || tableState.currentPage;
  const activeItemsPerPage = itemsPerPage || tableState.itemsPerPage;
  const activeTotalCount = totalCount || tableState.totalCount;

  const totalPages = useMemo(() => Math.max(1, Math.ceil(activeTotalCount / activeItemsPerPage)), [activeTotalCount, activeItemsPerPage]);

  const shouldFetchFromApi = !currentPage && !itemsPerPage && shouldFetchData && apiUrl;

  const [err, data, setRefresh] = useSetTimeout(
    shouldFetchFromApi ? apiUrl : null,
    activePage - 1,
    activeItemsPerPage,
    sortConfig.sortBy,
    sortConfig.sortOrder,
    filterState.searchTerm,
    filterState.searchKey,
    filterState.statusFilter,
    filterState.siteId,
    filterState.eventId
  );

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await getTableColumnApi(siteModule);
        if (status && data?.columnPreference) {
          setColumnPreferences(data.columnPreference);

          // Set hidden columns from saved preferences
          if (data.columnPreference.columns?.length > 0) setHiddenColumns(data.columnPreference.columns);

          // If we have ordered headers from the backend, use them
          if (data.columnPreference.order?.length > 0) {
            const orderedHeaders = data.columnPreference.order.map((id) => headers.find((header) => String(header.id) === String(id))).filter(Boolean);

            // Add any headers that might not be in the saved order
            const remainingHeaders = headers.filter((header) => !data.columnPreference.order.includes(String(header.id)));

            setUpdatedHeaders([...orderedHeaders, ...remainingHeaders]);

            // Reset previous positions
            setPreviousPositions({});
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [headers, siteModule]);

  useEffect(() => {
    setRefresh((r) => !r);
  }, [fetchRefresh, setRefresh]);

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
      selectedItems: newChecked ? nonSuperAdminIds : [],
      status: ''
    }));
  };

  const handleRowCheckboxChange = (id) => {
    setSelectionState((prev) => {
      const updatedSelected = prev.selectedItems.includes(id) ? prev.selectedItems.filter((itemId) => itemId !== id) : [...prev.selectedItems, id];
      return {
        ...prev,
        selectedItems: updatedSelected,
        isAllSelected: updatedSelected.length === rows.length,
        status: ''
      };
    });
  };

  const handleDelete = () =>
    handleDeleteConfirm(selectionState.selectedItems, deleteApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState, selectionState.deleteBoolean);

  const handleRowDelete = () => {
    handleDeleteConfirm([selectionState.deleteId], deleteApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState, selectionState.deleteBoolean);
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

  const modulesArray = [
    'admins',
    'participant',
    'payment',
    'products',
    'booking-payments',
    'order-payments',
    'email-templates',
    'sms-templates',
    'whats-app-templates',
    'after-sales',
    'advertisement',
    'vendor',
    'NotifAgent',
    'enquiry',
    'subscriber',
    'feedback',
    'affiliates',
    'career',
    'distributors',
    'fan-club',
    'reseller',
    'broadcast'
  ];

  const availableSites = modulesArray.includes(siteModule)
    ? allSites.map((site) => ({ name: site.name, host: site.host, _id: site._id }))
    : allSites.filter((site) => site.modules?.some((module) => module[siteModule] === true)).map((site) => ({ name: site.name, host: site.host, _id: site._id }));

  const handleSaveColumnPreferences = async () => {
    await saveColumnConfig({
      ...columnPreferences,
      pinnedColumns: pinnedColumns
    });
    showNotification('success', 'Column preferences saved successfully');
  };

  const handleResetColumnPreferences = async () => {
    // Reset headers to original order
    setUpdatedHeaders([...originalHeaders]);

    // Reset hidden columns
    setHiddenColumns([]);

    // Reset pinned columns
    const defaultPinnedColumns = {
      left: originalHeaders.filter((h) => h.pinned === 'left').map((h) => String(h.id)),
      right: originalHeaders.filter((h) => h.pinned === 'right').map((h) => String(h.id))
    };

    // Save reset preferences to backend
    await saveColumnConfig({
      pinnedColumns: defaultPinnedColumns,
      columns: [],
      order: originalHeaders.map((h) => String(h.id))
    });

    // Reset local state
    setColumnPreferences({ pinnedColumns: defaultPinnedColumns });
    setPreviousPositions({});

    showNotification('success', 'Column preferences reset to default');
  };

  return (
    <div className="overflow-hidden">
      <div className="my-4 rounded-xl border border-primary overflow-hidden">
        <div className="w-full flex flex-row sm:flex-row flex-wrap gap-y-4 justify-between items-center px-3 sm:px-6 py-4 border-b border-primary">
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
              headers={updatedHeaders}
              hiddenColumns={hiddenColumns}
              setHiddenColumns={setHiddenColumns}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragEnd={handleDragEnd}
              isDragging={isDragging}
              pinnedColumns={pinnedColumns}
              onSaveColumns={handleSaveColumnPreferences}
              onResetColumns={handleResetColumnPreferences}
            />
          </div>
        </div>
        {tableCountLabel && selectionState.selectedItems.length > 0 && (
          <div className="w-full py-2 text-center bg-grey border-b border-primary ">
            <p className="text-secondary">
              {selectionState.selectedItems.length === tableState.totalCount && 'All'} {selectionState.selectedItems.length} record from this page are selected.
              <span className="text-brand pl-2">Select all {tableState.totalCount} records from this table.</span>
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
            editPath={editPath}
            viewPath={viewPath}
            appsPath={appsPath}
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
            sendCertificate={sendCertificate}
            sendCertificateUnique={sendCertificateUnique}
            approvalApi={approvalApi}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragEnd={handleDragEnd}
            isDragging={isDragging}
            sortConfig={sortConfig}
            onSort={handleSort}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handleTogglePin={handleTogglePin}
            pinnedColumns={pinnedColumns}
            hiddenColumns={hiddenColumns}
          />
        </div>
        <div className="w-full">
          <div className="w-full py-1">
            {pagination && (
              <Pagination
                currentPage={activePage}
                totalPages={totalPages}
                itemsPerPage={activeItemsPerPage}
                setItemsPerPage={(newState) => {
                  if (onItemsPerPageChange) onItemsPerPageChange(newState);
                  else {
                    setTableState((prev) => ({
                      ...prev,
                      itemsPerPage: typeof newState === 'number' ? newState : newState.itemsPerPage,
                      currentPage: 1
                    }));
                  }
                }}
                handlePageChange={(pageNumber) => {
                  if (pageNumber > 0 && pageNumber <= totalPages) {
                    if (onPageChange) onPageChange(pageNumber);
                    else setTableState((prev) => ({ ...prev, currentPage: pageNumber }));
                  }
                }}
                totalRecords={activeTotalCount}
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
        >
          {isWhatsAppTemplate && (
            <Checkbox
              className="pb-4"
              id="deleteFromWhatsApp"
              labelText="Delete WhatsApp Template from developers.facebook.com?"
              checked={selectionState.deleteBoolean}
              onChange={(e) => {
                e.stopPropagation();
                setSelectionState((prev) => ({ ...prev, deleteBoolean: e.target.checked }));
              }}
            />
          )}
        </DeleteModal>
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
          fileName={siteModule}
        />
      </div>
    </div>
  );
};

export default TableComponent;
