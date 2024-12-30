import { useEffect, useState } from 'react';
import { RxCaretSort } from 'react-icons/rx';
import Pagination from './Pagination';
import { MdEdit, MdOutlineApps, MdRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../common/SearchComponent';
import Filters from '../filter/Filters';
import { showNotification } from '../../utils/showNotification';
import useSetTimeout from '../../hooks/useDebounce';
import { RiDeleteBinLine } from 'react-icons/ri';
import DeleteModal from '../modal/DeleteModal';
import StatusFilter from '../filter/StatusFilter';
import SearchFilter from '../filter/SearchFilter';
import FilterDropDowm from '../filter/FilterDropDown';
import SiteModal from '../modal/SiteModal';
import useGlobalContext from '../../hooks/useGlobalContext';
import { CiExport } from 'react-icons/ci';
import { getMethodCall } from '../../apis/api-handler';
import DropDown from '../formFields/DropDown';

const TableComponent = ({
  selectable,
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
  modifySiteApi
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    auth: { allSites },
    setLoading,
    isLoading
  } = useGlobalContext();

  const [modalState, setModalState] = useState({
    isDuplicateModelOpen: false,
    isDeleteModelOpen: false,
    isSitesModelOpen: false
  });
  const [tableState, setTableState] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalCount: 0
  });
  const [selectionState, setSelectionState] = useState({
    selectedItems: [],
    isAllSelected: false,
    selectedSites: [],
    siteToggle: false,
    status: ''
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

  const totalPages = Math.ceil(tableState.totalCount / tableState.itemsPerPage);

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
    if (data) {
      tableData(data);
      setTableState((prev) => ({ ...prev, totalCount: data.count }));
    } else if (err) showNotification('warn', err.message);
  }, [data, err, tableData]);

  const handleMasterCheckboxChange = () => {
    const nonSuperAdminIds = rows.filter((row) => !row.isSuperAdmin).map((row) => row.id);
    const newChecked = !selectionState.isAllSelected;
    setSelectionState((prev) => ({ ...prev, isAllSelected: newChecked }));
    if (newChecked) setSelectionState((prev) => ({ ...prev, selectedItems: nonSuperAdminIds }));
    else setSelectionState((prev) => ({ ...prev, selectedItems: [] }));
  };
  const handleRowCheckboxChange = (id) => {
    let updatedSelected;
    if (selectionState.selectedItems.includes(id)) updatedSelected = selectionState.selectedItems.filter((itemId) => itemId !== id);
    else updatedSelected = [...selectionState.selectedItems, id];
    setSelectionState((prev) => ({ ...prev, selectedItems: updatedSelected }));
    setSelectionState((prev) => ({ ...prev, isAllSelected: updatedSelected.length === rows.length }));
  };

  const handleDeleteConfirm = async () => {
    if (!selectionState.selectedItems.length) return showNotification('warn', 'Please select at least one item.');
    setLoading(true);
    try {
      const { status, data } = await deleteApi(selectionState.selectedItems);
      if (status) {
        showNotification('success', data.message);
        setSelectionState((prev) => ({ ...prev, selectedItems: [], isAllSelected: false }));
        setRefresh((r) => !r);
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
      setModalState((prev) => ({ ...prev, isDeleteModelOpen: false }));
      setTableState((prev) => ({ ...prev, currentPage: 1 }));
    }
  };

  const handleStatusUpdate = async (statusUpdate) => {
    if (!selectionState.selectedItems.length) return showNotification('warn', 'Please select at least one item.');
    setLoading(true);
    try {
      let isActive;
      if (adminStatus) isActive = statusUpdate === 'active' ? false : true;
      else isActive = statusUpdate === 'active' ? true : false;
      const { status, data } = await modifyStatusApi(selectionState.selectedItems, isActive);
      if (status) {
        showNotification('success', data.message);
        setSelectionState((prev) => ({ ...prev, selectedItems: [], isAllSelected: false, selectedSites: [], siteToggle: false }));
        setFilterState((prev) => ({ ...prev, statusFilter: '' }));
        setRefresh((r) => !r);
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
      setSelectionState((prev) => ({ ...prev, status: '' }));
      setModalState((prev) => ({ ...prev, isDeleteModelOpen: false }));
      setTableState((prev) => ({ ...prev, currentPage: 1 }));
    }
  };

  const handleSitesUpdate = async (action) => {
    if (!selectionState.selectedItems.length && !selectionState.selectedSites.length && !action.length) return showNotification('warn', 'Please select at least one item.');
    setLoading(true);
    try {
      const { status, data } = await modifySiteApi(selectionState.selectedItems, selectionState.selectedSites, action);
      if (status) {
        showNotification('success', data.message);
        setSelectionState((prev) => ({ ...prev, selectedItems: [], isAllSelected: false, siteToggle: false, selectedSites: [] }));
        setRefresh((r) => !r);
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
      setSelectionState((prev) => ({ ...prev, selectedSites: [], siteToggle: false }));
      setModalState((prev) => ({ ...prev, isSitesModelOpen: false }));
      setTableState((prev) => ({ ...prev, currentPage: 1 }));
    }
  };

  const handleDuplicateConfirm = async () => {
    if (!selectionState.selectedItems.length && !selectionState.selectedSites.length) return showNotification('warn', 'Please select at least one item.');
    setLoading(true);
    try {
      const { status, data } = await duplicateApi(selectionState.selectedItems, selectionState.selectedSites);
      if (status) {
        showNotification('success', data.message);
        setSelectionState({ selectedItems: [], isAllSelected: false, selectedSites: [] });
        setRefresh((r) => !r);
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
      setModalState((prev) => ({ ...prev, isDuplicateModelOpen: false }));
      setTableState((prev) => ({ ...prev, currentPage: 1 }));
    }
  };

  const handleCategorySelect = (category) => {
    if (category.name === 'Status') setShowFilter((prev) => ({ ...prev, status: !prev.status }));
    if (category.name === 'Sites') setShowFilter((prev) => ({ ...prev, sites: !prev.sites }));
    if (category.name === 'Event') setShowFilter((prev) => ({ ...prev, event: !prev.event }));
    if (category.name === 'Search') {
      setFilterState({ searchTerm: '', searchKey: '' });
      setSelectedCategory({ ...category, type: 'search' });
    }
  };

  const handleClearFilter = () => {
    setModalState({ isDeleteModelOpen: false, isSitesModelOpen: false, isDuplicateModelOpen: false });
    setSelectionState({ selectedItems: [], isAllSelected: false, selectedSites: [], siteToggle: false, status: '' });
    setFilterState({ searchTerm: '', searchKey: '', siteId: '', eventId: '', statusFilter: '' });
    setShowFilter({ status: false, sites: false, event: false });
    setSelectedCategory(null);
  };

  const handleExport = (type) => {
    if (type === 'all') {
      (async () => {
        const { status, data } = await getMethodCall(`${import.meta.env.VITE_API_URL}/${apiUrl}`);
        console.log(status, data);
        if (status) {
          const apiUrlMap = {
            feedback: 'feedbacks',
            recaptcha: 'recaptchas',
            'faq-category': 'faqCategories',
            faq: 'faqs',
            'client-logo': 'clientlogos',
            gallery: 'galleries',
            'partner-logo': 'partnerlogos'
          };

          const exportData = data[apiUrlMap[apiUrl] || apiUrl];

          // Flattening objects using reduce
          const flattenObject = (obj, parentKey = '') =>
            Object.keys(obj).reduce((acc, key) => {
              const newKey = parentKey ? `${parentKey}.${key}` : key;

              if (key === 'isActive') {
                // Custom handling for isActive field
                acc[newKey] = obj[key] === true ? 'true' : '"false"';
              } else if (key === 'site' || key === 'sites') {
                // Handle specific keys like 'site' and 'sites'
                if (Array.isArray(obj[key])) {
                  acc[newKey] = `"${
                    obj[key]
                      .reduce((str, site) => {
                        if (site.name && site.host) return `${str}${str ? ', ' : ''}${site.name} (${site.host})`;
                        return str;
                      }, '')
                      .replace(/"/g, '""') || 'N/A'
                  }"`;
                } else if (typeof obj[key] === 'object' && obj[key] !== null) acc[newKey] = obj[key].name && obj[key].host ? `"${obj[key].name} (${obj[key].host})"` : '"N/A"';
                else acc[newKey] = '"N/A"';
              } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                // Recursive flattening for nested objects
                Object.assign(acc, flattenObject(obj[key], newKey));
              } else {
                // Escape double quotes and enclose in quotes
                acc[newKey] = typeof obj[key] === 'string' ? `"${obj[key].replace(/"/g, '""')}"` : obj[key];
              }
              return acc;
            }, {});

          // Generate CSV headers using the keys of the first flattened object
          const headers = Object.keys(flattenObject(exportData[0]));
          const csvContent = exportData.reduce((csv, row, index) => {
            // Flatten each row
            const flattenedRow = flattenObject(row);
            // Map headers to corresponding values
            const values = headers.map((header) => flattenedRow[header] || '""');
            // Add headers only once (for the first row)
            if (index === 0) csv += headers.join(',') + '\n';
            csv += values.join(',') + '\n';
            return csv;
          }, '');

          // Create a Blob containing the CSV file
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `view_all_${apiUrl}_details.csv`);
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(link);
        } else showNotification('warn', data);
      })();
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="my-8 rounded-xl border border-primary overflow-hidden">
        <div className="w-full flex flex-col sm:flex-row flex-wrap gap-y-4 justify-between items-center px-3 sm:px-6 ptpb-4 border-b border-primary">
          <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start items-center">
            {search && (
              <>
                <div
                  className={`px-2 rounded-xl border border-primary flex gap-2 items-center w-full md:w-[210px] h-fit ${
                    !filterState.searchKey ? 'bg-grey cursor-not-allowed' : ''
                  }`}
                >
                  <SearchComponent
                    value={filterState.searchTerm}
                    onChange={(e) => setFilterState((prev) => ({ ...prev, searchTerm: e.target.value }))}
                    disabled={!filterState.searchKey}
                    placeholder={`Search by ${filterState.searchKey || '...'}`}
                  />
                </div>
                {searchCategory.length > 0 && (
                  <SearchFilter
                    searchCategory={searchCategory}
                    setSearchKey={(key) => setFilterState((prev) => ({ ...prev, searchKey: key }))}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                )}
              </>
            )}
            {filter && (
              <>
                <div className="gap-2">
                  <Filters categories={filterCategory} onCategorySelect={handleCategorySelect} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                </div>
                {showFilter.status && <StatusFilter statuses={statuses} setStatusFilter={(status) => setFilterState((prev) => ({ ...prev, statusFilter: status }))} />}
                {showFilter.sites && <FilterDropDowm name={'Sites'} data={allSites} setDataId={(id) => setFilterState((prev) => ({ ...prev, siteId: id }))} />}
                {showFilter.event && <FilterDropDowm name={'Event'} data={events} setDataId={(id) => setFilterState((prev) => ({ ...prev, eventId: id }))} />}
              </>
            )}
          </div>
          <div
            className={`w-full xl:w-fit flex ${
              (deleteBtn + search + filter + exportBtn + modifyStatus, modifySite + duplicateBtn >= 4 ? 'flex-wrap' : 'flex-nowrap')
            } sm:justify-end justify-center gap-2 items-center`}
          >
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
                    onClick={() => handleStatusUpdate(selectionState.status)}
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
                    name={'Export'}
                    SummaryChild={<h5 className="p-0 m-0 text-primary">Select Export</h5>}
                    dropdownList={[
                      { id: 0, name: 'visible', showName: 'Visible Rows' },
                      { id: 1, name: 'selected', showName: 'Selected Rows' },
                      { id: 2, name: 'all', showName: 'All Rows' }
                    ]}
                    commonFunction={(e) => handleExport(e.name)}
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
          </div>
        </div>

        {tableCountLabel && selectionState.selectedItems.length > 0 && (
          <div className="w-full ptpb-4 text-center bg-grey border-b border-primary">
            <p className="text-secondary">
              {selectionState.selectedItems.length === tableState.totalCount && 'All'} {selectionState.selectedItems.length} record from this page is selected
              <a href="#" className="text-blue pl-2">
                Select all {tableState.totalCount} records from this table
              </a>
            </p>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {selectable && (
                  <th scope="col" className="px-4 py-2.5 text-left">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectionState.isAllSelected}
                        onChange={handleMasterCheckboxChange}
                        className="form-checkbox h-4 w-4 text-blue-600 focus:outline-none"
                      />
                    </label>
                  </th>
                )}
                {headers?.map((header, index) => (
                  <th key={index} scope="col" className="px-6 py-2.5 text-left font-semibold text-primary">
                    <div className="flex items-center gap-2">
                      <span className="whitespace-nowrap">{header.label}</span>
                      {header.sortable !== false && <RxCaretSort size={20} strokeWidth="0.5" fill="none" />}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th scope="col" className="px-6 py-2 text-left font-semibold text-primary">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={headers.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}>
                    <div
                      role="status"
                      className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-200 md:p-6 dark:border-gray-200"
                    >
                      {/* Header Skeleton */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-12"></div>
                      </div>

                      {/* Row Skeleton */}
                      {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="flex items-center justify-between pt-4">
                          <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-200"></div>
                          </div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-12"></div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ) : (
                rows?.map((row, index) => (
                  <tr key={row.id} className={`border-b border-primary ${selectionState.selectedItems.includes(row.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    {selectable && (
                      <td className="px-4 py-2">
                        {!row.isSuperAdmin && (
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectionState.selectedItems.includes(row.id)}
                              onChange={() => handleRowCheckboxChange(row.id)}
                              className="form-checkbox h-4 w-4 text-blue-600"
                            />
                          </label>
                        )}
                      </td>
                    )}
                    {headers.map((header, headerIndex) => (
                      <td key={`${row.id}-${headerIndex}`} className="px-6 py-2 text-secondary whitespace-nowrap font-medium">
                        {header.key === 'srno'
                          ? (index + 1).toString().padStart(3, '0') // Handle Sr No.
                          : row[header.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="w-full flex gap-2 items-center px-6 py-2 whitespace-nowrap font-medium text-secondary hover:text-gray-900">
                        {edit && !row.isSuperAdmin && <MdEdit className="text-2xl" onClick={() => navigate(editPath + '/' + row.id)} />}
                        {view && !row.isSuperAdmin && <MdRemoveRedEye className="text-2xl" onClick={() => navigate(viewPath + '/' + row.id)} />}
                        {apps && !row.isSuperAdmin && (
                          <MdOutlineApps className="text-2xl" onClick={() => navigate(appsPath, { state: { siteData: { id: row.id, name: row.id, showName: row.siteName } } })} />
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
          availableSites={allSites}
          onConfirm={handleSitesUpdate}
          siteToggle={selectionState.siteToggle}
        />
        <DeleteModal
          isDeleteModalOpen={modalState.isDeleteModelOpen}
          onConfirm={handleDeleteConfirm}
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
          availableSites={allSites}
          setSelectedSites={setSelectionState}
          onConfirm={handleDuplicateConfirm}
        />
      </div>
    </div>
  );
};

export default TableComponent;
