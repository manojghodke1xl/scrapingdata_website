import { showNotification } from '../utils/showNotification';

export const handleDeleteConfirm = async (selectedItems, deleteApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState) => {
  if (!selectedItems.length) return showNotification('warn', 'Please select at least one item.');
  setLoading(true);
  try {
    const { status, data } = await deleteApi(selectedItems);
    if (status) {
      showNotification('success', data.message);
      setSelectionState({ selectedItems: [], isAllSelected: false });
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
  if (!selectedItems.length) return showNotification('warn', 'Please select at least one item.');
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

export const handleSitesUpdate = async (selectedItems, selectedSites, action, modifySiteApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState) => {
  if (!selectedItems.length && !selectedSites.length && !action.length) return showNotification('warn', 'Please select at least one item.');
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

export const handleDuplicateConfirm = async (selectedItems, selectedSites, duplicateApi, setLoading, setSelectionState, setRefresh, setModalState, setTableState) => {
  if (!selectedItems.length && !selectedSites.length) return showNotification('warn', 'Please select at least one item.');
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
