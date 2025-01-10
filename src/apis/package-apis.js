import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addPackageApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/add-package`, userData);
};

export const updatePackageApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/package/${id}`, userData);
};

export const getPackageByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/package/${id}`);
};

export const getPackagesApi = async (ids) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/package`, ids);
};

export const deletePackageApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/package`, ids);
};
