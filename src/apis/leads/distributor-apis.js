import { deleteMethodCall, getMethodCall, postMethodCall } from '../api-handler';

export const addDistributorApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/distributor`, data);
};

export const getDistributorById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/distributor/${id}`);
};

export const deleteDistributorApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/distributor`, ids);
};
