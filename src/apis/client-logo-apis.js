import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getClientLogoById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/client-logo/${id}?p=1`);
};

export const addClientLogoApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/client-logo`, userData);
};

export const updateClientLogoApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/client-logo/${id}`, userData);
};

export const updateClientLogoStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/client-logo-status`, { ids, isActive });
};

export const updateClientLogoSitesApi = async (cids, sids, action) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/client-logo-sites`, { cids, sids, action });
};

export const deleteClientLogoApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/client-logo`, ids);
};
