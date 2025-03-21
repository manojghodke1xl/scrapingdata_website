import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getAdminByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/admin/${id}`);
};

export const addAdminApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/admin`, userData);
};

export const updateAdminApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/admin/${id}`, userData);
};

export const updateAdminStatusApi = async (ids, isBlocked) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/admin-status`, { ids, isBlocked });
};

export const updateAdminThemeApi = async (id, theme) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/admin-theme/${id}`, theme);
};

export const getAdminThemeApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/admin-theme/${id}`);
};

export const updateAdminLayoutApi = async (id, layout) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/admin-layout/${id}`, layout);
};

export const getAdminLayoutApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/admin-layout/${id}`);
};
