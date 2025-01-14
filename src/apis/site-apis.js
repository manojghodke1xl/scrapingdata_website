import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getAllSitesApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/all-Sites`);
};

export const getSiteByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/site/${id}`);
};

export const addSiteApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/site`, userData);
};

export const updateSiteApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/site/${id}`, userData);
};

export const updateSiteStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/site-status`, { ids, isActive });
};
