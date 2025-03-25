import { showNotification } from '../utils/showNotification';

/**
 * Handles the deletion of selected items through the API
 * @param {Array} selectedItems - Array of item IDs to delete
 * @param {Function} deleteApi - API function to call for deletion
 * @param {Function} setLoading - Function to set loading state
 * @param {Function} setSelectionState - Function to update selection state
 * @param {Function} setRefresh - Function to trigger refresh
 * @param {Function} setModalState - Function to update modal state
 * @param {Function} setTableState - Function to update table state
 * @param {boolean} deleteBoolean - Additional delete flag (e.g. for WhatsApp templates)
 */
export const handleDeleteConfirm = async (selectedItems, deleteApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState, deleteBoolean) => {
  if (selectedItems.length === 0) return showNotification('warn', 'Please select at least one item.');
  setLoading(true);

  try {
    const { status, data } = await deleteApi(selectedItems, deleteBoolean);
    if (status) {
      showNotification('success', data.message);
      setSelectionState({ selectedItems: [], isAllSelected: false, deleteId: '', deleteBoolean: false });
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

/**
 * Handles status updates for selected items
 * @param {Array} selectedItems - Array of item IDs to update
 * @param {string} statusUpdate - New status value
 * @param {Function} modifyStatusApi - API function to call for status update
 * @param {Function} setLoading - Function to set loading state
 * @param {Function} setSelectionState - Function to reset selection
 * @param {Function} setFilterState - Function to reset filters
 * @param {Function} setRefresh - Function to trigger refresh
 * @param {boolean} adminStatus - Flag for admin status handling
 * @param {Function} setModalState - Function to update modal state
 * @param {Function} setTableState - Function to update table state
 */
export const handleStatusUpdate = async (
  selectedItems,
  statusUpdate,
  modifyStatusApi,
  setLoading,
  setSelectionState,
  setFilterState,
  setRefresh,
  adminStatus,
  setModalState,
  setTableState
) => {
  if (selectedItems.length === 0) return showNotification('warn', 'Please select at least one item.');
  setLoading(true);
  try {
    const isActive = adminStatus ? statusUpdate !== 'active' : statusUpdate === 'active';
    const { status, data } = await modifyStatusApi(selectedItems, isActive);
    if (status) {
      showNotification('success', data.message);
      setSelectionState({ selectedItems: [], isAllSelected: false, selectedSites: [], siteToggle: false });
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

/**
 * Handles updating site assignments for selected items
 * @param {Array} selectedItems - Array of item IDs to update
 * @param {Array} selectedSites - Array of site IDs to assign
 * @param {string} action - Action to perform (add/remove)
 * @param {Function} modifySiteApi - API function to call for site updates
 * @param {Function} setLoading - Function to set loading state
 * @param {Function} setSelectionState - Function to reset selection
 * @param {Function} setRefresh - Function to trigger refresh
 * @param {Function} setModalState - Function to update modal state
 * @param {Function} setTableState - Function to update table state
 */
export const handleSitesUpdate = async (selectedItems, selectedSites, action, modifySiteApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState) => {
  if (selectedItems.length === 0 || selectedSites.length === 0) return showNotification('warn', 'Please select at least one item.');
  setLoading(true);
  try {
    const { status, data } = await modifySiteApi(selectedItems, selectedSites, action);
    if (status) {
      showNotification('success', data.message);
      setSelectionState({ selectedItems: [], isAllSelected: false, siteToggle: false, selectedSites: [] });
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

/**
 * Handles duplicating selected items to other sites
 * @param {Array} selectedItems - Array of item IDs to duplicate
 * @param {Array} selectedSites - Array of target site IDs
 * @param {Function} duplicateApi - API function to call for duplication
 * @param {Function} setLoading - Function to set loading state
 * @param {Function} setSelectionState - Function to reset selection
 * @param {Function} setRefresh - Function to trigger refresh
 * @param {Function} setModalState - Function to update modal state
 * @param {Function} setTableState - Function to update table state
 */
export const handleDuplicateConfirm = async (selectedItems, selectedSites, duplicateApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState) => {
  if (selectedItems.length === 0 || selectedSites.length === 0) return showNotification('warn', 'Please select at least one item.');
  setLoading(true);
  try {
    const { status, data } = await duplicateApi(selectedItems, selectedSites);
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
