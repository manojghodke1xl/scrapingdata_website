import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getPopupById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/popup/${id}?p=1`);
};

export const duplicatePopupApi = async (pids, sids) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/duplicate-popup`, { pids, sids });
};

export const updatePopupStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/popup-status`, { ids, isActive });
};

export const deletePopupApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/popup`, {ids});
};

export const addPopupApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/popup`, userData);
};

export const updatePopupApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/popup/${id}`, userData);
};
