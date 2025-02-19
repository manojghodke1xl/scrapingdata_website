import { deleteMethodCall, getMethodCall, postMethodCall } from '../api-handler';

export const addResellerApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/reseller`, data);
};

export const getResellerById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/reseller/${id}`);
};

export const deleteResellerApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/reseller`, {ids});
};
