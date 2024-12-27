import { useContext, useEffect, useState } from 'react';
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
import FilterDropDowm from '../filter/FilterDropdowm';
import { GlobalContext } from '../../contexts/GlobalContext';
import SiteModal from '../modal/SiteModal';

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
  deleteBtn,
  deleteLabel,
  deleteMessage,
  filterCategory,
  statuses,
  allsites,
  events,
  searchCategory,
  deleteApi,
  modifyStatus,
  adminStatus,
  modifyStatusApi,
  modifySite,
  modifySiteApi
}) => {
  const navigate = useNavigate();
  const { setLoading } = useContext(GlobalContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [siteId, setSiteId] = useState('');
  const [eventId, setEventId] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTearm] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [updateStatus, setUpdatestatus] = useState('');
  const [isSitesModelOpen, setSitesModelOpen] = useState(false);
  const [selectedSites, setSelectedSites] = useState([]);
  const [siteToggle, setSiteToggle] = useState(false);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const [err, data, setRefresh] = useSetTimeout(apiUrl, currentPage - 1, itemsPerPage, searchTerm, searchKey, statusFilter, siteId, eventId);
  useEffect(() => {
    if (data) {
      tableData(data);
      setTotalCount(data.count);
    } else if (err) showNotification('warn', err.message);
  }, [data, err, tableData]);

  const handleMasterCheckboxChange = () => {
    const nonSuperAdminIds = rows.filter((row) => !row.isSuperAdmin).map((row) => row.id);
    const newChecked = !isAllSelected;
    setIsAllSelected(newChecked);
    if (newChecked) setSelectedItems(nonSuperAdminIds);
    else setSelectedItems([]);
  };
  const handleRowCheckboxChange = (id) => {
    let updatedSelected;
    if (selectedItems.includes(id)) updatedSelected = selectedItems.filter((itemId) => itemId !== id);
    else updatedSelected = [...selectedItems, id];
    setSelectedItems(updatedSelected);
    setIsAllSelected(updatedSelected.length === rows.length);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItems.length) return showNotification('warn', 'Please select at least one item.');
    setLoading(true);
    try {
      const { status, data } = await deleteApi(selectedItems);
      if (status) {
        showNotification('success', data.message);
        setSelectedItems([]);
        setIsAllSelected(false);
        setRefresh((r) => !r);
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
      setDeleteModelOpen(false);
      setCurrentPage(1);
    }
  };

  const handleStatusUpdate = async (statusUpdate) => {
    if (!selectedItems.length) return showNotification('warn', 'Please select at least one item.');
    setLoading(true);
    try {
      let isActive;
      if (adminStatus) isActive = statusUpdate === 'active' ? false : true;
      else isActive = statusUpdate === 'active' ? true : false;
      const { status, data } = await modifyStatusApi(selectedItems, isActive);
      if (status) {
        showNotification('success', data.message);
        setSelectedItems([]);
        setIsAllSelected(false);
        setSiteToggle(false);
        setStatusFilter('');
        setRefresh((r) => !r);
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setUpdatestatus('');
      setLoading(false);
      setDeleteModelOpen(false);
      setCurrentPage(1);
    }
  };

  const handleSitesUpdate = async (action) => {
    if (!selectedItems.length && !selectedSites.length && !action.length) return showNotification('warn', 'Please select at least one item.');
    setLoading(true);
    try {
      const { status, data } = await modifySiteApi(selectedItems, selectedSites, action);
      if (status) {
        showNotification('success', data.message);
        setSelectedItems([]);
        setSelectedSites([]);
        setIsAllSelected(false);
        setRefresh((r) => !r);
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
      setSitesModelOpen(false);
      setCurrentPage(1);
    }
  };

  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showSitesFilter, setShowSitesFilter] = useState(false);
  const [showEventFilter, setShowEventFilter] = useState(false);

  const handleCategorySelect = (category) => {
    if (category.name === 'Status') setShowStatusFilter(true);
    if (category.name === 'Sites') setShowSitesFilter(true);
    if (category.name === 'Event') setShowEventFilter(true);
    if (category.name === 'Search') {
      setSearchKey('');
      setSearchTearm('');
      setSelectedCategory({ ...category, type: 'search' });
    }
  };

  const handleClearFilter = () => {
    setShowStatusFilter(false);
    setShowSitesFilter(false);
    setShowEventFilter(false);
    setSelectedCategory(null);
    setDeleteModelOpen(false);
    setSitesModelOpen(false);
    setSelectedSites([]);
    setSelectedItems([]);
    setIsAllSelected(false);
    setUpdatestatus('');
    setSiteId('');
    setEventId('');
    setSelectedCategory(null);
    setStatusFilter('');
    setSearchKey('');
    setSearchTearm('');
    setSiteToggle(false);
  };

  return (
    <div className="overflow-hidden">
      <div className="my-8 rounded-xl border border-primary overflow-hidden">
        <div className="w-full flex flex-col sm:flex-row flex-wrap gap-y-4 justify-between items-center px-3 sm:px-6 ptpb-4 border-b border-primary">
          <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start items-center">
            {search && (
              <>
                <div className={`px-2 rounded-xl border border-primary flex gap-2 items-center w-full md:w-[210px] h-fit ${!searchKey ? 'bg-grey cursor-not-allowed' : ''}`}>
                  <SearchComponent value={searchTerm} onChange={(e) => setSearchTearm(e.target.value)} disabled={!searchKey} placeholder={`Search by ${searchKey || '...'}`} />
                </div>
                <SearchFilter searchCategory={searchCategory} setSearchKey={setSearchKey} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              </>
            )}
            {filter && (
              <>
                <div className="hidden sm:block gap-2">
                  <Filters categories={filterCategory} onCategorySelect={handleCategorySelect} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                </div>
                {showStatusFilter && <StatusFilter statuses={statuses} setStatusFilter={setStatusFilter} />}
                {showSitesFilter && <FilterDropDowm name={'Sites'} data={allsites} setDataId={setSiteId} />}
                {showEventFilter && <FilterDropDowm name={'Event'} data={events} setDataId={setEventId} />}
              </>
            )}
          </div>
          <div className={`w-full xl:w-fit flex ${deleteBtn + search + filter >= 4 ? 'flex-wrap' : 'flex-nowrap'} sm:justify-end justify-center gap-2 items-center`}>
            {deleteBtn && selectedItems.length > 0 && (
              <button
                onClick={() => setDeleteModelOpen(true)}
                className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
              >
                <RiDeleteBinLine size={20} />
                <span className="hidden sm:block">Delete</span>
              </button>
            )}
            {modifyStatus && selectedItems.length > 0 && (
              <>
                <StatusFilter statuses={statuses} setStatusFilter={setUpdatestatus} />
                {updateStatus !== '' && selectedItems.length > 0 && (
                  <button
                    onClick={() => handleStatusUpdate(updateStatus)}
                    className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
                  >
                    <span className="hidden sm:block">Apply Status</span>
                  </button>
                )}
              </>
            )}
            {modifySite && selectedItems.length > 0 && (
              <button
                onClick={() => setSitesModelOpen(true)}
                className="sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-2 px-3 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
              >
                Sites
              </button>
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

        {tableCountLabel && (
          <div className="w-full ptpb-4 text-center bg-grey border-b border-primary">
            <p className="text-secondary">
              {selectedItems.length === totalCount && 'All'} {selectedItems.length} record from this page is selected
              <a href="#" className="text-blue pl-2">
                Select all {totalCount} records from this table
              </a>
            </p>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {selectable && (
                  <th scope="col" className="px-4 py-2.5 text-left">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={isAllSelected} onChange={handleMasterCheckboxChange} className="form-checkbox h-4 w-4 text-blue-600 focus:outline-none" />
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
              {rows?.map((row, index) => (
                <tr key={row.id} className={` border-b border-primary ${selectedItems.includes(row.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                  {selectable && (
                    <td className="px-4 py-2">
                      {!row.isSuperAdmin && (
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(row.id)}
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
                      {edit && <MdEdit className="text-2xl" onClick={() => navigate(editPath + '/' + row.id)} />}
                      {view && <MdRemoveRedEye className="text-2xl" onClick={() => navigate(viewPath + '/' + row.id)} />}
                      {apps && (
                        <MdOutlineApps className="text-2xl" onClick={() => navigate(appsPath, { state: { siteData: { id: row.id, name: row.id, showName: row.siteName } } })} />
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full mt-2">
          <div className="w-full py-3">
            {pagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                handlePageChange={(pageNumber) => {
                  if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber);
                }}
                totalRecords={totalCount}
              />
            )}
          </div>
        </div>
        <SiteModal
          isOpen={isSitesModelOpen}
          setSitesModelOpen={setSitesModelOpen}
          selectedSites={selectedSites}
          setSelectedSites={setSelectedSites}
          onConfirm={handleSitesUpdate}
          siteToggle={siteToggle}
          setSiteToggle={setSiteToggle}
        />
        <DeleteModal isDeleteModalOpen={isDeleteModelOpen} onConfirm={handleDeleteConfirm} setDeleteModalOpen={setDeleteModelOpen} label={deleteLabel} message={deleteMessage} />
      </div>
    </div>
  );
};

export default TableComponent;
