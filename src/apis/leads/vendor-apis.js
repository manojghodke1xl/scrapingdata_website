import { deleteMethodCall, getMethodCall, postMethodCall } from '../api-handler';

export const addVendorApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/vendor`, data);
};

export const getVendorById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/vendor/${id}`);
};

export const deleteVendorApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/vendor`, ids);
};
